import { query } from "@/lib/database/connection"
import { withAuth } from "@/lib/auth/middleware"
import { createApiResponse, createErrorResponse, handleApiError } from "@/lib/api/utils"

export const POST = withAuth(async (req, { params }: { params: { id: string } }) => {
  try {
    const jobId = params.id

    // Check if job exists
    const jobExists = await query("SELECT 1 FROM jobs WHERE id = $1 AND status = 'active'", [jobId])
    if (jobExists.rows.length === 0) {
      return createErrorResponse("Job not found", 404)
    }

    // Check if already saved
    const existingSave = await query("SELECT id FROM saved_jobs WHERE user_id = $1 AND job_id = $2", [
      req.user!.id,
      jobId,
    ])

    if (existingSave.rows.length > 0) {
      // Unsave the job
      await query("DELETE FROM saved_jobs WHERE user_id = $1 AND job_id = $2", [req.user!.id, jobId])
      await query("UPDATE jobs SET saves_count = saves_count - 1 WHERE id = $1", [jobId])

      return createApiResponse({
        saved: false,
        message: "Job removed from saved jobs",
      })
    } else {
      // Save the job
      await query("INSERT INTO saved_jobs (user_id, job_id) VALUES ($1, $2)", [req.user!.id, jobId])
      await query("UPDATE jobs SET saves_count = saves_count + 1 WHERE id = $1", [jobId])

      return createApiResponse({
        saved: true,
        message: "Job saved successfully",
      })
    }
  } catch (error) {
    return handleApiError(error)
  }
})
