import { query } from "@/lib/database/connection"
import { withAuth } from "@/lib/auth/middleware"
import { createApiResponse, handleApiError, getPaginationParams } from "@/lib/api/utils"

export const GET = withAuth(async (req) => {
  try {
    const { page, limit, offset } = getPaginationParams(req)
    const url = new URL(req.url)
    const unreadOnly = url.searchParams.get("unread") === "true"

    let whereClause = "user_id = $1"
    const queryParams = [req.user!.id]

    if (unreadOnly) {
      whereClause += " AND is_read = false"
    }

    // Get notifications
    const notificationsResult = await query(
      `SELECT id, type, title, message, data, is_read, read_at, created_at
       FROM notifications
       WHERE ${whereClause}
       ORDER BY created_at DESC
       LIMIT $${queryParams.length + 1} OFFSET $${queryParams.length + 2}`,
      [...queryParams, limit, offset],
    )

    // Get total count
    const countResult = await query(`SELECT COUNT(*) as total FROM notifications WHERE ${whereClause}`, queryParams)

    const total = Number.parseInt(countResult.rows[0].total)

    // Get unread count
    const unreadResult = await query(
      "SELECT COUNT(*) as unread FROM notifications WHERE user_id = $1 AND is_read = false",
      [req.user!.id],
    )

    const unreadCount = Number.parseInt(unreadResult.rows[0].unread)

    return createApiResponse({
      notifications: notificationsResult.rows.map((n) => ({
        id: n.id,
        type: n.type,
        title: n.title,
        message: n.message,
        data: n.data,
        isRead: n.is_read,
        readAt: n.read_at,
        createdAt: n.created_at,
      })),
      unreadCount,
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

export const PATCH = withAuth(async (req) => {
  try {
    const { action, notificationIds } = await req.json()

    if (action === "mark_all_read") {
      await query(
        "UPDATE notifications SET is_read = true, read_at = CURRENT_TIMESTAMP WHERE user_id = $1 AND is_read = false",
        [req.user!.id],
      )
    } else if (action === "mark_read" && notificationIds) {
      await query(
        "UPDATE notifications SET is_read = true, read_at = CURRENT_TIMESTAMP WHERE id = ANY($1) AND user_id = $2",
        [notificationIds, req.user!.id],
      )
    }

    return createApiResponse({ success: true })
  } catch (error) {
    return handleApiError(error)
  }
})
