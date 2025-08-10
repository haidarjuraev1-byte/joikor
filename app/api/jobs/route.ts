import { sql } from "@/lib/database/connection"
import { createApiResponse, handleApiError } from "@/lib/api/utils"
import type { NextRequest } from "next/server"

// Fallback jobs data
const fallbackJobs = [
  {
    id: "1",
    title: "Frontend Developer",
    company: "TechCorp",
    location: "Душанбе",
    salary_min: 3000,
    salary_max: 5000,
    salary_currency: "TJS",
    employment_type: "full_time",
    is_remote: false,
    is_featured: true,
    created_at: new Date().toISOString(),
    category_slug: "it-development",
  },
  {
    id: "2",
    title: "UI/UX Designer",
    company: "DesignStudio",
    location: "Худжанд",
    salary_min: 2500,
    salary_max: 4000,
    salary_currency: "TJS",
    employment_type: "full_time",
    is_remote: true,
    is_featured: false,
    created_at: new Date().toISOString(),
    category_slug: "design",
  },
  {
    id: "3",
    title: "Marketing Manager",
    company: "MarketPro",
    location: "Душанбе",
    salary_min: 4000,
    salary_max: 6000,
    salary_currency: "TJS",
    employment_type: "full_time",
    is_remote: false,
    is_featured: true,
    created_at: new Date().toISOString(),
    category_slug: "marketing",
  },
]

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const category = searchParams.get("category")
    const search = searchParams.get("search")
    const location = searchParams.get("location")
    const employment_type = searchParams.get("employment_type")
    const experience_level = searchParams.get("experience_level")
    const is_remote = searchParams.get("is_remote")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    try {
      // Try to query the database
      let query = `
        SELECT j.*, c.name as company_name, c.logo_url as company_logo,
               cat.slug as category_slug, cat.name_ru as category_name
        FROM jobs j
        LEFT JOIN companies c ON j.company_id = c.id
        LEFT JOIN job_categories cat ON j.category_id = cat.id
        WHERE j.status = 'active'
      `

      const params = []
      let paramCount = 0

      if (category) {
        paramCount++
        query += ` AND cat.slug = $${paramCount}`
        params.push(category)
      }

      if (search) {
        paramCount++
        query += ` AND (j.title ILIKE $${paramCount} OR j.description ILIKE $${paramCount})`
        params.push(`%${search}%`)
      }

      if (location) {
        paramCount++
        query += ` AND j.location ILIKE $${paramCount}`
        params.push(`%${location}%`)
      }

      if (employment_type) {
        paramCount++
        query += ` AND j.employment_type = $${paramCount}`
        params.push(employment_type)
      }

      if (experience_level) {
        paramCount++
        query += ` AND j.experience_level = $${paramCount}`
        params.push(experience_level)
      }

      if (is_remote === "true") {
        query += ` AND j.is_remote = true`
      }

      query += ` ORDER BY j.is_featured DESC, j.created_at DESC`
      query += ` LIMIT ${limit} OFFSET ${(page - 1) * limit}`

      const jobs = await sql.query(query, params)

      return createApiResponse({
        jobs: jobs.rows,
        pagination: {
          page,
          limit,
          total: jobs.rows.length,
          totalPages: Math.ceil(jobs.rows.length / limit),
        },
      })
    } catch (dbError) {
      console.log("Database not available, using fallback jobs")

      // Filter fallback jobs based on query parameters
      let filteredJobs = fallbackJobs

      if (category) {
        filteredJobs = filteredJobs.filter((job) => job.category_slug === category)
      }

      if (search) {
        filteredJobs = filteredJobs.filter(
          (job) =>
            job.title.toLowerCase().includes(search.toLowerCase()) ||
            job.company.toLowerCase().includes(search.toLowerCase()),
        )
      }

      if (location) {
        filteredJobs = filteredJobs.filter((job) => job.location.toLowerCase().includes(location.toLowerCase()))
      }

      if (employment_type) {
        filteredJobs = filteredJobs.filter((job) => job.employment_type === employment_type)
      }

      if (is_remote === "true") {
        filteredJobs = filteredJobs.filter((job) => job.is_remote)
      }

      const startIndex = (page - 1) * limit
      const endIndex = startIndex + limit
      const paginatedJobs = filteredJobs.slice(startIndex, endIndex)

      return createApiResponse({
        jobs: paginatedJobs,
        pagination: {
          page,
          limit,
          total: filteredJobs.length,
          totalPages: Math.ceil(filteredJobs.length / limit),
        },
      })
    }
  } catch (error) {
    return handleApiError(error)
  }
}
