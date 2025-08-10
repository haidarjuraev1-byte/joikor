import { sql } from "@/lib/database/connection"
import { createApiResponse } from "@/lib/api/utils"

// Fallback categories data
const fallbackCategories = [
  { id: "1", name: "IT и разработка", slug: "it-development", icon: "Code", color: "#3B82F6", job_count: 245 },
  { id: "2", name: "Дизайн", slug: "design", icon: "Palette", color: "#8B5CF6", job_count: 89 },
  { id: "3", name: "Маркетинг", slug: "marketing", icon: "TrendingUp", color: "#10B981", job_count: 156 },
  { id: "4", name: "Продажи", slug: "sales", icon: "ShoppingCart", color: "#F59E0B", job_count: 203 },
  { id: "5", name: "Финансы", slug: "finance", icon: "DollarSign", color: "#EF4444", job_count: 78 },
  { id: "6", name: "Образование", slug: "education", icon: "GraduationCap", color: "#06B6D4", job_count: 134 },
  { id: "7", name: "Медицина", slug: "healthcare", icon: "Heart", color: "#EC4899", job_count: 167 },
  { id: "8", name: "Управление", slug: "management", icon: "Users", color: "#84CC16", job_count: 92 },
  { id: "9", name: "Строительство", slug: "construction", icon: "Building", color: "#F97316", job_count: 123 },
  { id: "10", name: "Транспорт", slug: "transportation", icon: "Truck", color: "#6366F1", job_count: 67 },
  { id: "11", name: "Туризм", slug: "tourism", icon: "MapPin", color: "#14B8A6", job_count: 45 },
  { id: "12", name: "Ресторан", slug: "restaurant", icon: "UtensilsCrossed", color: "#F43F5E", job_count: 89 },
]

export async function GET() {
  try {
    const categories = await sql`
      SELECT id, name_ru as name, slug, icon, color, 
             COALESCE(job_count, 0) as job_count
      FROM job_categories 
      WHERE is_active = true 
      ORDER BY sort_order, name_ru
    `

    return createApiResponse(categories)
  } catch (error) {
    console.log("Database not available, using fallback categories")
    // Return fallback data if database is not available
    return createApiResponse(fallbackCategories)
  }
}
