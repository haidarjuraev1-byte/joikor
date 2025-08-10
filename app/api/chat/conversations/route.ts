import { query } from "@/lib/database/connection"
import { withAuth } from "@/lib/auth/middleware"
import { createApiResponse, handleApiError, getPaginationParams } from "@/lib/api/utils"

export const GET = withAuth(async (req) => {
  try {
    const { page, limit, offset } = getPaginationParams(req)

    // Get user's conversations
    const conversationsResult = await query(
      `SELECT 
        c.id, c.last_message_at, c.is_active,
        a.id as application_id, a.status as application_status,
        j.title as job_title, j.id as job_id,
        comp.name as company_name, comp.logo_url as company_logo,
        -- Get other participant info
        CASE 
          WHEN c.participants[1]::uuid = $1 THEN c.participants[2]::uuid
          ELSE c.participants[1]::uuid
        END as other_user_id,
        -- Get last message
        (SELECT content FROM messages WHERE conversation_id = c.id ORDER BY created_at DESC LIMIT 1) as last_message,
        (SELECT message_type FROM messages WHERE conversation_id = c.id ORDER BY created_at DESC LIMIT 1) as last_message_type,
        (SELECT created_at FROM messages WHERE conversation_id = c.id ORDER BY created_at DESC LIMIT 1) as last_message_at_actual,
        -- Count unread messages
        (SELECT COUNT(*) FROM messages WHERE conversation_id = c.id AND sender_id != $1 AND is_read = false) as unread_count
       FROM conversations c
       LEFT JOIN applications a ON c.application_id = a.id
       LEFT JOIN jobs j ON a.job_id = j.id
       LEFT JOIN companies comp ON j.company_id = comp.id
       WHERE $1 = ANY(c.participants) AND c.is_active = true
       ORDER BY COALESCE(
         (SELECT created_at FROM messages WHERE conversation_id = c.id ORDER BY created_at DESC LIMIT 1),
         c.last_message_at
       ) DESC
       LIMIT $2 OFFSET $3`,
      [req.user!.id, limit, offset],
    )

    // Get other participants' info
    const conversations = []
    for (const conv of conversationsResult.rows) {
      const otherUserResult = await query("SELECT id, first_name, last_name, avatar_url FROM users WHERE id = $1", [
        conv.other_user_id,
      ])

      const otherUser = otherUserResult.rows[0]

      conversations.push({
        id: conv.id,
        applicationId: conv.application_id,
        applicationStatus: conv.application_status,
        job: conv.job_title
          ? {
              id: conv.job_id,
              title: conv.job_title,
              company: {
                name: conv.company_name,
                logo: conv.company_logo,
              },
            }
          : null,
        otherUser: {
          id: otherUser.id,
          name: `${otherUser.first_name} ${otherUser.last_name}`,
          avatar: otherUser.avatar_url,
        },
        lastMessage: {
          content: conv.last_message,
          type: conv.last_message_type,
          createdAt: conv.last_message_at_actual,
        },
        unreadCount: Number.parseInt(conv.unread_count),
        lastMessageAt: conv.last_message_at,
        isActive: conv.is_active,
      })
    }

    // Get total count
    const countResult = await query(
      "SELECT COUNT(*) as total FROM conversations WHERE $1 = ANY(participants) AND is_active = true",
      [req.user!.id],
    )

    const total = Number.parseInt(countResult.rows[0].total)

    return createApiResponse({
      conversations,
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
