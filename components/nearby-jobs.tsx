"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Navigation, Building } from "lucide-react"
import { useTranslation } from "@/hooks/useTranslation"

const nearbyJobs = [
  {
    id: 1,
    title: "Курьер",
    company: "Доставка Экспресс",
    location: "Душанбе, район Исмоили Сомони",
    distance: "1.2 км",
    salary: "1,200 - 2,000 TJS",
    type: "Гибкий график",
  },
  {
    id: 2,
    title: "Продавец-консультант",
    company: 'Торговый центр "Сарбон"',
    location: "Душанбе, проспект Рудаки",
    distance: "2.5 км",
    salary: "1,500 - 2,200 TJS",
    type: "Полная занятость",
  },
  {
    id: 3,
    title: "Водитель такси",
    company: "TaxiGo",
    location: "Душанбе, центр",
    distance: "3.1 км",
    salary: "2,000 - 4,000 TJS",
    type: "Свободный график",
  },
]

export default function NearbyJobs() {
  const [location, setLocation] = useState<string>("")
  const [isLocationEnabled, setIsLocationEnabled] = useState(false)
  const { t } = useTranslation()

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation("Душанбе, ваше местоположение")
          setIsLocationEnabled(true)
        },
        (error) => {
          setLocation("Местоположение недоступно")
        },
      )
    }
  }, [])

  const enableLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation("Душанбе, ваше местоположение")
          setIsLocationEnabled(true)
        },
        (error) => {
          alert("Не удалось получить доступ к местоположению")
        },
      )
    }
  }

  return (
    <section className="py-16 px-4 bg-white dark:bg-gray-900">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            📍 {t("nearbyJobs.title")}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">Найдите работу в шаговой доступности</p>

          {!isLocationEnabled ? (
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 max-w-md mx-auto">
              <p className="text-blue-800 dark:text-blue-200 mb-3">
                Разрешите доступ к местоположению для персонализированного поиска
              </p>
              <Button onClick={enableLocation} className="bg-blue-600 hover:bg-blue-700 h-10 px-6">
                <Navigation className="h-4 w-4 mr-2" />
                Включить геолокацию
              </Button>
            </div>
          ) : (
            <div className="flex items-center justify-center text-green-600 dark:text-green-400">
              <MapPin className="h-5 w-5 mr-2" />
              <span>{location}</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {nearbyJobs.map((job) => (
            <div
              key={job.id}
              className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-start space-x-4 mb-4">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                  <Building className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-1 hover:text-primary cursor-pointer transition-colors">
                    {job.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{job.company}</p>
                </div>
                <Badge variant="outline" className="text-green-600 border-green-600">
                  {job.distance}
                </Badge>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <MapPin className="h-4 w-4 mr-2" />
                  {job.location}
                </div>
                <div className="text-sm font-medium text-gray-900 dark:text-white">{job.salary}</div>
                <Badge variant="secondary" className="text-xs">
                  {job.type}
                </Badge>
              </div>

              <div className="flex space-x-2">
                <Button className="flex-1 bg-green-600 hover:bg-green-700 h-9">{t("jobs.card.apply")}</Button>
                <Button variant="outline" size="icon" className="h-9 w-9">
                  ♡
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button variant="outline" size="lg" className="h-10 px-6">
            {t("nearbyJobs.viewAll")}
          </Button>
        </div>
      </div>
    </section>
  )
}
