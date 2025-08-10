import { WebSocketServer } from "ws"
import type { IncomingMessage } from "http"
import { query } from "@/lib/database/connection"
import { verifyToken } from "@/lib/auth/middleware"

interface AuthenticatedWebSocket extends WebSocket {
  userId?: string
  conversationIds?: Set<string>
}

interface WebSocketMessage {
  type: "join_conversation" | "leave_conversation" | "send_message" | "typing" | "read_message"
  conversationId?: string
  messageId?: string
  content?: string
  data?: any
}

class ChatWebSocketServer {
  private wss: WebSocketServer
  private clients: Map<string, AuthenticatedWebSocket> = new Map()
  private conversationClients: Map<string, Set<string>> = new Map()

  constructor(server: any) {
    this.wss = new WebSocketServer({
      server,
      path: "/api/ws/chat",
    })

    this.wss.on("connection", this.handleConnection.bind(this))
  }

  private async handleConnection(ws: AuthenticatedWebSocket, req: IncomingMessage) {
    try {
      // Extract token from query params or headers
      const url = new URL(req.url!, `http://${req.headers.host}`)
      const token = url.searchParams.get("token") || req.headers.authorization?.replace("Bearer ", "")

      if (!token) {
        ws.close(1008, "Authentication required")
        return
      }

      const user = verifyToken(token)
      if (!user) {
        ws.close(1008, "Invalid token")
        return
      }

      ws.userId = user.id
      ws.conversationIds = new Set()
      this.clients.set(user.id, ws)

      console.log(`User ${user.id} connected to chat`)

      ws.on("message", (data) => this.handleMessage(ws, data))
      ws.on("close", () => this.handleDisconnection(ws))
      ws.on("error", (error) => console.error("WebSocket error:", error))

      // Send connection confirmation
      ws.send(
        JSON.stringify({
          type: "connected",
          userId: user.id,
        }),
      )
    } catch (error) {
      console.error("WebSocket connection error:", error)
      ws.close(1011, "Server error")
    }
  }

  private async handleMessage(ws: AuthenticatedWebSocket, data: any) {
    try {
      const message: WebSocketMessage = JSON.parse(data.toString())

      switch (message.type) {
        case "join_conversation":
          await this.handleJoinConversation(ws, message.conversationId!)
          break
        case "leave_conversation":
          await this.handleLeaveConversation(ws, message.conversationId!)
          break
        case "send_message":
          await this.handleSendMessage(ws, message)
          break
        case "typing":
          await this.handleTyping(ws, message)
          break
        case "read_message":
          await this.handleReadMessage(ws, message)
          break
      }
    } catch (error) {
      console.error("WebSocket message error:", error)
      ws.send(
        JSON.stringify({
          type: "error",
          message: "Failed to process message",
        }),
      )
    }
  }

  private async handleJoinConversation(ws: AuthenticatedWebSocket, conversationId: string) {
    try {
      // Verify user has access to this conversation
      const accessResult = await query(
        `SELECT 1 FROM conversations c
         WHERE c.id = $1 AND $2 = ANY(c.participants)`,
        [conversationId, ws.userId],
      )

      if (accessResult.rows.length === 0) {
        ws.send(
          JSON.stringify({
            type: "error",
            message: "Access denied to conversation",
          }),
        )
        return
      }

      // Add user to conversation
      ws.conversationIds!.add(conversationId)

      if (!this.conversationClients.has(conversationId)) {
        this.conversationClients.set(conversationId, new Set())
      }
      this.conversationClients.get(conversationId)!.add(ws.userId!)

      // Notify other participants
      this.broadcastToConversation(
        conversationId,
        {
          type: "user_joined",
          userId: ws.userId,
          conversationId,
        },
        ws.userId,
      )

      ws.send(
        JSON.stringify({
          type: "joined_conversation",
          conversationId,
        }),
      )
    } catch (error) {
      console.error("Error joining conversation:", error)
    }
  }

  private async handleLeaveConversation(ws: AuthenticatedWebSocket, conversationId: string) {
    ws.conversationIds!.delete(conversationId)

    const conversationClients = this.conversationClients.get(conversationId)
    if (conversationClients) {
      conversationClients.delete(ws.userId!)
      if (conversationClients.size === 0) {
        this.conversationClients.delete(conversationId)
      }
    }

    // Notify other participants
    this.broadcastToConversation(
      conversationId,
      {
        type: "user_left",
        userId: ws.userId,
        conversationId,
      },
      ws.userId,
    )
  }

