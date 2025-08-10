import { sql } from "@/lib/database/connection"
import { createApiResponse, handleApiError } from "@/lib/api/utils"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return createApiResponse(null, "Email and password are required", 400)
    }

    // Find user
    const users = await sql`
      SELECT id, email, password_hash, first_name, last_name, user_type, is_active
      FROM users 
      WHERE email = ${email}
    `

    if (users.length === 0) {
      return createApiResponse(null, "Invalid credentials", 401)
    }

    const user = users[0]

    if (!user.is_active) {
      return createApiResponse(null, "Account is deactivated", 401)
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password_hash)

    if (!isValidPassword) {
      return createApiResponse(null, "Invalid credentials", 401)
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id, email: user.email, userType: user.user_type }, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    })

    return createApiResponse({
      user: {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        userType: user.user_type,
      },
      token,
    })
  } catch (error) {
    return handleApiError(error)
  }
}
