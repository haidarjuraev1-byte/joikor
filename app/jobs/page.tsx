"use client"

import { useState, useEffect, useMemo } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Search,
  MapPin,
  Filter,
  SlidersHorizontal,
  Briefcase,
  Clock,
  DollarSign,
  Heart,
  Share2,
  Building,
  Eye,
  X,
  Grid3X3,
  List,
  Users,
  Calendar,
  AlertCircle,
} from "lucide-react"
import Link from "next/link"

// Default filter options
const defaultFilters = {
  categories: [
    { id: "1", name: "IT и разработка", slug: "it-development", icon: "code", color: "#3b82f6" },
    { id: "2", name: "Дизайн", slug: "design", icon: "palette", color: "#ec4899" },
    { id: "3", name: "Маркетинг", slug: "marketing", icon: "megaphone", color: "#f59e0b" },
    { id: "4", name: "Финансы", slug: "finance", icon: "banknote", color: "#10b981" },
    { id: "5", name: "Образование", slug: "education", icon: "graduation-cap", color: "#8b5cf6" },
    { id: "6", name: "Медицина", slug: "healthcare", icon: "stethoscope", color: "#ef4444" },
  ],
  locations: ["Душанбе", "Худжанд", "Куляб", "Бохтар", "Хорог", "Удаленно"],
  employmentTypes: [
    { value: "full_time", label: "Полная занятость" },
    { value: "part_time", label: "Частичная занятость" },
    { value: "contract", label: "Контракт" },
    { value: "internship", label: "Стажировка" },
    { value: "freelance", label: "Фриланс" },
  ],
  experienceLevels: [
    { value: "entry", label: "Без опыта" },
    { value: "junior", label: "Младший" },
    { value: "mid", label: "Средний" },
    { value: "senior", label: "Старший" },
    { value: "lead", label: "Ведущий" },
    { value: "executive", label: "Руководитель" },
  ],
}

interface Job {
  id: string
  title: string
  slug?: string
  description?: string
  company: {
    id?: string
    name: string
    logo?: string
    slug?: string
  }
  category?: {
    name?: string
    slug?: string
    icon?: string
    color?: string
  }
  location: string
  employmentType?: string
  experienceLevel?: string
  salary?: {
    min?: number | null
    max?: number | null
    currency?: string
    period?: string
  }
  isRemote?: boolean
  isFeatured?: boolean
  isUrgent?: boolean
  skills?: string[]
  viewsCount?: number
  applicationsCount?: number
  savesCount?: number
  applicationDeadline?: string | null
  createdAt: string
  isSaved?: boolean
}

interface ApiResponse {
  jobs: Job[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext?: boolean
    hasPrev?: boolean
  }
  filters?: {
    categories?: Array<{ id: string; name: string; slug: string; icon?: string; color?: string }>
    locations?: string[]
    employmentTypes?: Array<{ value: string; label: string }>
    experienceLevels?: Array<{ value: string; label: string }>
  }
}

// Fallback jobs for testing
const fallbackJobs: Job[] = [
  {
    id: "1",
    title: "Frontend Developer",
    company: {
      name: "TechCorp",
      logo: "/placeholder.svg?height=100&width=100",
    },
    location: "Душанбе",
    employmentType: "full_time",
    experienceLevel: "mid",
    salary: {
      min: 3000,
      max: 5000,
      currency: "TJS",
      period: "monthly",
    },
    isRemote: false,
    isFeatured: true,
    isUrgent: false,
    skills: ["JavaScript", "React", "TypeScript"],
    viewsCount: 120,
    applicationsCount: 15,
    savesCount: 8,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    isSaved: false,
  },
  {
    id: "2",
    title: "UI/UX Designer",
    company: {
      name: "DesignStudio",
      logo: "/placeholder.svg?height=100&width=100",
    },
    location: "Худжанд",
    employmentType: "full_time",
    experienceLevel: "senior",
    salary: {
      min: 2500,
      max: 4000,
      currency: "TJS",
      period: "monthly",
    },
    isRemote: true,
    isFeatured: false,
    isUrgent: true,
    skills: ["Figma", "Adobe XD", "UI Design", "UX Research"],
    viewsCount: 95,
    applicationsCount: 8,
    savesCount: 12,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    isSaved: false,
  },
  {
    id: "3",
    title: "Marketing Manager",
    company: {
      name: "MarketPro",
      logo: "/placeholder.svg?height=100&width=100",
    },
    location: "Душанбе",
    employmentType: "full_time",
    experienceLevel: "senior",
    salary: {
      min: 4000,
      max: 6000,
      currency: "TJS",
      period: "monthly",
    },
    isRemote: false,
    isFeatured: true,
    isUrgent: false,
    skills: ["Digital Marketing", "SEO", "Content Strategy", "Analytics"],
    viewsCount: 78,
    applicationsCount: 6,
    savesCount: 5,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    isSaved: false,
  },
]

