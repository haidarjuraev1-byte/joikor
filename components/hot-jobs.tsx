"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, DollarSign, Building } from "lucide-react"
import { useTranslation } from "@/hooks/useTranslation"

const hotJobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp Tajikistan",
    location: "Душанбе",
    salary: "3,000 - 5,000 TJS",
    type: "Полная занятость",
    posted: "2 часа назад",
    logo: "/placeholder.svg?height=60&width=60",
    featured: true,
    skills: ["React", "TypeScript", "Next.js"],
  },
  {
    id: 2,
    title: "Врач-терапевт",
    company: 'Медицинский центр "Здоровье"',
    location: "Худжанд",
    salary: "2,500 - 4,000 TJS",
    type: "Полная занятость",
    posted: "4 часа назад",
    logo: "/placeholder.svg?height=60&width=60",
    featured: false,
    skills: ["Медицина", "Диагностика", "Лечение"],
  },
  {
    id: 3,
    title: "Менеджер по продажам",
    company: 'Торговая компания "Успех"',
    location: "Душанбе",
    salary: "1,800 - 3,000 TJS",
    type: "Полная занятость",
    posted: "6 часов назад",
    logo: "/placeholder.svg?height=60&width=60",
    featured: true,
    skills: ["Продажи", "Переговоры", "CRM"],
  },
  {
    id: 4,
    title: "Учитель английского языка",
    company: "Международная школа",
    location: "Душанбе",
    salary: "1,500 - 2,500 TJS",
    type: "Частичная занятость",
    posted: "1 день назад",
    logo: "/placeholder.svg?height=60&width=60",
    featured: false,
    skills: ["Английский", "Преподавание", "IELTS"],
  },
  {
    id: 5,
    title: "Инженер-строитель",
    company: "СтройИнвест",
    location: "Бохтар",
    salary: "2,200 - 3,500 TJS",
    type: "Полная занятость",
    posted: "1 день назад",
    logo: "/placeholder.svg?height=60&width=60",
    featured: false,
    skills: ["AutoCAD", "Проектирование", "Строительство"],
  },
  {
    id: 6,
    title: "Бухгалтер",
    company: 'Финансовая группа "Капитал"',
    location: "Душанбе",
    salary: "1,800 - 2,800 TJS",
    type: "Полная занятость",
    posted: "2 дня назад",
    logo: "/placeholder.svg?height=60&width=60",
    featured: true,
    skills: ["1С", "Налогообложение", "Отчетность"],
  },
]

export default function HotJobs() {
  const { t } = useTranslation()

  return (
    <section className="py-16 px-4 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              🔥 {t("hotJobs.title")}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Самые актуальные предложения от топовых работодателей
            </p>
          </div>
          <Button variant="outline" size="lg" className="mt-4 md:mt-0 h-10 px-6">
            {t("hotJobs.viewAll")}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hotJobs.map((job) => (
            <div
              key={job.id}
              className={`bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border ${
                job.featured ? "border-primary/20 ring-1 ring-primary/10" : "border-gray-200 dark:border-gray-700"
              }`}
            >
              {job.featured && (
                <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">{t("jobs.card.featured")}</Badge>
              )}

              <div className="flex items-start space-x-4 mb-4">
                <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  <Building className="h-6 w-6 text-gray-600 dark:text-gray-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-1 hover:text-primary cursor-pointer transition-colors">
                    {job.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{job.company}</p>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <MapPin className="h-4 w-4 mr-2" />
                  {job.location}
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <DollarSign className="h-4 w-4 mr-2" />
                  {job.salary}
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <Clock className="h-4 w-4 mr-2" />
                  {job.posted}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {job.skills.slice(0, 3).map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>

              <div className="flex space-x-2">
                <Button className="flex-1 h-9 bg-primary hover:bg-primary/90">{t("jobs.card.apply")}</Button>
                <Button variant="outline" size="icon" className="h-9 w-9">
                  ♡
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
