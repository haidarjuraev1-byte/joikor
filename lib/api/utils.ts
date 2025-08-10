import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"

export function createApiResponse(data: any, status = 200) {
  return NextResponse.json(
    {
      success: true,
      data,
      timestamp: new Date().toISOString(),
    },
    { status },
  )
}

export function createErrorResponse(message: string, status = 400, details?: any) {
  return NextResponse.json(
    {
      success: false,
      error: {
        message,
        details,
      },
      timestamp: new Date().toISOString(),
    },
    { status },
  )
}

export async function validateRequest<T>(req: NextRequest, schema: z.ZodSchema<T>): Promise<T> {
  try {
    const body = await req.json()
    return schema.parse(body)
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(`Validation error: ${error.errors.map((e) => e.message).join(", ")}`)
    }
    throw new Error("Invalid request body")
  }
}

export function handleApiError(error: any) {
  console.error("API Error:", error)

  if (error.message.includes("Validation error")) {
    return createErrorResponse(error.message, 400)
  }

  if (error.message.includes("not found")) {
    return createErrorResponse(error.message, 404)
  }

  if (error.message.includes("Unauthorized")) {
    return createErrorResponse("Unauthorized", 401)
  }

  if (error.message.includes("Forbidden")) {
    return createErrorResponse("Forbidden", 403)
  }

  return createErrorResponse("Internal server error", 500)
}

export function getPaginationParams(req: NextRequest) {
  const url = new URL(req.url)
  const page = Math.max(1, Number.parseInt(url.searchParams.get("page") || "1"))
  const limit = Math.min(100, Math.max(1, Number.parseInt(url.searchParams.get("limit") || "20")))
  const offset = (page - 1) * limit

  return { page, limit, offset }
}

export function getSearchParams(req: NextRequest) {
  const url = new URL(req.url)

  return {
    q: url.searchParams.get("q") || "",
    location: url.searchParams.get("location") || "all",
    category: url.searchParams.get("category") || "all",
    type: url.searchParams.get("type") || "all",
    experience: url.searchParams.get("experience") || "all",
    salaryMin: Number.parseInt(url.searchParams.get("salary_min") || "0"),
    salaryMax: Number.parseInt(url.searchParams.get("salary_max") || "999999"),
    remote: url.searchParams.get("remote") === "true",
    featured: url.searchParams.get("featured") === "true",
    urgent: url.searchParams.get("urgent") === "true",
    sortBy: url.searchParams.get("sort_by") || "newest",
  }
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export function sanitizeHtml(html: string): string {
  // Basic HTML sanitization - in production, use a proper library like DOMPurify
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, "")
    .replace(/on\w+="[^"]*"/gi, "")
}

export function formatCurrency(amount: number, currency = "TJS"): string {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatDate(date: string | Date, locale = "ru-RU"): string {
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date))
}

export function formatRelativeTime(date: string | Date, locale = "ru-RU"): string {
  const now = new Date()
  const targetDate = new Date(date)
  const diffInSeconds = Math.floor((now.getTime() - targetDate.getTime()) / 1000)

  if (diffInSeconds < 60) return "только что"
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} мин назад`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} ч назад`
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} дн назад`

  return formatDate(date, locale)
}
