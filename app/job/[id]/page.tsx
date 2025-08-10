"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  MapPin,
  Clock,
  DollarSign,
  Briefcase,
  Users,
  Eye,
  Heart,
  Share2,
  Building,
  Calendar,
  CheckCircle,
  ArrowLeft,
  ExternalLink,
  Mail,
  Phone,
} from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function JobPage() {
  const params = useParams()
  const jobId = params.id as string
  const [isSaved, setIsSaved] = useState(false)

  // Mock job data - in real app, fetch by ID
  const job = {
    id: jobId,
    title: "Senior Frontend Developer",
    company: "TechCorp Tajikistan",
    companyLogo: "/placeholder.svg?height=80&width=80",
    companyId: "techcorp-tajikistan",
    location: "Душанбе",
    type: "Полная занятость",
    category: "IT и разработка",
    experience: "3-5 лет",
    salary: { min: 3000, max: 5000, currency: "TJS" },
    posted: "2 часа назад",
    deadline: "15 января 2025",
    description: `Мы ищем опытного Frontend разработчика для работы над современными веб-приложениями с использованием React, TypeScript и современных инструментов разработки.

В нашей команде вы будете:
• Разрабатывать пользовательские интерфейсы для веб-приложений
• Оптимизировать производительность приложений
• Участвовать в code review и техническом планировании
• Работать в тесном сотрудничестве с UX/UI дизайнерами
• Внедрять лучшие практики разработки

Мы предлагаем:
• Конкурентоспособную заработную плату
• Медицинскую страховку
• Гибкий график работы
• Возможности профессионального развития
• Современное оборудование
• Дружный коллектив`,
    requirements: `Требования:
• Опыт работы с React от 3 лет
• Знание TypeScript, JavaScript ES6+
• Опыт работы с Next.js
• Знание HTML5, CSS3, SASS/SCSS
• Опыт работы с Git
• Понимание принципов responsive design
• Знание английского языка на уровне чтения технической документации

Будет плюсом:
• Опыт работы с Redux/Zustand
• Знание Node.js
• Опыт работы с GraphQL
• Знание принципов тестирования (Jest, React Testing Library)`,
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "JavaScript", "HTML/CSS", "Git"],
    benefits: [
      "Медицинская страховка",
      "Гибкий график",
      "Удаленная работа",
      "Обучение",
      "Корпоративные мероприятия",
      "Современное оборудование",
    ],
    featured: true,
    remote: false,
    urgent: false,
    applicants: 12,
    views: 156,
    contactPerson: "Алишер Каримов",
    contactEmail: "hr@techcorp.tj",
    contactPhone: "+992 37 123-45-67",
  }

  const companyInfo = {
    name: "TechCorp Tajikistan",
    logo: "/placeholder.svg?height=80&width=80",
    description:
      "Ведущая IT-компания Таджикистана, специализирующаяся на разработке веб-приложений и цифровых решений.",
    employees: "50-100",
    founded: "2018",
    website: "https://techcorp.tj",
    location: "Душанбе, Таджикистан",
    activeJobs: 5,
  }

  const relatedJobs = [
    {
      id: "2",
      title: "Backend Developer",
      company: "TechCorp Tajikistan",
      salary: "2800 - 4500 TJS",
      posted: "1 день назад",
    },
    {
      id: "3",
      title: "Full Stack Developer",
      company: "Digital Solutions",
      salary: "3500 - 5500 TJS",
      posted: "3 дня назад",
    },
    {
      id: "4",
      title: "React Developer",
      company: "WebStudio Pro",
      salary: "2500 - 4000 TJS",
      posted: "5 дней назад",
    },
  ]

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/jobs">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Назад к поиску
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Header */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-6">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={job.companyLogo || "/placeholder.svg"} alt={job.company} />
                    <AvatarFallback>
                      {job.company
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {job.featured && (
                        <Badge className="bg-primary/10 text-primary border-primary/20">Рекомендуемая</Badge>
                      )}
                      {job.urgent && <Badge variant="destructive">Срочно</Badge>}
                      {job.remote && <Badge variant="outline">Удаленно</Badge>}
                    </div>
                    <h1 className="text-2xl font-bold mb-2">{job.title}</h1>
                    <Link href={`/company/${job.companyId}`}>
                      <div className="flex items-center gap-2 text-lg text-muted-foreground hover:text-primary transition-colors">
                        <Building className="h-5 w-5" />
                        {job.company}
                      </div>
                    </Link>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsSaved(!isSaved)}
                      className={isSaved ? "text-red-500" : ""}
                    >
                      <Heart className={`h-5 w-5 ${isSaved ? "fill-current" : ""}`} />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Share2 className="h-5 w-5" />
                    </Button>
                  </div>
                </div>

                {/* Job Details Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Местоположение</p>
                      <p className="font-medium">{job.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Тип занятости</p>
                      <p className="font-medium">{job.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Опыт</p>
                      <p className="font-medium">{job.experience}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Зарплата</p>
                      <p className="font-medium">
                        {job.salary.min.toLocaleString()} - {job.salary.max.toLocaleString()} {job.salary.currency}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Опубликовано: {job.posted}
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    {job.views} просмотров
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {job.applicants} откликов
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    До: {job.deadline}
                  </div>
                </div>

                {/* Apply Button */}
                <Link href={`/apply?job=${job.id}`}>
                  <Button size="lg" className="w-full md:w-auto">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Откликнуться на вакансию
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Job Description */}
            <Card>
              <CardHeader>
                <CardTitle>Описание вакансии</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none">
                  <div className="whitespace-pre-line">{job.description}</div>
                </div>
              </CardContent>
            </Card>

            {/* Requirements */}
            <Card>
              <CardHeader>
                <CardTitle>Требования</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none">
                  <div className="whitespace-pre-line">{job.requirements}</div>
                </div>
              </CardContent>
            </Card>

            {/* Skills */}
            <Card>
              <CardHeader>
                <CardTitle>Ключевые навыки</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Benefits */}
            <Card>
              <CardHeader>
                <CardTitle>Что мы предлагаем</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {job.benefits.map((benefit) => (
                    <div key={benefit} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Apply Card */}
            <Card>
              <CardHeader>
                <CardTitle>Подать заявку</CardTitle>
                <CardDescription>Не упустите возможность присоединиться к команде</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href={`/apply?job=${job.id}`}>
                  <Button className="w-full mb-4">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Откликнуться
                  </Button>
                </Link>
                <div className="text-sm text-muted-foreground space-y-2">
                  <p>• Быстрый отклик увеличивает шансы</p>
                  <p>• Ответ в течение 24 часов</p>
                  <p>• {job.applicants} человек уже откликнулись</p>
                </div>
              </CardContent>
            </Card>

            {/* Company Info */}
            <Card>
              <CardHeader>
                <CardTitle>О компании</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={companyInfo.logo || "/placeholder.svg"} alt={companyInfo.name} />
                    <AvatarFallback>TC</AvatarFallback>
                  </Avatar>
                  <div>
                    <Link href={`/company/${job.companyId}`}>
                      <h3 className="font-semibold hover:text-primary transition-colors">{companyInfo.name}</h3>
                    </Link>
                    <p className="text-sm text-muted-foreground">{companyInfo.employees} сотрудников</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{companyInfo.description}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Основана:</span>
                    <span>{companyInfo.founded}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Локация:</span>
                    <span>{companyInfo.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Активных вакансий:</span>
                    <span>{companyInfo.activeJobs}</span>
                  </div>
                </div>
                <Separator className="my-4" />
                <div className="space-y-2">
                  <Link href={`/company/${job.companyId}`}>
                    <Button variant="outline" className="w-full">
                      <Building className="h-4 w-4 mr-2" />
                      Профиль компании
                    </Button>
                  </Link>
                  <Button variant="outline" className="w-full">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Сайт компании
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle>Контактная информация</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Контактное лицо</p>
                    <p className="font-medium">{job.contactPerson}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <a href={`mailto:${job.contactEmail}`} className="text-sm hover:text-primary transition-colors">
                      {job.contactEmail}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <a href={`tel:${job.contactPhone}`} className="text-sm hover:text-primary transition-colors">
                      {job.contactPhone}
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Related Jobs */}
            <Card>
              <CardHeader>
                <CardTitle>Похожие вакансии</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {relatedJobs.map((relatedJob) => (
                    <div key={relatedJob.id} className="border rounded-lg p-3">
                      <Link href={`/job/${relatedJob.id}`}>
                        <h4 className="font-medium hover:text-primary transition-colors mb-1">{relatedJob.title}</h4>
                      </Link>
                      <p className="text-sm text-muted-foreground mb-2">{relatedJob.company}</p>
                      <div className="flex justify-between items-center text-sm">
                        <span className="font-medium">{relatedJob.salary}</span>
                        <span className="text-muted-foreground">{relatedJob.posted}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <Link href="/jobs">
                  <Button variant="outline" className="w-full mt-4">
                    Все вакансии
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
