import { withAuth } from "@/lib/auth/middleware"
import { query } from "@/lib/database/connection"
import { createApiResponse, handleApiError } from "@/lib/api/utils"

export const GET = withAuth(async (req) => {
  try {
    // Get detailed user information
    const userResult = await query(
      `SELECT u.id, u.email, u.role, u.first_name, u.last_name, u.avatar_url, 
              u.email_verified, u.created_at, u.last_login,
              up.location, up.bio, up.website_url, up.linkedin_url, up.github_url,
              up.preferred_language, up.notification_preferences
       FROM users u
       LEFT JOIN user_profiles up ON u.id = up.user_id
       WHERE u.id = $1`,
      [req.user!.id],
    )

    if (userResult.rows.length === 0) {
      return createApiResponse(null, 404)
    }

    const user = userResult.rows[0]

    // Get subscription info if employer
    let subscription = null
    if (user.role === "employer") {
      const subResult = await query(
        `SELECT us.*, sp.name as plan_name, sp.features, sp.limits
         FROM user_subscriptions us
         JOIN subscription_plans sp ON us.plan_id = sp.id
         WHERE us.user_id = $1 AND us.status = 'active' AND us.ends_at > CURRENT_TIMESTAMP
         ORDER BY us.ends_at DESC
         LIMIT 1`,
        [user.id],
      )

      if (subResult.rows.length > 0) {
        subscription = subResult.rows[0]
      }
    }

    return createApiResponse({
      id: user.id,
      email: user.email,
      role: user.role,
      firstName: user.first_name,
      lastName: user.last_name,
      avatar: user.avatar_url,
      emailVerified: user.email_verified,
      profile: {
        location: user.location,
        bio: user.bio,
        websiteUrl: user.website_url,
        linkedinUrl: user.linkedin_url,
        githubUrl: user.github_url,
        preferredLanguage: user.preferred_language,
        notificationPreferences: user.notification_preferences,
      },
      subscription,
      createdAt: user.created_at,
      lastLogin: user.last_login,
    })
  } catch (error) {
    return handleApiError(error)
  }
})
