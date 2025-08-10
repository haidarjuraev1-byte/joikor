import { neon } from "@neondatabase/serverless"

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set")
}

export const sql = neon(process.env.DATABASE_URL)

// Helper function for backwards compatibility with parameterized queries
export const query = async (text: string, params: any[] = []) => {
  try {
    // Use the neon sql template literal with proper parameter substitution
    const result = await sql(text, params)
    return { rows: result }
  } catch (error) {
    console.error("Database query error:", error)
    throw error
  }
}
