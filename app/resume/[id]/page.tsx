"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  MapPin,
  Calendar,
  Mail,
  Phone,
  Globe,
  Briefcase,
  GraduationCap,
  Award,
  Languages,
  Star,
  Eye,
  Download,
  MessageCircle,
  ArrowLeft,
  CheckCircle,
  Building,
  ExternalLink,
} from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function ResumePage() {
  const params = useParams()
  const resumeId = params.id as string
  const [isContacted, setIsContacted] = useState(false)

  // Mock resume data - in real app, fetch by ID
  const resume = {
    id: resumeId,
    name: "Алишер Каримов",
    photo: "/placeholder.svg?height=200&width=200",
    title: "Senior Frontend Developer",
    location: "Душанбе, Таджикистан",
    age: 28,
    experience: "5+ лет",
    education: "Высшее техническое",
    email: "alisher.karimov@email.com",
    phone: "+992 90 123-45-67",
    website: "https://alisher-dev.com",
    linkedin: "linkedin.com/in/alisher-karimov",
    github: "github.com/alisher-dev",
    summary: `Опытный Frontend разработчик с 5+ годами коммерческого опыта в создании современных веб-приложений. Специализируюсь на React экосистеме, TypeScript и современных инструментах разработки.

Имею успешный опыт работы в международных командах, участвовал в разработке крупных проектов для финтех и e-commerce компаний. Постоянно изучаю новые технологии и следую лучшим практикам разработки.

Ищу возможности для профессионального роста в динамичной команде, где смогу применить свои навыки и получить новый опыт.`,
    skills: [
      { name: "React", level: 95 },
      { name: "TypeScript", level: 90 },
      { name: "Next.js", level: 85 },
      { name: "JavaScript", level: 95 },
      { name: "HTML/CSS", level: 90 },
      { name: "Node.js", level: 75 },
      { name: "GraphQL", level: 70 },
      { name: "Git", level: 85 },
      { name: "Docker", level: 60 },
      { name: "AWS", level: 65 },
    ],
    languages: [
      { name: "Русский", level: "Родной" },
      { name: "Таджикский", level: "Родной" },
      { name: "Английский", level: "B2 (Upper-Intermediate)" },
      { name: "Персидский", level: "A2 (Elementary)" },
    ],
    experience: [
      {
        id: 1,
        position: "Senior Frontend Developer",
        company: "TechCorp International",
        companyLogo: "/placeholder.svg?height=40&width=40",
        location: "Душанбе",
        startDate: "Январь 2022",
        endDate: "Настоящее время",
        duration: "2 года 11 месяцев",
        current: true,
        description: `• Разработка и поддержка веб-приложений на React/TypeScript
• Оптимизация производительности приложений, улучшение Core Web Vitals на 40%
• Внедрение современных практик разработки (TypeScript, ESLint, Prettier)
• Менторинг junior разработчиков и проведение code review
• Участие в архитектурных решениях и техническом планировании`,
        technologies: ["React", "TypeScript", "Next.js", "GraphQL", "Styled Components"],
      },
      {
        id: 2,
        position: "Frontend Developer",
        company: "Digital Solutions LLC",
        companyLogo: "/placeholder.svg?height=40&width=40",
        location: "Душанбе",
        startDate: "Март 2020",
        endDate: "Декабрь 2021",
        duration: "1 год 10 месяцев",
        current: false,
        description: `• Создание responsive веб-приложений с использованием React
• Интеграция с REST API и обработка состояния приложения
• Разработка переиспользуемых UI компонентов
• Участие в agile процессах разработки
• Тестирование кода с использованием Jest и React Testing Library`,
        technologies: ["React", "JavaScript", "Redux", "SASS", "Jest"],
      },
      {
        id: 3,
        position: "Junior Frontend Developer",
        company: "WebStudio Pro",
        companyLogo: "/placeholder.svg?height=40&width=40",
        location: "Душанбе",
        startDate: "Июнь 2019",
        endDate: "Февраль 2020",
        duration: "9 месяцев",
        current: false,
        description: `• Верстка веб-страниц по макетам Figma/Adobe XD
• Создание интерактивных элементов с использованием JavaScript
• Оптимизация сайтов для поисковых систем (SEO)
• Поддержка и обновление существующих проектов
• Изучение современных фреймворков и библиотек`,
        technologies: ["HTML", "CSS", "JavaScript", "jQuery", "Bootstrap"],
      },
    ],
    education: [
      {
        id: 1,
        degree: "Бакалавр информатики",
        institution: "Таджикский технический университет",
        location: "Душанбе",
        startDate: "2015",
        endDate: "2019",
        description: "Специализация: Программная инженерия. Средний балл: 4.8/5.0",
      },
    ],
    certifications: [
      {
        id: 1,
        name: "React Developer Certification",
        issuer: "Meta",
        date: "2023",
        credentialId: "ABC123456",
        url: "https://coursera.org/verify/ABC123456",
      },
      {
        id: 2,
        name: "AWS Certified Cloud Practitioner",
        issuer: "Amazon Web Services",
        date: "2022",
        credentialId: "DEF789012",
        url: "https://aws.amazon.com/verification",
      },
    ],
    projects: [
      {
        id: 1,
        name: "E-commerce Platform",
        description: "Полнофункциональная платформа электронной коммерции с корзиной, оплатой и админ-панелью",
        technologies: ["React", "Next.js", "TypeScript", "Stripe", "PostgreSQL"],
        url: "https://ecommerce-demo.com",
        github: "https://github.com/alisher-dev/ecommerce",
      },
      {
        id: 2,
        name: "Task Management App",
        description: "Приложение для управления задачами с drag-and-drop функциональностью",
        technologies: ["React", "Redux Toolkit", "Material-UI", "Node.js"],
        url: "https://taskmanager-demo.com",
        github: "https://github.com/alisher-dev/taskmanager",
      },
    ],
    salary: { min: 3500, max: 5000, currency: "TJS" },
    availability: "Доступен",
    lastActive: "Онлайн",
    profileViews: 245,
    responseRate: 95,
    rating: 4.9,
    verified: true,
    premium: true,
    completeness: 95,
    joinDate: "Март 2019",
  }

  const relatedCandidates = [
    {
      id: "2",
      name: "Мадина Рахимова",
      title: "UX/UI Designer",
      photo: "/placeholder.svg?height=60&width=60",
      rating: 4.8,
      experience: "3-4 года",
    },
    {
      id: "3",
      name: "Фарход Назаров",
      title: "Data Scientist",
      photo: "/placeholder.svg?height=60&width=60",
      rating: 4.7,
      experience: "4-5 лет",
    },
    {
      id: "4",
      name: "Джамшед Холов",
      title: "Backend Developer",
      photo: "/placeholder.svg?height=60&width=60",
      rating: 4.5,
      experience: "2-3 года",
    },
  ]

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/candidates">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Назад к поиску
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Header */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-start gap-6 mb-6">
                  <Avatar className="h-32 w-32 mx-auto md:mx-0">
                    <AvatarImage src={resume.photo || "/placeholder.svg"} alt={resume.name} />
                    <AvatarFallback className="text-2xl">
                      {resume.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 text-center md:text-left">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2 justify-center md:justify-start">
                          {resume.verified && (
                            <Badge variant="outline" className="text-green-600 border-green-600">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Верифицирован
                            </Badge>
                          )}
                          {resume.premium && (
                            <Badge className="bg-primary/10 text-primary border-primary/20">Премиум</Badge>
                          )}
                        </div>
                        <h1 className="text-3xl font-bold mb-2">{resume.name}</h1>
                        <h2 className="text-xl text-muted-foreground mb-3">{resume.title}</h2>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground justify-center md:justify-start">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {resume.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {resume.age} лет
                          </div>
                          <div className="flex items-center gap-1">
                            <Briefcase className="h-4 w-4" />
                            {resume.experience}
                          </div>
                        </div>
                      </div>
                      <div className="text-center md:text-right mt-4 md:mt-0">
                        <div className="flex items-center gap-1 mb-1 justify-center md:justify-end">
                          <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                          <span className="text-lg font-semibold">{resume.rating}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">{resume.responseRate}% ответов</div>
                        <div className="text-sm text-muted-foreground">{resume.profileViews} просмотров</div>
                      </div>
                    </div>

                    {/* Contact Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <a href={`mailto:${resume.email}`} className="hover:text-primary transition-colors">
                          {resume.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <a href={`tel:${resume.phone}`} className="hover:text-primary transition-colors">
                          {resume.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-muted-foreground" />
                        <a
                          href={resume.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-primary transition-colors"
                        >
                          Портфолио
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <ExternalLink className="h-4 w-4 text-muted-foreground" />
                        <a
                          href={`https://${resume.linkedin}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-primary transition-colors"
                        >
                          LinkedIn
                        </a>
                      </div>
                    </div>

                    {/* Status */}
                    <div className="flex items-center gap-4 mt-4 justify-center md:justify-start">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            resume.lastActive === "Онлайн" ? "bg-green-500" : "bg-gray-400"
                          }`}
                        />
                        <span className="text-sm">{resume.lastActive}</span>
                      </div>
                      <Badge variant={resume.availability === "Доступен" ? "default" : "outline"}>
                        {resume.availability}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Salary Expectations */}
                <div className="bg-muted rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium mb-1">Ожидаемая зарплата</h3>
                      <p className="text-2xl font-bold">
                        {resume.salary.min.toLocaleString()} - {resume.salary.max.toLocaleString()}{" "}
                        {resume.salary.currency}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Профиль заполнен на</p>
                      <div className="flex items-center gap-2">
                        <Progress value={resume.completeness} className="w-20 h-2" />
                        <span className="text-sm font-medium">{resume.completeness}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Summary */}
            <Card>
              <CardHeader>
                <CardTitle>О себе</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none">
                  <div className="whitespace-pre-line">{resume.summary}</div>
                </div>
              </CardContent>
            </Card>

            {/* Experience */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  Опыт работы
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {resume.experience.map((exp, index) => (
                    <div key={exp.id} className="relative">
                      {index < resume.experience.length - 1 && (
                        <div className="absolute left-6 top-12 w-0.5 h-full bg-border" />
                      )}
                      <div className="flex gap-4">
                        <Avatar className="h-12 w-12 flex-shrink-0">
                          <AvatarImage src={exp.companyLogo || "/placeholder.svg"} alt={exp.company} />
                          <AvatarFallback>
                            {exp.company
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                            <div>
                              <h3 className="font-semibold text-lg">{exp.position}</h3>
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <Building className="h-4 w-4" />
                                <span>{exp.company}</span>
                                <span>•</span>
                                <span>{exp.location}</span>
                              </div>
                            </div>
                            {exp.current && <Badge variant="default">Текущее место</Badge>}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                            <Calendar className="h-4 w-4" />
                            <span>
                              {exp.startDate} - {exp.endDate}
                            </span>
                            <span>•</span>
                            <span>{exp.duration}</span>
                          </div>
                          <div className="prose prose-sm max-w-none mb-3">
                            <div className="whitespace-pre-line">{exp.description}</div>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {exp.technologies.map((tech) => (
                              <Badge key={tech} variant="secondary" className="text-xs">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Education */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  Образование
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {resume.education.map((edu) => (
                    <div key={edu.id} className="flex gap-4">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <GraduationCap className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{edu.degree}</h3>
                        <div className="flex items-center gap-2 text-muted-foreground mb-2">
                          <Building className="h-4 w-4" />
                          <span>{edu.institution}</span>
                          <span>•</span>
                          <span>{edu.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {edu.startDate} - {edu.endDate}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">{edu.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Skills */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Навыки
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {resume.skills.map((skill) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-sm text-muted-foreground">{skill.level}%</span>
                      </div>
                      <Progress value={skill.level} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Languages */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Languages className="h-5 w-5" />
                  Языки
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {resume.languages.map((language) => (
                    <div key={language.name} className="flex justify-between items-center">
                      <span className="font-medium">{language.name}</span>
                      <Badge variant="outline">{language.level}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Certifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Сертификаты
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {resume.certifications.map((cert) => (
                    <div key={cert.id} className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{cert.name}</h3>
                        <p className="text-muted-foreground">{cert.issuer}</p>
                        <p className="text-sm text-muted-foreground">Выдан: {cert.date}</p>
                      </div>
                      <a
                        href={cert.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline text-sm"
                      >
                        Проверить
                      </a>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Projects */}
            <Card>
              <CardHeader>
                <CardTitle>Проекты</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {resume.projects.map((project) => (
                    <div key={project.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold">{project.name}</h3>
                        <div className="flex gap-2">
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline text-sm"
                          >
                            Демо
                          </a>
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline text-sm"
                          >
                            GitHub
                          </a>
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-3">{project.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.map((tech) => (
                          <Badge key={tech} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Contact Card */}
            <Card>
              <CardHeader>
                <CardTitle>Связаться с кандидатом</CardTitle>
                <CardDescription>Отправьте сообщение или скачайте резюме</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button className="w-full" onClick={() => setIsContacted(true)} disabled={isContacted}>
                    <MessageCircle className="h-4 w-4 mr-2" />
                    {isContacted ? "Сообщение отправлено" : "Написать сообщение"}
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Скачать резюме
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Eye className="h-4 w-4 mr-2" />
                    Пригласить на вакансию
                  </Button>
                </div>
                <Separator className="my-4" />
                <div className="text-sm text-muted-foreground space-y-2">
                  <p>• Быстрый ответ в течение 24 часов</p>
                  <p>• Высокий рейтинг отзывчивости: {resume.responseRate}%</p>
                  <p>• На платформе с {resume.joinDate}</p>
                </div>
              </CardContent>
            </Card>

            {/* Stats Card */}
            <Card>
              <CardHeader>
                <CardTitle>Статистика профиля</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Просмотры профиля:</span>
                    <span className="font-medium">{resume.profileViews}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Рейтинг:</span>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{resume.rating}</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Отзывчивость:</span>
                    <span className="font-medium">{resume.responseRate}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Заполненность:</span>
                    <span className="font-medium">{resume.completeness}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Последняя активность:</span>
                    <span className="font-medium">{resume.lastActive}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Similar Candidates */}
            <Card>
              <CardHeader>
                <CardTitle>Похожие кандидаты</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {relatedCandidates.map((candidate) => (
                    <div key={candidate.id} className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={candidate.photo || "/placeholder.svg"} alt={candidate.name} />
                        <AvatarFallback>
                          {candidate.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <Link href={`/resume/${candidate.id}`}>
                          <h4 className="font-medium hover:text-primary transition-colors">{candidate.name}</h4>
                        </Link>
                        <p className="text-sm text-muted-foreground">{candidate.title}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span>{candidate.rating}</span>
                          <span>•</span>
                          <span>{candidate.experience}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Link href="/candidates">
                  <Button variant="outline" className="w-full mt-4">
                    Все кандидаты
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
