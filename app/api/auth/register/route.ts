import { sql } from "@/lib/database/connection"
import { createApiResponse, handleApiError } from "@/lib/api/utils"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export async function POST(request: Request) {
  try {
    const { email, password, firstName, lastName, userType } = await request.json()

    // Validate input
    if (!email || !password || !firstName || !lastName || !userType) {
      return createApiResponse(null, "All fields are required", 400)
    }

    if (!["job_seeker", "employer"].includes(userType)) {
      return createApiResponse(null, "Invalid user type", 400)
    }

    // Check if user already exists
    const existingUser = await sql`
      SELECT id FROM users WHERE email = ${email}
    `

    if (existingUser.length > 0) {
      return createApiResponse(null, "User already exists", 400)
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create user
    const newUser = await sql`
      INSERT INTO users (email, password_hash, first_name, last_name, user_type, is_active)
      VALUES (${email}, ${hashedPassword}, ${firstName}, ${lastName}, ${userType}, true)
      RETURNING id, email, first_name, last_name, user_type, created_at
    `

    const user = newUser[0]

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
        createdAt: user.created_at,
      },
      token,
    })
  } catch (error) {
    return handleApiError(error)
  }
}
