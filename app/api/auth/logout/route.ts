import type { NextRequest } from "next/server"
import { createApiResponse } from "@/lib/api/utils"
import { cookies } from "next/headers"

export async function POST(req: NextRequest) {
  const cookieStore = await cookies()

  // Clear the auth token cookie
  cookieStore.delete("auth-token")

  return createApiResponse({
    message: "Logout successful",
  })
}
