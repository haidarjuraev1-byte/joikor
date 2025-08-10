import { z } from "zod"
import { query } from "@/lib/database/connection"
import { withAuth } from "@/lib/auth/middleware"
import {
  createApiResponse,
  createErrorResponse,
  validateRequest,
  handleApiError,
  getPaginationParams,
} from "@/lib/api/utils"

const sendMessageSchema = z.object({
  content: z.string().min(1, "Message content is required"),
  messageType: z.enum(["text", "file", "image"]).default("text"),
  fileUrl: z.string().optional(),
  fileName: z.string().optional(),
  fileSize: z.number().optional(),
})

export const GET = withAuth(async (req, { params }: { params: { id: string } }) => {
  try {
    const conversationId = params.id
    const { page, limit, offset } = getPaginationParams(req)

    // Verify user has access to this conversation
    const accessResult = await query("SELECT 1 FROM conversations WHERE id = $1 AND $2 = ANY(participants)", [
      conversationId,
      req.user!.id,
    ])

    if (accessResult.rows.length === 0) {
      return createErrorResponse("Conversation not found", 404)
    }

    // Get messages
    const messagesResult = await query(
      `SELECT 
        m.id, m.content, m.message_type, m.file_url, m.file_name, m.file_size,
        m.is_read, m.read_at, m.created_at, m.sender_id,
        u.first_name, u.last_name, u.avatar_url
       FROM messages m
       JOIN users u ON m.sender_id = u.id
       WHERE m.conversation_id = $1
       ORDER BY m.created_at DESC
       LIMIT $2 OFFSET $3`,
      [conversationId, limit, offset],
    )

    const messages = messagesResult.rows
      .map((msg) => ({
        id: msg.id,
        content: msg.content,
        messageType: msg.message_type,
        fileUrl: msg.file_url,
        fileName: msg.file_name,
        fileSize: msg.file_size,
        isRead: msg.is_read,
        readAt: msg.read_at,
        createdAt: msg.created_at,
        sender: {
          id: msg.sender_id,
          name: `${msg.first_name} ${msg.last_name}`,
          avatar: msg.avatar_url,
          isMe: msg.sender_id === req.user!.id,
        },
      }))
      .reverse() // Reverse to show oldest first

    // Mark messages as read
    await query(
      `UPDATE messages 
       SET is_read = true, read_at = CURRENT_TIMESTAMP 
       WHERE conversation_id = $1 AND sender_id != $2 AND is_read = false`,
      [conversationId, req.user!.id],
    )

    // Get total count
    const countResult = await query("SELECT COUNT(*) as total FROM messages WHERE conversation_id = $1", [
      conversationId,
    ])

    const total = Number.parseInt(countResult.rows[0].total)

    return createApiResponse({
      messages,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: offset + limit < total,
        hasPrev: page > 1,
      },
    })
  } catch (error) {
    return handleApiError(error)
  }
})

export const POST = withAuth(async (req, { params }: { params: { id: string } }) => {
  try {
    const conversationId = params.id
    const data = await validateRequest(req, sendMessageSchema)

    // Verify user has access to this conversation
    const accessResult = await query("SELECT 1 FROM conversations WHERE id = $1 AND $2 = ANY(participants)", [
      conversationId,
      req.user!.id,
    ])

    if (accessResult.rows.length === 0) {
      return createErrorResponse("Conversation not found", 404)
    }

    // Create message
    const messageResult = await query(
      `INSERT INTO messages (conversation_id, sender_id, content, message_type, file_url, file_name, file_size)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING id, created_at`,
      [conversationId, req.user!.id, data.content, data.messageType, data.fileUrl, data.fileName, data.fileSize],
    )

    const message = messageResult.rows[0]

    // Update conversation last message time
    await query("UPDATE conversations SET last_message_at = CURRENT_TIMESTAMP WHERE id = $1", [conversationId])

    return createApiResponse(
      {
        id: message.id,
        content: data.content,
        messageType: data.messageType,
        createdAt: message.created_at,
        sender: {
          id: req.user!.id,
          isMe: true,
        },
      },
      201,
    )
  } catch (error) {
    return handleApiError(error)
  }
})
