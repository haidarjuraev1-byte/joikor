import type { NextRequest } from "next/server"
import { query } from "@/lib/database/connection"
import { getAuthUser } from "@/lib/auth/middleware"
import { createApiResponse, createErrorResponse, handleApiError } from "@/lib/api/utils"

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const jobId = params.id
    const user = await getAuthUser()

    // Increment view count (only for non-owners and unique views)
    if (user) {
      const isOwner = await query(
        `SELECT 1 FROM jobs j
         LEFT JOIN company_members cm ON j.company_id = cm.company_id
         WHERE j.id = $1 AND (j.created_by = $2 OR cm.user_id = $2)`,
        [jobId, user.id],
      )

      if (isOwner.rows.length === 0) {
        // Check if user already viewed this job today
        const existingView = await query(
          `SELECT 1 FROM job_views 
           WHERE job_id = $1 AND user_id = $2 AND viewed_at > CURRENT_DATE`,
          [jobId, user.id],
        )

        if (existingView.rows.length === 0) {
          await query(
            `INSERT INTO job_views (job_id, user_id, ip_address, user_agent)
             VALUES ($1, $2, $3, $4)`,
            [jobId, user.id, req.ip, req.headers.get("user-agent")],
          )

          await query("UPDATE jobs SET views_count = views_count + 1 WHERE id = $1", [jobId])
        }
      }
    } else {
      // For anonymous users, track by IP
      const clientIP = req.ip || req.headers.get("x-forwarded-for") || "unknown"
      const existingView = await query(
        `SELECT 1 FROM job_views 
         WHERE job_id = $1 AND ip_address = $2 AND viewed_at > CURRENT_DATE`,
        [jobId, clientIP],
      )

      if (existingView.rows.length === 0) {
        await query(
          `INSERT INTO job_views (job_id, ip_address, user_agent)
           VALUES ($1, $2, $3)`,
          [jobId, clientIP, req.headers.get("user-agent")],
        )

        await query("UPDATE jobs SET views_count = views_count + 1 WHERE id = $1", [jobId])
      }
    }

    // Get job details
    const jobResult = await query(
      `SELECT 
        j.id, j.title, j.slug, j.description, j.requirements, j.benefits, j.location,
        j.employment_type, j.experience_level, j.salary_min, j.salary_max, j.salary_currency,
        j.salary_period, j.is_remote, j.is_featured, j.is_urgent, j.skills, j.languages, 
        j.application_deadline, j.custom_questions, j.views_count, j.applications_count, 
        j.saves_count, j.created_at, j.published_at,
        c.id as company_id, c.name as company_name, c.slug as company_slug,
        c.description as company_description, c.logo_url as company_logo,
        c.cover_image_url as company_cover, c.website_url as company_website, 
        c.location as company_location, c.industry as company_industry, 
        c.company_size, c.founded_year, c.is_verified as company_verified,
        cat.name_ru as category_name, cat.slug as category_slug, cat.icon as category_icon,
        creator.first_name as contact_first_name, creator.last_name as contact_last_name,
        creator.email as contact_email
       FROM jobs j
       LEFT JOIN companies c ON j.company_id = c.id
       LEFT JOIN job_categories cat ON j.category_id = cat.id
       LEFT JOIN users creator ON j.created_by = creator.id
       WHERE j.id = $1 AND j.status = 'active'`,
      [jobId],
    )

    if (jobResult.rows.length === 0) {
      return createErrorResponse("Job not found", 404)
    }

    const job = jobResult.rows[0]

    // Get job skills with details
    const skillsResult = await query(
      `SELECT js.skill_name, js.is_required, js.experience_years, js.proficiency_level
       FROM job_skills js 
       WHERE js.job_id = $1
       ORDER BY js.is_required DESC, js.skill_name`,
      [jobId],
    )

    // Check if user has saved this job
    let isSaved = false
    let hasApplied = false
    if (user) {
      const savedResult = await query("SELECT 1 FROM saved_jobs WHERE user_id = $1 AND job_id = $2", [user.id, jobId])
      isSaved = savedResult.rows.length > 0

      const appliedResult = await query("SELECT 1 FROM applications WHERE user_id = $1 AND job_id = $2", [
        user.id,
        jobId,
      ])
      hasApplied = appliedResult.rows.length > 0
    }

    // Get related jobs
    const relatedJobsResult = await query(
      `SELECT j.id, j.title, j.slug, c.name as company_name, j.salary_min, j.salary_max, 
              j.salary_currency, j.location, j.is_remote, j.created_at
       FROM jobs j
       LEFT JOIN companies c ON j.company_id = c.id
       WHERE j.category_id = (SELECT category_id FROM jobs WHERE id = $1) 
         AND j.id != $1 AND j.status = 'active'
       ORDER BY j.is_featured DESC, j.created_at DESC
       LIMIT 5`,
      [jobId],
    )

    // Get company's other jobs
    const companyJobsResult = await query(
      `SELECT j.id, j.title, j.slug, j.location, j.is_remote, j.created_at
       FROM jobs j
       WHERE j.company_id = $1 AND j.id != $2 AND j.status = 'active'
       ORDER BY j.created_at DESC
       LIMIT 3`,
      [job.company_id, jobId],
    )

    return createApiResponse({
      id: job.id,
      title: job.title,
      slug: job.slug,
      description: job.description,
      requirements: job.requirements,
      benefits: job.benefits,
      location: job.location,
      employmentType: job.employment_type,
      experienceLevel: job.experience_level,
      salary: {
        min: job.salary_min,
        max: job.salary_max,
        currency: job.salary_currency,
        period: job.salary_period,
      },
      isRemote: job.is_remote,
      isFeatured: job.is_featured,
      isUrgent: job.is_urgent,
      skills: skillsResult.rows.map((s) => ({
        name: s.skill_name,
        required: s.is_required,
        experienceYears: s.experience_years,
        proficiencyLevel: s.proficiency_level,
      })),
      languages: job.languages || [],
      applicationDeadline: job.application_deadline,
      customQuestions: job.custom_questions || [],
      viewsCount: job.views_count,
      applicationsCount: job.applications_count,
      savesCount: job.saves_count,
      company: {
        id: job.company_id,
        name: job.company_name,
        slug: job.company_slug,
        description: job.company_description,
        logo: job.company_logo,
        cover: job.company_cover,
        website: job.company_website,
        location: job.company_location,
        industry: job.company_industry,
        size: job.company_size,
        foundedYear: job.founded_year,
        verified: job.company_verified,
      },
      category: {
        name: job.category_name,
        slug: job.category_slug,
        icon: job.category_icon,
      },
      contact: {
        name: `${job.contact_first_name} ${job.contact_last_name}`,
        email: job.contact_email,
      },
      isSaved,
      hasApplied,
      createdAt: job.created_at,
      publishedAt: job.published_at,
      relatedJobs: relatedJobsResult.rows.map((rj) => ({
        id: rj.id,
        title: rj.title,
        slug: rj.slug,
        company: rj.company_name,
        salary: rj.salary_min && rj.salary_max ? `${rj.salary_min} - ${rj.salary_max} ${rj.salary_currency}` : null,
        location: rj.location,
        isRemote: rj.is_remote,
        postedAt: rj.created_at,
      })),
      companyJobs: companyJobsResult.rows.map((cj) => ({
        id: cj.id,
        title: cj.title,
        slug: cj.slug,
        location: cj.location,
        isRemote: cj.is_remote,
        postedAt: cj.created_at,
      })),
    })
  } catch (error) {
    return handleApiError(error)
  }
}
