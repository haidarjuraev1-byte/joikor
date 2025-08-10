import type { NextRequest } from "next/server"
import { query } from "@/lib/database/connection"
import { createApiResponse, handleApiError, getPaginationParams } from "@/lib/api/utils"

export async function GET(req: NextRequest) {
  try {
    const { page, limit, offset } = getPaginationParams(req)
    const url = new URL(req.url)

    // Get search parameters
    const searchQuery = url.searchParams.get("q") || ""
    const location = url.searchParams.get("location") || ""
    const skill = url.searchParams.get("skill") || ""
    const experience = url.searchParams.get("experience") || ""
    const education = url.searchParams.get("education") || ""
    const salaryMin = Number.parseInt(url.searchParams.get("salary_min") || "0")
    const salaryMax = Number.parseInt(url.searchParams.get("salary_max") || "999999")
    const availableOnly = url.searchParams.get("available") === "true"
    const verifiedOnly = url.searchParams.get("verified") === "true"
    const premiumOnly = url.searchParams.get("premium") === "true"
    const sortBy = url.searchParams.get("sort_by") || "relevance"

    const whereConditions = ["r.is_public = true", "u.is_active = true"]
    const queryParams: any[] = []
    let paramIndex = 1

    // Build dynamic WHERE clause
    if (searchQuery) {
      whereConditions.push(`(
        to_tsvector('russian', r.title || ' ' || COALESCE(r.summary, '')) @@ plainto_tsquery('russian', $${paramIndex})
        OR u.first_name ILIKE $${paramIndex + 1}
        OR u.last_name ILIKE $${paramIndex + 1}
        OR r.title ILIKE $${paramIndex + 1}
      )`)
      queryParams.push(searchQuery, `%${searchQuery}%`)
      paramIndex += 2
    }

    if (location && location !== "all") {
      whereConditions.push(`(r.location = $${paramIndex} OR up.location = $${paramIndex})`)
      queryParams.push(location)
      paramIndex++
    }

    if (skill && skill !== "all") {
      whereConditions.push(`r.skills @> $${paramIndex}`)
      queryParams.push(JSON.stringify([skill]))
      paramIndex++
    }

    if (experience && experience !== "all") {
      const expMap: { [key: string]: string } = {
        "1-2 года": "1-2",
        "2-3 года": "2-3",
        "3-4 года": "3-4",
        "4-5 лет": "4-5",
        "5+ лет": "5+",
      }

      if (expMap[experience]) {
        const [min, max] = expMap[experience].split("-")
        if (max === "+") {
          whereConditions.push(`r.experience_years >= $${paramIndex}`)
          queryParams.push(Number.parseInt(min))
        } else {
          whereConditions.push(`r.experience_years >= $${paramIndex} AND r.experience_years <= $${paramIndex + 1}`)
          queryParams.push(Number.parseInt(min), Number.parseInt(max))
          paramIndex++
        }
        paramIndex++
      }
    }

    if (salaryMin > 0) {
      whereConditions.push(`r.salary_expectation_max >= $${paramIndex}`)
      queryParams.push(salaryMin)
      paramIndex++
    }

    if (salaryMax < 999999) {
      whereConditions.push(`r.salary_expectation_min <= $${paramIndex}`)
      queryParams.push(salaryMax)
      paramIndex++
    }

    if (availableOnly) {
      whereConditions.push(`r.availability = 'available'`)
    }

    if (verifiedOnly) {
      whereConditions.push(`u.email_verified = true`)
    }

    // Build ORDER BY clause
    let orderBy = "r.updated_at DESC"
    switch (sortBy) {
      case "rating":
        orderBy = "user_rating DESC NULLS LAST, r.updated_at DESC"
        break
      case "experience":
        orderBy = "r.experience_years DESC, r.updated_at DESC"
        break
      case "salary-high":
        orderBy = "r.salary_expectation_max DESC NULLS LAST, r.updated_at DESC"
        break
      case "last-active":
        orderBy = "u.last_login DESC NULLS LAST, r.updated_at DESC"
        break
      case "relevance":
        orderBy = "r.is_primary DESC, r.views_count DESC, r.updated_at DESC"
        break
    }

    const whereClause = whereConditions.join(" AND ")

    // Get total count
    const countResult = await query(
      `SELECT COUNT(DISTINCT r.id) as total
       FROM resumes r
       JOIN users u ON r.user_id = u.id
       LEFT JOIN user_profiles up ON u.id = up.user_id
       WHERE ${whereClause}`,
      queryParams,
    )

    const total = Number.parseInt(countResult.rows[0].total)

    // Get candidates with pagination
    const candidatesResult = await query(
      `SELECT DISTINCT
        r.id, r.title, r.summary, r.experience_years, r.current_position, r.current_company,
        r.location, r.salary_expectation_min, r.salary_expectation_max, r.salary_currency,
        r.availability, r.skills, r.languages, r.views_count, r.updated_at,
        u.id as user_id, u.first_name, u.last_name, u.avatar_url, u.last_login, u.email_verified,
        up.location as profile_location, up.bio,
        -- Calculate user rating (placeholder - you can implement actual rating logic)
        4.5 as user_rating,
        95 as response_rate
       FROM resumes r
       JOIN users u ON r.user_id = u.id
       LEFT JOIN user_profiles up ON u.id = up.user_id
       WHERE ${whereClause}
       ORDER BY ${orderBy}
       LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`,
      [...queryParams, limit, offset],
    )

    const candidates = candidatesResult.rows.map((candidate) => ({
      id: candidate.id,
      userId: candidate.user_id,
      name: `${candidate.first_name} ${candidate.last_name}`,
      photo: candidate.avatar_url,
      title: candidate.title,
      summary: candidate.summary,
      location: candidate.location || candidate.profile_location,
      experienceYears: candidate.experience_years,
      currentPosition: candidate.current_position,
      currentCompany: candidate.current_company,
      salary: {
        min: candidate.salary_expectation_min,
        max: candidate.salary_expectation_max,
        currency: candidate.salary_currency,
      },
      availability: candidate.availability,
      skills: candidate.skills || [],
      languages: candidate.languages || [],
      viewsCount: candidate.views_count,
      rating: candidate.user_rating,
      responseRate: candidate.response_rate,
      verified: candidate.email_verified,
      lastActive: candidate.last_login,
      updatedAt: candidate.updated_at,
    }))

    return createApiResponse({
      candidates,
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
}