  private async handleSendMessage(ws: AuthenticatedWebSocket, message: WebSocketMessage) {
    try {
      // Save message to database
      const messageResult = await query(
        `INSERT INTO messages (conversation_id, sender_id, content, message_type)
         VALUES ($1, $2, $3, $4)
         RETURNING id, created_at`,
        [message.conversationId, ws.userId, message.content, "text"],
      )

      const newMessage = messageResult.rows[0]

      // Update conversation last message time
      await query("UPDATE conversations SET last_message_at = CURRENT_TIMESTAMP WHERE id = $1", [
        message.conversationId,
      ])

      // Broadcast to all conversation participants
      const messageData = {
        type: "new_message",
        message: {
          id: newMessage.id,
          conversationId: message.conversationId,
          senderId: ws.userId,
          content: message.content,
          messageType: "text",
          createdAt: newMessage.created_at,
        },
      }

      this.broadcastToConversation(message.conversationId!, messageData)

      // Send push notifications to offline users
      await this.sendPushNotifications(message.conversationId!, ws.userId!, message.content!)
    } catch (error) {
      console.error("Error sending message:", error)
    }
  }

  private async handleTyping(ws: AuthenticatedWebSocket, message: WebSocketMessage) {
    this.broadcastToConversation(
      message.conversationId!,
      {
        type: "typing",
        userId: ws.userId,
        conversationId: message.conversationId,
      },
      ws.userId,
    )
  }

  private async handleReadMessage(ws: AuthenticatedWebSocket, message: WebSocketMessage) {
    try {
      // Mark message as read
      await query("UPDATE messages SET is_read = true, read_at = CURRENT_TIMESTAMP WHERE id = $1", [message.messageId])

      // Broadcast read status
      this.broadcastToConversation(message.conversationId!, {
        type: "message_read",
        messageId: message.messageId,
        userId: ws.userId,
        conversationId: message.conversationId,
      })
    } catch (error) {
      console.error("Error marking message as read:", error)
    }
  }

  private handleDisconnection(ws: AuthenticatedWebSocket) {
    if (ws.userId) {
      console.log(`User ${ws.userId} disconnected from chat`)

      // Remove from all conversations
      ws.conversationIds?.forEach((conversationId) => {
        this.handleLeaveConversation(ws, conversationId)
      })

      this.clients.delete(ws.userId)
    }
  }

  private broadcastToConversation(conversationId: string, data: any, excludeUserId?: string) {
    const conversationClients = this.conversationClients.get(conversationId)
    if (!conversationClients) return

    conversationClients.forEach((userId) => {
      if (userId !== excludeUserId) {
        const client = this.clients.get(userId)
        if (client && client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(data))
        }
      }
    })
  }

  private async sendPushNotifications(conversationId: string, senderId: string, content: string) {
    try {
      // Get conversation participants (excluding sender)
      const participantsResult = await query(
        `SELECT u.id, u.first_name, u.last_name, up.notification_preferences
         FROM conversations c
         CROSS JOIN LATERAL unnest(c.participants) AS participant_id
         JOIN users u ON u.id = participant_id::uuid
         LEFT JOIN user_profiles up ON u.id = up.user_id
         WHERE c.id = $1 AND u.id != $2`,
        [conversationId, senderId],
      )

      // Get sender info
      const senderResult = await query("SELECT first_name, last_name FROM users WHERE id = $1", [senderId])

      const senderName = senderResult.rows[0]
        ? `${senderResult.rows[0].first_name} ${senderResult.rows[0].last_name}`
        : "Someone"

      // Send notifications to offline users
      for (const participant of participantsResult.rows) {
        const isOnline = this.clients.has(participant.id)
        const preferences = participant.notification_preferences || {}

        if (!isOnline && preferences.push !== false) {
          // Create notification record
          await query(
            `INSERT INTO notifications (user_id, type, title, message, data)
             VALUES ($1, $2, $3, $4, $5)`,
            [
              participant.id,
              "new_message",
              `Новое сообщение от ${senderName}`,
              content.substring(0, 100),
              JSON.stringify({ conversationId, senderId }),
            ],
          )

          // Here you would integrate with push notification service
          // e.g., Firebase Cloud Messaging, Apple Push Notifications, etc.
        }
      }
    } catch (error) {
      console.error("Error sending push notifications:", error)
    }
  }
}

export default ChatWebSocketServer
