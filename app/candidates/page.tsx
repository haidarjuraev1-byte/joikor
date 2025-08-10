"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
import {
  Search,
  MapPin,
  Filter,
  SlidersHorizontal,
  Briefcase,
  Star,
  MessageCircle,
  Download,
  Eye,
  X,
  Grid3X3,
  List,
} from "lucide-react"
import Link from "next/link"

interface Candidate {
  id: string
  userId: string
  name: string
  photo: string
  title: string
  summary: string
  location: string
  experienceYears: number
  salary: { min: number; max: number; currency: string }
  availability: string
  skills: string[]
  languages: string[]
  viewsCount: number
  rating: number
  responseRate: number
  verified: boolean
  lastActive: string
  updatedAt: string
}

interface ApiResponse {
  candidates: Candidate[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

export default function CandidatesPage() {
  const [candidates, setCandidates] = useState<Candidate[]>([])
  const [loading, setLoading] = useState(true)
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
    hasNext: false,
    hasPrev: false,
  })

  const [searchQuery, setSearchQuery] = useState("")
  const [locationFilter, setLocationFilter] = useState("all")
  const [skillFilter, setSkillFilter] = useState("all")
  const [experienceFilter, setExperienceFilter] = useState("all")
  const [educationFilter, setEducationFilter] = useState("all")
  const [showFilters, setShowFilters] = useState(false)
  const [viewMode, setViewMode] = useState<"list" | "gallery">("list")
  const [salaryRange, setSalaryRange] = useState([1000, 10000])
  const [availableOnly, setAvailableOnly] = useState(false)
  const [verifiedOnly, setVerifiedOnly] = useState(false)
  const [premiumOnly, setPremiumOnly] = useState(false)
  const [sortBy, setSortBy] = useState("relevance")
  const [currentPage, setCurrentPage] = useState(1)

