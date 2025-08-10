"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Code,
  Palette,
  TrendingUp,
  ShoppingCart,
  DollarSign,
  GraduationCap,
  Heart,
  Users,
  Building,
  Truck,
  MapPin,
  UtensilsCrossed,
} from "lucide-react"

const iconMap = {
  Code,
  Palette,
  TrendingUp,
  ShoppingCart,
  DollarSign,
  GraduationCap,
  Heart,
  Users,
  Building,
  Truck,
  MapPin,
  UtensilsCrossed,
}

// Fallback categories that work without database
const fallbackCategories = [
  { id: "1", name: "IT и разработка", slug: "it-development", icon: "Code", color: "#3B82F6", job_count: 245 },
  { id: "2", name: "Дизайн", slug: "design", icon: "Palette", color: "#8B5CF6", job_count: 89 },
  { id: "3", name: "Маркетинг", slug: "marketing", icon: "TrendingUp", color: "#10B981", job_count: 156 },
  { id: "4", name: "Продажи", slug: "sales", icon: "ShoppingCart", color: "#F59E0B", job_count: 203 },
  { id: "5", name: "Финансы", slug: "finance", icon: "DollarSign", color: "#EF4444", job_count: 78 },
  { id: "6", name: "Образование", slug: "education", icon: "GraduationCap", color: "#06B6D4", job_count: 134 },
  { id: "7", name: "Медицина", slug: "healthcare", icon: "Heart", color: "#EC4899", job_count: 167 },
  { id: "8", name: "Управление", slug: "management", icon: "Users", color: "#84CC16", job_count: 92 },
]

async function fetchCategories() {
  try {
    const response = await fetch("/api/categories")
    if (!response.ok) {
      throw new Error("Failed to fetch categories")
    }
    const data = await response.json()
    return data.data || fallbackCategories
  } catch (error) {
    console.log("Using fallback categories:", error)
    return fallbackCategories
  }
}

export default function PopularCategories() {
  const [categories, setCategories] = useState(fallbackCategories)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCategories()
      .then(setCategories)
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <section className="py-12 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">Популярные категории</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">Популярные категории</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((category) => {
            const IconComponent = iconMap[category.icon as keyof typeof iconMap] || Code

            return (
              <Link key={category.id} href={`/jobs?category=${category.slug}`} className="group">
                <Card className="h-full transition-all duration-200 hover:shadow-lg hover:-translate-y-1 group-hover:border-primary">
                  <CardContent className="p-6 text-center">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4 transition-transform group-hover:scale-110"
                      style={{ backgroundColor: `${category.color}20` }}
                    >
                      <IconComponent className="w-6 h-6" style={{ color: category.color }} />
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <Badge variant="secondary" className="text-xs">
                      {category.job_count} вакансий
                    </Badge>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
