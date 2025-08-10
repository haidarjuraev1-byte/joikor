"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MapPin, Briefcase, Users, Building, TrendingUp } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useTranslation } from "@/hooks/useTranslation"

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [location, setLocation] = useState("")
  const router = useRouter()
  const { t } = useTranslation()

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (searchQuery) params.set("q", searchQuery)
    if (location && location !== "all") params.set("location", location)
    router.push(`/jobs?${params.toString()}`)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  const stats = [
    { icon: Briefcase, value: "5,000+", label: t("hero.stats.jobs") },
    { icon: Building, value: "1,200+", label: t("hero.stats.companies") },
    { icon: Users, value: "25,000+", label: t("hero.stats.candidates") },
    { icon: TrendingUp, value: "3,500+", label: t("hero.stats.success") },
  ]

  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 sm:py-20 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Hero Content */}
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
            {t("hero.title")}
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8 sm:mb-12 max-w-2xl mx-auto">
            {t("hero.subtitle")}
          </p>

          {/* Search Bar */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 sm:p-6 mb-8 sm:mb-12">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder={t("hero.searchPlaceholder")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="pl-10 h-12 text-base"
                />
              </div>
              <div className="sm:w-64">
                <Select value={location} onValueChange={setLocation}>
                  <SelectTrigger className="h-12">
                    <MapPin className="h-4 w-4 mr-2" />
                    <SelectValue placeholder={t("hero.locationPlaceholder")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t("common.all")}</SelectItem>
                    <SelectItem value="dushanbe">Душанбе</SelectItem>
                    <SelectItem value="khujand">Худжанд</SelectItem>
                    <SelectItem value="kulob">Куляб</SelectItem>
                    <SelectItem value="bokhtar">Бохтар</SelectItem>
                    <SelectItem value="khorog">Хорог</SelectItem>
                    <SelectItem value="remote">{t("common.remote")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleSearch} size="lg" className="h-12 px-8">
                <Search className="h-4 w-4 mr-2" />
                {t("hero.searchButton")}
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 sm:mb-16">
            <Button asChild size="lg" className="h-12 px-8">
              <Link href="/resume-builder">
                <Briefcase className="h-5 w-5 mr-2" />
                {t("hero.createResume")}
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 px-8">
              <Link href="/post-job">
                <Building className="h-5 w-5 mr-2" />
                {t("hero.postJob")}
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-3">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