export default function JobsPage() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState(defaultFilters)
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
    hasNext: false,
    hasPrev: false,
  })

  // Filter states
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "")
  const [locationFilter, setLocationFilter] = useState(searchParams.get("location") || "all")
  const [categoryFilter, setCategoryFilter] = useState(searchParams.get("category") || "all")
  const [typeFilter, setTypeFilter] = useState(searchParams.get("type") || "all")
  const [experienceFilter, setExperienceFilter] = useState(searchParams.get("experience") || "all")
  const [showFilters, setShowFilters] = useState(false)
  const [viewMode, setViewMode] = useState<"list" | "gallery">("list")
  const [salaryRange, setSalaryRange] = useState([
    Number.parseInt(searchParams.get("salary_min") || "1000"),
    Number.parseInt(searchParams.get("salary_max") || "10000"),
  ])
  const [remoteOnly, setRemoteOnly] = useState(searchParams.get("remote") === "true")
  const [featuredOnly, setFeaturedOnly] = useState(searchParams.get("featured") === "true")
  const [urgentOnly, setUrgentOnly] = useState(searchParams.get("urgent") === "true")
  const [sortBy, setSortBy] = useState(searchParams.get("sort_by") || "newest")
  const [currentPage, setCurrentPage] = useState(Number.parseInt(searchParams.get("page") || "1"))

  // Fetch jobs from API
  const fetchJobs = async (page = 1, updateUrl = true) => {
    setLoading(true)
    setError(null)

    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: pagination.limit.toString(),
        q: searchQuery,
        location: locationFilter !== "all" ? locationFilter : "",
        category: categoryFilter !== "all" ? categoryFilter : "",
        type: typeFilter !== "all" ? typeFilter : "",
        experience: experienceFilter !== "all" ? experienceFilter : "",
        salary_min: salaryRange[0].toString(),
        salary_max: salaryRange[1].toString(),
        remote: remoteOnly.toString(),
        featured: featuredOnly.toString(),
        urgent: urgentOnly.toString(),
        sort_by: sortBy,
      })

      // Update URL if needed
      if (updateUrl) {
        const newUrl = `/jobs?${params.toString()}`
        router.push(newUrl, { scroll: false })
      }

      try {
        const response = await fetch(`/api/jobs?${params}`)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data: { data: ApiResponse } = await response.json()

        // Use the API data or fallback to defaults
        setJobs(data.data.jobs || fallbackJobs)
        setPagination(
          data.data.pagination || {
            page,
            limit: 10,
            total: fallbackJobs.length,
            totalPages: Math.ceil(fallbackJobs.length / 10),
            hasNext: page * 10 < fallbackJobs.length,
            hasPrev: page > 1,
          },
        )

        // If API returns filters, use them, otherwise keep defaults
        if (data.data.filters) {
          setFilters({
            categories: data.data.filters.categories || defaultFilters.categories,
            locations: data.data.filters.locations || defaultFilters.locations,
            employmentTypes: data.data.filters.employmentTypes || defaultFilters.employmentTypes,
            experienceLevels: data.data.filters.experienceLevels || defaultFilters.experienceLevels,
          })
        }

        setCurrentPage(page)
      } catch (apiError) {
        console.error("API error:", apiError)
        // Fallback to static data
        setJobs(fallbackJobs)
        setPagination({
          page,
          limit: 10,
          total: fallbackJobs.length,
          totalPages: Math.ceil(fallbackJobs.length / 10),
          hasNext: page * 10 < fallbackJobs.length,
          hasPrev: page > 1,
        })
      }
    } catch (error) {
      console.error("Error fetching jobs:", error)
      setError("Не удалось загрузить вакансии. Попробуйте еще раз.")
      // Fallback to static data
      setJobs(fallbackJobs)
      setPagination({
        page,
        limit: 10,
        total: fallbackJobs.length,
        totalPages: Math.ceil(fallbackJobs.length / 10),
        hasNext: page * 10 < fallbackJobs.length,
        hasPrev: page > 1,
      })
    } finally {
      setLoading(false)
    }
  }

  // Debounced search effect
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchJobs(1)
    }, 300)

    return () => clearTimeout(timer)
  }, [
    searchQuery,
    locationFilter,
    categoryFilter,
    typeFilter,
    experienceFilter,
    salaryRange,
    remoteOnly,
    featuredOnly,
    urgentOnly,
    sortBy,
  ])

  // Initial load
  useEffect(() => {
    fetchJobs(currentPage, false)
  }, [])

  const clearFilters = () => {
    setSearchQuery("")
    setLocationFilter("all")
    setCategoryFilter("all")
    setTypeFilter("all")
    setExperienceFilter("all")
    setSalaryRange([1000, 10000])
    setRemoteOnly(false)
    setFeaturedOnly(false)
    setUrgentOnly(false)
    setSortBy("newest")
  }

  const activeFiltersCount = useMemo(() => {
    return (
      [
        searchQuery,
        locationFilter !== "all",
        categoryFilter !== "all",
        typeFilter !== "all",
        experienceFilter !== "all",
        remoteOnly,
        featuredOnly,
        urgentOnly,
      ].filter(Boolean).length + (salaryRange[0] !== 1000 || salaryRange[1] !== 10000 ? 1 : 0)
    )
  }, [
    searchQuery,
    locationFilter,
    categoryFilter,
    typeFilter,
    experienceFilter,
    salaryRange,
    remoteOnly,
    featuredOnly,
    urgentOnly,
  ])

  const toggleSaveJob = async (jobId: string) => {
    try {
      // Try to call the API
      try {
        const response = await fetch(`/api/jobs/${jobId}/save`, {
          method: "POST",
        })

        if (response.ok) {
          const result = await response.json()
          setJobs(
            jobs.map((job) =>
              job.id === jobId
                ? {
                    ...job,
                    isSaved: result.data.saved,
                    savesCount: (job.savesCount || 0) + (result.data.saved ? 1 : -1),
                  }
                : job,
            ),
          )
          return
        }
      } catch (apiError) {
        console.error("API error:", apiError)
      }

      // Fallback: toggle locally if API fails
      setJobs(
        jobs.map((job) =>
          job.id === jobId
            ? {
                ...job,
                isSaved: !job.isSaved,
                savesCount: (job.savesCount || 0) + (job.isSaved ? -1 : 1),
              }
            : job,
        ),
      )
    } catch (error) {
      console.error("Error toggling save job:", error)
    }
  }

  const shareJob = async (job: Job) => {
    const url = `${window.location.origin}/job/${job.slug || job.id}`

    if (navigator.share) {
      try {
        await navigator.share({
          title: job.title,
          text: `${job.title} в ${job.company.name}`,
          url,
        })
      } catch (error) {
        // User cancelled sharing
      }
    } else {
      // Fallback to clipboard
      try {
        await navigator.clipboard.writeText(url)
        // You could show a toast notification here
      } catch (error) {
        console.error("Error copying to clipboard:", error)
      }
    }
  }

  const formatSalary = (salary?: Job["salary"]) => {
    if (!salary || (!salary.min && !salary.max)) return "По договоренности"

    const periodMap: { [key: string]: string } = {
      hourly: "/час",
      daily: "/день",
      weekly: "/неделя",
      monthly: "/мес",
      yearly: "/год",
    }

    const period = salary.period ? periodMap[salary.period] || "/мес" : "/мес"

    if (salary.min && salary.max) {
      return `${formatCurrency(salary.min)} - ${formatCurrency(salary.max)}${period}`
    } else if (salary.min) {
      return `от ${formatCurrency(salary.min)}${period}`
    } else if (salary.max) {
      return `до ${formatCurrency(salary.max)}${period}`
    }

    return "По договоренности"
  }

  const formatCurrency = (amount?: number | null, currency = "TJS") => {
    if (amount === undefined || amount === null) return ""
    return new Intl.NumberFormat("ru-RU").format(amount)
  }

  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (diffInSeconds < 60) {
      return "Только что"
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60)
      return `${minutes} ${getRussianPluralForm(minutes, ["минуту", "минуты", "минут"])} назад`
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600)
      return `${hours} ${getRussianPluralForm(hours, ["час", "часа", "часов"])} назад`
    } else if (diffInSeconds < 604800) {
      const days = Math.floor(diffInSeconds / 86400)
      return `${days} ${getRussianPluralForm(days, ["день", "дня", "дней"])} назад`
    } else {
      return date.toLocaleDateString("ru-RU")
    }
  }

  const getRussianPluralForm = (number: number, forms: [string, string, string]) => {
    const remainder10 = number % 10
    const remainder100 = number % 100

    if (remainder10 === 1 && remainder100 !== 11) {
      return forms[0]
    } else if (remainder10 >= 2 && remainder10 <= 4 && (remainder100 < 10 || remainder100 >= 20)) {
      return forms[1]
    } else {
      return forms[2]
    }
  }

  const getEmploymentTypeLabel = (type?: string) => {
    if (!type) return "Не указано"

    const typeMap: { [key: string]: string } = {
      full_time: "Полная занятость",
      part_time: "Частичная занятость",
      contract: "Контракт",
      internship: "Стажировка",
      freelance: "Фриланс",
    }
    return typeMap[type] || type
  }

  const getExperienceLevelLabel = (level?: string) => {
    if (!level) return "Не указано"

    const levelMap: { [key: string]: string } = {
      entry: "Без опыта",
      junior: "Младший",
      mid: "Средний",
      senior: "Старший",
      lead: "Ведущий",
      executive: "Руководитель",
    }
    return levelMap[level] || level
  }

  const JobCard = ({ job, isGallery = false }: { job: Job; isGallery?: boolean }) => (
    <Card
      className={`hover:shadow-lg transition-all duration-300 cursor-pointer ${
        job.isFeatured ? "border-primary/20 ring-1 ring-primary/10" : ""
      } ${isGallery ? "h-full" : ""}`}
    >
      <CardContent className={`${isGallery ? "p-3 sm:p-4" : "p-4 sm:p-6"}`}>
        <div className={`flex ${isGallery ? "flex-col" : "flex-col sm:flex-row"} gap-3 sm:gap-4`}>
          {/* Company Logo */}
          <div className={`${isGallery ? "mx-auto" : "mx-auto sm:mx-0"} flex-shrink-0`}>
            <Avatar className="h-12 w-12 sm:h-14 sm:w-14">
              <AvatarImage src={job.company.logo || "/placeholder.svg?height=100&width=100"} alt={job.company.name} />
              <AvatarFallback className="text-sm">
                {job.company?.name
                  ? job.company.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()
                  : "?"}
              </AvatarFallback>
            </Avatar>
          </div>

          <div className={`flex-1 ${isGallery ? "text-center" : "text-center sm:text-left"}`}>
            <div
              className={`flex ${isGallery ? "flex-col items-center" : "flex-col sm:flex-row sm:items-start sm:justify-between"} mb-2 sm:mb-3`}
            >
              <div className={isGallery ? "mb-2" : "mb-2 sm:mb-0"}>
                <div className="flex items-center gap-1 sm:gap-2 mb-2 flex-wrap justify-center sm:justify-start">
                  {job.isFeatured && (
                    <Badge className="bg-primary/10 text-primary border-primary/20 text-xs">Рекомендуемая</Badge>
                  )}
                  {job.isUrgent && (
                    <Badge variant="destructive" className="text-xs">
                      Срочно
                    </Badge>
                  )}
                  {job.isRemote && (
                    <Badge variant="outline" className="text-xs">
                      Удаленно
                    </Badge>
                  )}
                  {job.applicationDeadline &&
                    new Date(job.applicationDeadline) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) && (
                      <Badge variant="secondary" className="text-xs">
                        <Calendar className="h-3 w-3 mr-1" />
                        До {new Date(job.applicationDeadline).toLocaleDateString()}
                      </Badge>
                    )}
                </div>
                <Link href={`/job/${job.slug || job.id}`}>
                  <h3 className="text-base sm:text-lg font-semibold hover:text-primary transition-colors mb-1 line-clamp-2">
                    {job.title || "Без названия"}
                  </h3>
                </Link>
                <Link href={`/company/${job.company.slug || job.company.id || "#"}`}>
                  <div className="flex items-center gap-2 mb-2 justify-center sm:justify-start">
                    <Building className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <span className="text-sm text-muted-foreground hover:text-primary transition-colors truncate">
                      {job.company?.name || "Не указано"}
                    </span>
                  </div>
                </Link>
              </div>
              {!isGallery && (
                <div className="flex items-center gap-2 justify-center sm:justify-end">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      toggleSaveJob(job.id)
                    }}
                    className={`h-8 w-8 ${job.isSaved ? "text-red-500" : ""}`}
                  >
                    <Heart className={`h-4 w-4 ${job.isSaved ? "fill-current" : ""}`} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      shareJob(job)
                    }}
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>

            {!isGallery && job.description && (
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{job.description}</p>
            )}

            <div
              className={`grid ${isGallery ? "grid-cols-1 gap-1" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2"} mb-3 text-xs sm:text-sm`}
            >
              <div className="flex items-center gap-1 justify-center sm:justify-start">
                <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
                <span className="truncate">{job.location || "Не указано"}</span>
              </div>
              <div className="flex items-center gap-1 justify-center sm:justify-start">
                <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
                <span className="truncate">{getEmploymentTypeLabel(job.employmentType)}</span>
              </div>
              <div className="flex items-center gap-1 justify-center sm:justify-start">
                <Briefcase className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
                <span className="truncate">{getExperienceLevelLabel(job.experienceLevel)}</span>
              </div>
              <div className="flex items-center gap-1 justify-center sm:justify-start">
                <DollarSign className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
                <span className="truncate text-xs">{formatSalary(job.salary)}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-1 mb-3 justify-center sm:justify-start">
              {job.skills &&
                job.skills.length > 0 &&
                job.skills.slice(0, isGallery ? 2 : 3).map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              {job.skills && job.skills.length > (isGallery ? 2 : 3) && (
                <Badge variant="outline" className="text-xs">
                  +{job.skills.length - (isGallery ? 2 : 3)}
                </Badge>
              )}
            </div>

            <div
              className={`flex ${isGallery ? "flex-col gap-2" : "flex-col sm:flex-row sm:items-center sm:justify-between gap-2"}`}
            >
              <div className="flex items-center gap-2 sm:gap-4 text-xs text-muted-foreground justify-center sm:justify-start flex-wrap">
                <span>{formatRelativeTime(job.createdAt)}</span>
                {job.viewsCount !== undefined && (
                  <div className="flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    {job.viewsCount}
                  </div>
                )}
                {job.applicationsCount !== undefined && (
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {job.applicationsCount}
                  </div>
                )}
                {job.savesCount !== undefined && job.savesCount > 0 && (
                  <div className="flex items-center gap-1">
                    <Heart className="h-3 w-3" />
                    {job.savesCount}
                  </div>
                )}
              </div>
              <div
                className={`flex items-center gap-2 ${isGallery ? "justify-center" : "justify-center sm:justify-end"}`}
              >
                {isGallery && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      toggleSaveJob(job.id)
                    }}
                    className={`h-8 w-8 ${job.isSaved ? "text-red-500" : ""}`}
                  >
                    <Heart className={`h-4 w-4 ${job.isSaved ? "fill-current" : ""}`} />
                  </Button>
                )}
                <Link href={`/job/${job.slug || job.id}`}>
                  <Button variant="outline" size="sm" className="text-xs">
                    Подробнее
                  </Button>
                </Link>
                <Link href={`/apply?job=${job.id}`}>
                  <Button size="sm" className="text-xs">
                    Откликнуться
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const FilterContent = () => (
    <div className="space-y-4 sm:space-y-6">
      {/* Category */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Категория</Label>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Все категории" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все категории</SelectItem>
            {filters.categories.map((category) => (
              <SelectItem key={category.id} value={category.slug}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Separator />

      {/* Job Type */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Тип занятости</Label>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Все типы" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все типы</SelectItem>
            {filters.employmentTypes.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Separator />

      {/* Experience */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Опыт работы</Label>
        <Select value={experienceFilter} onValueChange={setExperienceFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Любой опыт" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Любой опыт</SelectItem>
            {filters.experienceLevels.map((level) => (
              <SelectItem key={level.value} value={level.value}>
                {level.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Separator />

      {/* Salary Range */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Зарплата (TJS)</Label>
        <Slider
          value={salaryRange}
          onValueChange={setSalaryRange}
          max={10000}
          min={1000}
          step={100}
          className="w-full"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>{salaryRange[0].toLocaleString()} TJS</span>
          <span>{salaryRange[1].toLocaleString()} TJS</span>
        </div>
      </div>

      <Separator />

      {/* Additional Filters */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Дополнительно</Label>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox id="remote" checked={remoteOnly} onCheckedChange={setRemoteOnly} />
            <Label htmlFor="remote" className="text-sm font-normal">
              Удаленная работа
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="featured" checked={featuredOnly} onCheckedChange={setFeaturedOnly} />
            <Label htmlFor="featured" className="text-sm font-normal">
              Рекомендуемые
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="urgent" checked={urgentOnly} onCheckedChange={setUrgentOnly} />
            <Label htmlFor="urgent" className="text-sm font-normal">
              Срочные
            </Label>
          </div>
        </div>
      </div>
    </div>
  )

  const JobSkeleton = ({ isGallery = false }: { isGallery?: boolean }) => (
    <Card className={isGallery ? "h-full" : ""}>
      <CardContent className={`${isGallery ? "p-3 sm:p-4" : "p-4 sm:p-6"}`}>
        <div className={`flex ${isGallery ? "flex-col" : "flex-col sm:flex-row"} gap-3 sm:gap-4`}>
          <Skeleton className={`${isGallery ? "mx-auto" : "mx-auto sm:mx-0"} h-12 w-12 sm:h-14 sm:w-14 rounded-full`} />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-3/4 mx-auto sm:mx-0" />
            <Skeleton className="h-3 w-1/2 mx-auto sm:mx-0" />
            <div className="grid grid-cols-2 gap-2">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-full" />
            </div>
            <div className="flex gap-1 justify-center sm:justify-start">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-5 w-16" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="container mx-auto py-4 sm:py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-4">Поиск работы</h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            {loading ? (
              <Skeleton className="h-4 w-64" />
            ) : error ? (
              <span className="text-red-500">Ошибка загрузки</span>
            ) : (
              `Найдено ${pagination.total.toLocaleString()} вакансий в Таджикистане`
            )}
          </p>
        </div>

        {/* Search Bar */}
        <Card className="mb-4 sm:mb-6">
          <CardContent className="pt-4 sm:pt-6">
            <div className="flex flex-col gap-3 sm:gap-4">
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Должность, компания или навыки"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex-1">
                  <Select value={locationFilter} onValueChange={setLocationFilter}>
                    <SelectTrigger>
                      <MapPin className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Все города" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Все города</SelectItem>
                      <SelectItem value="remote">Удаленно</SelectItem>
                      {filters.locations.map((location) => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Mobile Filter Button */}
              <div className="flex items-center gap-2">
                <Sheet open={showFilters} onOpenChange={setShowFilters}>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="flex-1 sm:flex-none relative">
                      <SlidersHorizontal className="h-4 w-4 mr-2" />
                      Фильтры
                      {activeFiltersCount > 0 && (
                        <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                          {activeFiltersCount}
                        </Badge>
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                    <SheetHeader>
                      <SheetTitle className="flex items-center gap-2">
                        <Filter className="h-5 w-5" />
                        Фильтры
                      </SheetTitle>
                      <SheetDescription>Настройте параметры поиска для лучших результатов</SheetDescription>
                    </SheetHeader>
                    <div className="mt-6">
                      <FilterContent />
                      <div className="mt-6 flex gap-2">
                        <Button onClick={clearFilters} variant="outline" className="flex-1">
                          Сбросить
                        </Button>
                        <Button onClick={() => setShowFilters(false)} className="flex-1">
                          Применить
                        </Button>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>

                {activeFiltersCount > 0 && (
                  <Button variant="outline" size="sm" onClick={clearFilters} className="hidden sm:flex">
                    <X className="h-4 w-4 mr-1" />
                    Очистить
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Error Alert */}
        {error && (
          <Alert className="mb-6" variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {error}
              <Button variant="outline" size="sm" className="ml-2" onClick={() => fetchJobs(currentPage)}>
                Попробовать снова
              </Button>
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Desktop Filters Sidebar */}
          <div className="hidden lg:block lg:col-span-1">
            <Card className="sticky top-4">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Filter className="h-5 w-5" />
                    Фильтры
                  </h3>
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    Сбросить
                  </Button>
                </div>
                <FilterContent />
              </CardContent>
            </Card>
          </div>

          {/* Job Listings */}
          <div className="lg:col-span-3">
            {/* Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-3">
              <div className="flex items-center gap-2 sm:gap-4 text-sm text-muted-foreground">
                {loading ? (
                  <Skeleton className="h-4 w-32" />
                ) : (
                  <span>
                    Показано {jobs.length} из {pagination.total.toLocaleString()} вакансий
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 sm:gap-4">
                {/* View Mode Toggle */}
                <div className="flex items-center border rounded-lg p-1">
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="h-8 w-8 p-0"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "gallery" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("gallery")}
                    className="h-8 w-8 p-0"
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                </div>
                {/* Sort */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[140px] sm:w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Сначала новые</SelectItem>
                    <SelectItem value="oldest">Сначала старые</SelectItem>
                    <SelectItem value="salary-high">Зарплата ↓</SelectItem>
                    <SelectItem value="salary-low">Зарплата ↑</SelectItem>
                    <SelectItem value="relevance">По релевантности</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Job Cards */}
            {loading ? (
              <div
                className={
                  viewMode === "gallery"
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4"
                    : "space-y-3 sm:space-y-4"
                }
              >
                {Array.from({ length: 6 }).map((_, index) => (
                  <JobSkeleton key={index} isGallery={viewMode === "gallery"} />
                ))}
              </div>
            ) : jobs.length === 0 ? (
              <Card>
                <CardContent className="py-8 sm:py-12 text-center">
                  <Search className="h-8 w-8 sm:h-12 sm:w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-base sm:text-lg font-medium mb-2">Вакансии не найдены</h3>
                  <p className="text-muted-foreground mb-4 text-sm sm:text-base">
                    Попробуйте изменить параметры поиска или очистить фильтры
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2 justify-center">
                    <Button onClick={clearFilters}>Очистить все фильтры</Button>
                    <Link href="/jobs">
                      <Button variant="outline">Посмотреть все вакансии</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div
                className={
                  viewMode === "gallery"
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4"
                    : "space-y-3 sm:space-y-4"
                }
              >
                {jobs.map((job) => (
                  <JobCard key={job.id} job={job} isGallery={viewMode === "gallery"} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {!loading && jobs.length > 0 && (
              <div className="flex flex-col sm:flex-row items-center justify-between mt-6 sm:mt-8 gap-4">
                <div className="text-sm text-muted-foreground">
                  Страница {pagination.page} из {pagination.totalPages}
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    disabled={!(pagination.hasPrev ?? currentPage > 1) || loading}
                    onClick={() => fetchJobs(currentPage - 1)}
                    size="sm"
                  >
                    Предыдущая
                  </Button>

                  {/* Page numbers */}
                  <div className="hidden sm:flex items-center gap-1">
                    {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                      const pageNum = Math.max(1, Math.min(pagination.totalPages - 4, currentPage - 2)) + i
                      return (
                        <Button
                          key={pageNum}
                          variant={pageNum === currentPage ? "default" : "outline"}
                          size="sm"
                          onClick={() => fetchJobs(pageNum)}
                          className="w-8 h-8 p-0"
                        >
                          {pageNum}
                        </Button>
                      )
                    })}
                  </div>

                  <Button
                    variant="outline"
                    disabled={!(pagination.hasNext ?? currentPage < pagination.totalPages) || loading}
                    onClick={() => fetchJobs(currentPage + 1)}
                    size="sm"
                  >
                    Следующая
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