  // Fetch candidates from API
  const fetchCandidates = async (page = 1) => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: pagination.limit.toString(),
        q: searchQuery,
        location: locationFilter !== "all" ? locationFilter : "",
        skill: skillFilter !== "all" ? skillFilter : "",
        experience: experienceFilter !== "all" ? experienceFilter : "",
        education: educationFilter !== "all" ? educationFilter : "",
        salary_min: salaryRange[0].toString(),
        salary_max: salaryRange[1].toString(),
        available: availableOnly.toString(),
        verified: verifiedOnly.toString(),
        premium: premiumOnly.toString(),
        sort_by: sortBy,
      })

      const response = await fetch(`/api/candidates?${params}`)
      if (!response.ok) throw new Error("Failed to fetch candidates")

      const data: ApiResponse = await response.json()
      setCandidates(data.candidates)
      setPagination(data.pagination)
      setCurrentPage(page)
    } catch (error) {
      console.error("Error fetching candidates:", error)
    } finally {
      setLoading(false)
    }
  }

  // Debounced search effect
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchCandidates(1)
    }, 300)

    return () => clearTimeout(timer)
  }, [
    searchQuery,
    locationFilter,
    skillFilter,
    experienceFilter,
    educationFilter,
    salaryRange,
    availableOnly,
    verifiedOnly,
    premiumOnly,
    sortBy,
  ])

  // Initial load
  useEffect(() => {
    fetchCandidates()
  }, [])

  const skills = ["React", "TypeScript", "Python", "Java", "Figma", "Adobe XD", "SQL", "Node.js", "AWS", "Docker"]
  const experienceLevels = ["1-2 года", "2-3 года", "3-4 года", "4-5 лет", "5+ лет"]
  const educationLevels = [
    "Среднее",
    "Среднее специальное",
    "Высшее техническое",
    "Высшее экономическое",
    "Высшее гуманитарное",
  ]
  const locations = ["Душанбе", "Худжанд", "Куляб", "Бохтар", "Хорог"]

  const clearFilters = () => {
    setSearchQuery("")
    setLocationFilter("all")
    setSkillFilter("all")
    setExperienceFilter("all")
    setEducationFilter("all")
    setSalaryRange([1000, 10000])
    setAvailableOnly(false)
    setVerifiedOnly(false)
    setPremiumOnly(false)
  }

  const activeFiltersCount =
    [
      searchQuery,
      locationFilter !== "all",
      skillFilter !== "all",
      experienceFilter !== "all",
      educationFilter !== "all",
      availableOnly,
      verifiedOnly,
      premiumOnly,
    ].filter(Boolean).length + (salaryRange[0] !== 1000 || salaryRange[1] !== 10000 ? 1 : 0)

  const CandidateCard = ({ candidate, isGallery = false }: { candidate: Candidate; isGallery?: boolean }) => (
    <Card className={`hover:shadow-lg transition-all duration-300 cursor-pointer ${isGallery ? "h-full" : ""}`}>
      <CardContent className={`${isGallery ? "p-3 sm:p-4" : "p-4 sm:p-6"}`}>
        <div
          className={`flex ${isGallery ? "flex-col items-center text-center" : "flex-col sm:flex-row"} gap-3 sm:gap-4`}
        >
          <Avatar className={`${isGallery ? "mx-auto" : "mx-auto sm:mx-0"} h-16 w-16 flex-shrink-0`}>
            <AvatarImage src={candidate.photo || "/placeholder.svg"} alt={candidate.name} />
            <AvatarFallback className="text-lg">
              {candidate.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <div
              className={`flex ${isGallery ? "flex-col items-center" : "flex-col sm:flex-row sm:items-start sm:justify-between"} mb-2`}
            >
              <div className={isGallery ? "mb-2" : "mb-2 sm:mb-0"}>
                <div className="flex items-center gap-2 mb-1 flex-wrap justify-center sm:justify-start">
                  {candidate.verified && (
                    <Badge variant="outline" className="text-green-600 border-green-600 text-xs">
                      Верифицирован
                    </Badge>
                  )}
                </div>
                <Link href={`/resume/${candidate.id}`}>
                  <h3 className="text-base sm:text-lg font-semibold hover:text-primary transition-colors mb-1 line-clamp-2">
                    {candidate.name}
                  </h3>
                </Link>
                <p className="text-sm text-muted-foreground mb-1 line-clamp-1">{candidate.title}</p>
                <div
                  className={`flex ${isGallery ? "flex-col gap-1" : "flex-col sm:flex-row"} items-center gap-2 text-xs text-muted-foreground mb-2`}
                >
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {candidate.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Briefcase className="h-3 w-3" />
                    {candidate.experienceYears}+ лет
                  </div>
                </div>
              </div>
              {!isGallery && (
                <div className="text-center sm:text-right">
                  <div className="flex items-center gap-1 mb-1 justify-center sm:justify-end">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{candidate.rating}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">{candidate.responseRate}% ответов</div>
                </div>
              )}
            </div>

            {!isGallery && candidate.summary && (
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{candidate.summary}</p>
            )}

            <div className={`grid ${isGallery ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2"} gap-3 mb-4`}>
              <div>
                <Label className="text-xs text-muted-foreground">Навыки</Label>
                <div className="flex flex-wrap gap-1 mt-1">
                  {candidate.skills.slice(0, isGallery ? 2 : 3).map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {candidate.skills.length > (isGallery ? 2 : 3) && (
                    <Badge variant="outline" className="text-xs">
                      +{candidate.skills.length - (isGallery ? 2 : 3)}
                    </Badge>
                  )}
                </div>
              </div>
              {!isGallery && (
                <div>
                  <Label className="text-xs text-muted-foreground">Ожидаемая зарплата</Label>
                  <div className="text-sm font-medium mt-1">
                    {candidate.salary.min.toLocaleString()} - {candidate.salary.max.toLocaleString()}{" "}
                    {candidate.salary.currency}
                  </div>
                </div>
              )}
            </div>

            <div
              className={`flex ${isGallery ? "flex-col gap-2" : "flex-col sm:flex-row sm:items-center sm:justify-between gap-2"}`}
            >
              <div className="flex items-center gap-2 sm:gap-4 text-xs text-muted-foreground justify-center sm:justify-start flex-wrap">
                <div className="flex items-center gap-1">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      candidate.lastActive === "Онлайн" ? "bg-green-500" : "bg-gray-400"
                    }`}
                  />
                  {candidate.lastActive}
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  {candidate.viewsCount}
                </div>
                <Badge variant={candidate.availability === "Доступен" ? "default" : "outline"} className="text-xs">
                  {candidate.availability}
                </Badge>
              </div>
              <div
                className={`flex items-center gap-2 ${isGallery ? "justify-center" : "justify-center sm:justify-end"}`}
              >
                <Link href={`/resume/${candidate.id}`}>
                  <Button variant="outline" size="sm" className="text-xs">
                    <Download className="h-3 w-3 mr-1" />
                    Резюме
                  </Button>
                </Link>
                <Button size="sm" className="text-xs">
                  <MessageCircle className="h-3 w-3 mr-1" />
                  Связаться
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const FilterContent = () => (
    <div className="space-y-4 sm:space-y-6">
      {/* Skills */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Навыки</Label>
        <Select value={skillFilter} onValueChange={setSkillFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Все навыки" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все навыки</SelectItem>
            {skills.map((skill) => (
              <SelectItem key={skill} value={skill}>
                {skill}
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
            {experienceLevels.map((level) => (
              <SelectItem key={level} value={level}>
                {level}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Separator />

      {/* Education */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Образование</Label>
        <Select value={educationFilter} onValueChange={setEducationFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Любое образование" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Любое образование</SelectItem>
            {educationLevels.map((level) => (
              <SelectItem key={level} value={level}>
                {level}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Separator />

      {/* Salary Range */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Ожидаемая зарплата (TJS)</Label>
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
            <Checkbox id="available" checked={availableOnly} onCheckedChange={setAvailableOnly} />
            <Label htmlFor="available" className="text-sm font-normal">
              Доступны для работы
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="verified" checked={verifiedOnly} onCheckedChange={setVerifiedOnly} />
            <Label htmlFor="verified" className="text-sm font-normal">
              Верифицированные
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="premium" checked={premiumOnly} onCheckedChange={setPremiumOnly} />
            <Label htmlFor="premium" className="text-sm font-normal">
              Премиум профили
            </Label>
          </div>
        </div>
      </div>
    </div>
  )

  const CandidateSkeleton = ({ isGallery = false }: { isGallery?: boolean }) => (
    <Card className={isGallery ? "h-full" : ""}>
      <CardContent className={`${isGallery ? "p-3 sm:p-4" : "p-4 sm:p-6"}`}>
        <div className={`flex ${isGallery ? "flex-col items-center" : "flex-col sm:flex-row"} gap-3 sm:gap-4`}>
          <Skeleton className={`${isGallery ? "mx-auto" : "mx-auto sm:mx-0"} h-16 w-16 rounded-full`} />
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
          <h1 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-4">Поиск кандидатов</h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            {loading ? <Skeleton className="h-4 w-64" /> : `Найдено ${pagination.total} кандидатов в Таджикистане`}
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
                    placeholder="Имя, должность или навыки"
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
                      {locations.map((location) => (
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
                      <SheetDescription>Настройте параметры поиска кандидатов</SheetDescription>
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

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Desktop Filters Sidebar */}
          <div className="hidden lg:block lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Filter className="h-5 w-5" />
                    Фильтры
                  </CardTitle>
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    Сбросить
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <FilterContent />
              </CardContent>
            </Card>
          </div>

          {/* Candidate Listings */}
          <div className="lg:col-span-3">
            {/* Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-3">
              <div className="flex items-center gap-2 sm:gap-4 text-sm text-muted-foreground">
                {loading ? (
                  <Skeleton className="h-4 w-32" />
                ) : (
                  <span>
                    Показано {candidates.length} из {pagination.total} кандидатов
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
                    <SelectItem value="relevance">По релевантности</SelectItem>
                    <SelectItem value="rating">По рейтингу</SelectItem>
                    <SelectItem value="experience">По опыту</SelectItem>
                    <SelectItem value="salary-high">Зарплата ↓</SelectItem>
                    <SelectItem value="last-active">Последняя активность</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Candidate Cards */}
            {loading ? (
              <div
                className={
                  viewMode === "gallery"
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4"
                    : "space-y-3 sm:space-y-4"
                }
              >
                {Array.from({ length: 6 }).map((_, index) => (
                  <CandidateSkeleton key={index} isGallery={viewMode === "gallery"} />
                ))}
              </div>
            ) : candidates.length === 0 ? (
              <Card>
                <CardContent className="py-8 sm:py-12 text-center">
                  <Search className="h-8 w-8 sm:h-12 sm:w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-base sm:text-lg font-medium mb-2">Кандидаты не найдены</h3>
                  <p className="text-muted-foreground mb-4 text-sm sm:text-base">
                    Попробуйте изменить параметры поиска или очистить фильтры
                  </p>
                  <Button onClick={clearFilters}>Очистить все фильтры</Button>
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
                {candidates.map((candidate) => (
                  <CandidateCard key={candidate.id} candidate={candidate} isGallery={viewMode === "gallery"} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {!loading && candidates.length > 0 && (
              <div className="flex flex-col sm:flex-row items-center justify-between mt-6 sm:mt-8 gap-4">
                <div className="text-sm text-muted-foreground">
                  Страница {pagination.page} из {pagination.totalPages}
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    disabled={!pagination.hasPrev || loading}
                    onClick={() => fetchCandidates(currentPage - 1)}
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
                          onClick={() => fetchCandidates(pageNum)}
                          className="w-8 h-8 p-0"
                        >
                          {pageNum}
                        </Button>
                      )
                    })}
                  </div>

                  <Button
                    variant="outline"
                    disabled={!pagination.hasNext || loading}
                    onClick={() => fetchCandidates(currentPage + 1)}
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
