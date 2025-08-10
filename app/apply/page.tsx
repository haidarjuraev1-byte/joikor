"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  CheckCircle,
  FileText,
  Send,
  Paperclip,
  Clock,
  Eye,
  MessageCircle,
  X,
  ArrowLeft,
  Building,
  MapPin,
  DollarSign,
} from "lucide-react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"

interface Resume {
  id: string
  name: string
  title: string
  lastUpdated: string
  completeness: number
  isDefault: boolean
}

interface Message {
  id: string
  sender: "candidate" | "employer"
  content: string
  timestamp: string
  read: boolean
}

interface Application {
  id: string
  jobId: string
  jobTitle: string
  company: string
  companyLogo: string
  appliedDate: string
  status: "pending" | "viewed" | "interview" | "rejected" | "accepted"
  lastMessage?: string
  unreadCount: number
}

export default function ApplyPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const jobId = searchParams.get("job")

  const [step, setStep] = useState<"select-resume" | "application-form" | "success" | "chat">("select-resume")
  const [selectedResume, setSelectedResume] = useState<string>("")
  const [coverLetter, setCoverLetter] = useState("")
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [currentApplication, setCurrentApplication] = useState<Application | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")

  // Mock data
  const job = {
    id: jobId || "1",
    title: "Senior Frontend Developer",
    company: "TechCorp Tajikistan",
    companyLogo: "/placeholder.svg?height=60&width=60",
    location: "Душанбе",
    salary: "3,000 - 5,000 TJS",
    type: "Полная занятость",
  }

  const resumes: Resume[] = [
    {
      id: "1",
      name: "Основное резюме",
      title: "Senior Frontend Developer",
      lastUpdated: "2 дня назад",
      completeness: 95,
      isDefault: true,
    },
    {
      id: "2",
      name: "Резюме для стартапов",
      title: "Full Stack Developer",
      lastUpdated: "1 неделя назад",
      completeness: 88,
      isDefault: false,
    },
    {
      id: "3",
      name: "Резюме для крупных компаний",
      title: "Senior React Developer",
      lastUpdated: "3 дня назад",
      completeness: 92,
      isDefault: false,
    },
  ]

  const questions = [
    {
      id: "1",
      text: "Расскажите о своем опыте работы с React",
      type: "textarea",
      required: true,
    },
    {
      id: "2",
      text: "Готовы ли вы к переезду в Душанбе?",
      type: "radio",
      options: ["Да", "Нет", "Рассмотрю предложение"],
      required: true,
    },
    {
      id: "3",
      text: "Когда вы можете приступить к работе?",
      type: "radio",
      options: ["Немедленно", "В течение 2 недель", "В течение месяца", "Более месяца"],
      required: false,
    },
  ]

  const applications: Application[] = [
    {
      id: "1",
      jobId: "1",
      jobTitle: "Senior Frontend Developer",
      company: "TechCorp Tajikistan",
      companyLogo: "/placeholder.svg?height=40&width=40",
      appliedDate: "2 дня назад",
      status: "viewed",
      lastMessage: "Спасибо за отклик! Мы рассмотрим ваше резюме...",
      unreadCount: 1,
    },
    {
      id: "2",
      jobId: "2",
      jobTitle: "UX/UI Designer",
      company: "DesignStudio Pro",
      companyLogo: "/placeholder.svg?height=40&width=40",
      appliedDate: "5 дней назад",
      status: "interview",
      lastMessage: "Приглашаем вас на собеседование в четверг...",
      unreadCount: 0,
    },
    {
      id: "3",
      jobId: "3",
      jobTitle: "Data Analyst",
      company: "Analytics Pro",
      companyLogo: "/placeholder.svg?height=40&width=40",
      appliedDate: "1 неделя назад",
      status: "rejected",
      lastMessage: "К сожалению, мы выбрали другого кандидата...",
      unreadCount: 0,
    },
  ]

  const mockMessages: Message[] = [
    {
      id: "1",
      sender: "employer",
      content:
        "Здравствуйте! Спасибо за отклик на нашу вакансию. Мы рассмотрели ваше резюме и хотели бы пригласить вас на собеседование.",
      timestamp: "10:30",
      read: true,
    },
    {
      id: "2",
      sender: "candidate",
      content: "Здравствуйте! Спасибо за приглашение. Я готов пройти собеседование. Когда удобно провести встречу?",
      timestamp: "11:15",
      read: true,
    },
    {
      id: "3",
      sender: "employer",
      content:
        "Отлично! Предлагаем провести собеседование в четверг в 14:00. Встреча будет проходить в нашем офисе по адресу ул. Рудаки 123.",
      timestamp: "11:45",
      read: false,
    },
  ]

  useEffect(() => {
    if (selectedResume && resumes.length > 0) {
      const defaultResume = resumes.find((r) => r.isDefault)
      if (defaultResume) {
        setSelectedResume(defaultResume.id)
      }
    }
  }, [])

  const handleSubmitApplication = () => {
    // Simulate application submission
    setTimeout(() => {
      setStep("success")
      // Create new application
      const newApp: Application = {
        id: Date.now().toString(),
        jobId: job.id,
        jobTitle: job.title,
        company: job.company,
        companyLogo: job.companyLogo,
        appliedDate: "Только что",
        status: "pending",
        unreadCount: 0,
      }
      setCurrentApplication(newApp)
    }, 1000)
  }

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        sender: "candidate",
        content: newMessage,
        timestamp: new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" }),
        read: true,
      }
      setMessages([...messages, message])
      setNewMessage("")
    }
  }

  const getStatusBadge = (status: Application["status"]) => {
    const statusConfig = {
      pending: { label: "На рассмотрении", variant: "secondary" as const, icon: Clock },
      viewed: { label: "Просмотрено", variant: "default" as const, icon: Eye },
      interview: { label: "Собеседование", variant: "default" as const, icon: MessageCircle },
      rejected: { label: "Отклонено", variant: "destructive" as const, icon: X },
      accepted: { label: "Принято", variant: "default" as const, icon: CheckCircle },
    }
    const config = statusConfig[status]
    const Icon = config.icon
    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {config.label}
      </Badge>
    )
  }

  if (!jobId) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Ошибка</h1>
          <p className="text-muted-foreground mb-4">Вакансия не найдена</p>
          <Link href="/jobs">
            <Button>Вернуться к поиску</Button>
          </Link>
        </div>
      </div>
    )
  }

  if (step === "chat") {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Applications List */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Мои отклики</CardTitle>
                  <CardDescription>Управляйте своими заявками</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-96">
                    <div className="space-y-3">
                      {applications.map((app) => (
                        <div
                          key={app.id}
                          className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                            currentApplication?.id === app.id ? "bg-primary/5 border-primary" : "hover:bg-muted"
                          }`}
                          onClick={() => {
                            setCurrentApplication(app)
                            setMessages(mockMessages)
                          }}
                        >
                          <div className="flex items-start gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={app.companyLogo || "/placeholder.svg"} alt={app.company} />
                              <AvatarFallback>
                                {app.company
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-sm truncate">{app.jobTitle}</h4>
                              <p className="text-xs text-muted-foreground truncate">{app.company}</p>
                              <div className="flex items-center justify-between mt-1">
                                {getStatusBadge(app.status)}
                                {app.unreadCount > 0 && (
                                  <Badge className="h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                                    {app.unreadCount}
                                  </Badge>
                                )}
                              </div>
                              {app.lastMessage && (
                                <p className="text-xs text-muted-foreground mt-1 truncate">{app.lastMessage}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>

            {/* Chat Interface */}
            <div className="lg:col-span-2">
              {currentApplication ? (
                <Card className="h-[600px] flex flex-col">
                  <CardHeader className="border-b">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={currentApplication.companyLogo || "/placeholder.svg"}
                          alt={currentApplication.company}
                        />
                        <AvatarFallback>
                          {currentApplication.company
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="font-semibold">{currentApplication.jobTitle}</h3>
                        <p className="text-sm text-muted-foreground">{currentApplication.company}</p>
                      </div>
                      {getStatusBadge(currentApplication.status)}
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col p-0">
                    <ScrollArea className="flex-1 p-4">
                      <div className="space-y-4">
                        {messages.map((message) => (
                          <div
                            key={message.id}
                            className={`flex ${message.sender === "candidate" ? "justify-end" : "justify-start"}`}
                          >
                            <div
                              className={`max-w-[70%] rounded-lg p-3 ${
                                message.sender === "candidate" ? "bg-primary text-primary-foreground" : "bg-muted"
                              }`}
                            >
                              <p className="text-sm">{message.content}</p>
                              <p
                                className={`text-xs mt-1 ${
                                  message.sender === "candidate"
                                    ? "text-primary-foreground/70"
                                    : "text-muted-foreground"
                                }`}
                              >
                                {message.timestamp}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                    <div className="border-t p-4">
                      <div className="flex gap-2">
                        <Input
                          placeholder="Напишите сообщение..."
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                          className="flex-1"
                        />
                        <Button size="icon" variant="outline">
                          <Paperclip className="h-4 w-4" />
                        </Button>
                        <Button size="icon" onClick={handleSendMessage}>
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="h-[600px] flex items-center justify-center">
                  <div className="text-center">
                    <MessageCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-medium mb-2">Выберите заявку</h3>
                    <p className="text-muted-foreground">Выберите заявку слева, чтобы начать общение</p>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Back Button */}
        <Link href={`/job/${jobId}`}>
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Назад к вакансии
          </Button>
        </Link>

        {/* Job Info */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={job.companyLogo || "/placeholder.svg"} alt={job.company} />
                <AvatarFallback>
                  {job.company
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-xl font-bold mb-1">{job.title}</h2>
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <Building className="h-4 w-4" />
                  <span>{job.company}</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {job.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4" />
                    {job.salary}
                  </div>
                  <Badge variant="outline">{job.type}</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {step === "select-resume" && (
          <Card>
            <CardHeader>
              <CardTitle>Выберите резюме</CardTitle>
              <CardDescription>Выберите резюме, которое лучше всего подходит для этой вакансии</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup value={selectedResume} onValueChange={setSelectedResume}>
                <div className="space-y-4">
                  {resumes.map((resume) => (
                    <div key={resume.id} className="flex items-center space-x-3">
                      <RadioGroupItem value={resume.id} id={resume.id} />
                      <Label htmlFor={resume.id} className="flex-1 cursor-pointer">
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <FileText className="h-8 w-8 text-primary" />
                            <div>
                              <h3 className="font-medium">{resume.name}</h3>
                              <p className="text-sm text-muted-foreground">{resume.title}</p>
                              <p className="text-xs text-muted-foreground">Обновлено: {resume.lastUpdated}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            {resume.isDefault && <Badge className="mb-2">По умолчанию</Badge>}
                            <div className="text-sm text-muted-foreground">Заполнено: {resume.completeness}%</div>
                          </div>
                        </div>
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
              <div className="flex justify-between mt-6">
                <Link href="/resume-builder">
                  <Button variant="outline">Создать новое резюме</Button>
                </Link>
                <Button onClick={() => setStep("application-form")} disabled={!selectedResume}>
                  Продолжить
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === "application-form" && (
          <Card>
            <CardHeader>
              <CardTitle>Заявка на вакансию</CardTitle>
              <CardDescription>Заполните дополнительную информацию для работодателя</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Cover Letter */}
                <div className="space-y-2">
                  <Label htmlFor="cover-letter">Сопроводительное письмо</Label>
                  <Textarea
                    id="cover-letter"
                    placeholder="Расскажите, почему вы подходите для этой позиции..."
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    rows={4}
                  />
                </div>

                {/* Custom Questions */}
                {questions.map((question) => (
                  <div key={question.id} className="space-y-2">
                    <Label>
                      {question.text}
                      {question.required && <span className="text-red-500 ml-1">*</span>}
                    </Label>
                    {question.type === "textarea" && (
                      <Textarea
                        placeholder="Ваш ответ..."
                        value={answers[question.id] || ""}
                        onChange={(e) => setAnswers({ ...answers, [question.id]: e.target.value })}
                        rows={3}
                      />
                    )}
                    {question.type === "radio" && question.options && (
                      <RadioGroup
                        value={answers[question.id] || ""}
                        onValueChange={(value) => setAnswers({ ...answers, [question.id]: value })}
                      >
                        {question.options.map((option) => (
                          <div key={option} className="flex items-center space-x-2">
                            <RadioGroupItem value={option} id={`${question.id}-${option}`} />
                            <Label htmlFor={`${question.id}-${option}`}>{option}</Label>
                          </div>
                        ))}
                      </RadioGroup>
                    )}
                  </div>
                ))}

                {/* Consent */}
                <div className="flex items-center space-x-2">
                  <Checkbox id="consent" />
                  <Label htmlFor="consent" className="text-sm">
                    Я согласен на обработку персональных данных и получение уведомлений о статусе заявки
                  </Label>
                </div>
              </div>

              <div className="flex justify-between mt-6">
                <Button variant="outline" onClick={() => setStep("select-resume")}>
                  Назад
                </Button>
                <Button onClick={handleSubmitApplication}>Отправить заявку</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === "success" && (
          <Card>
            <CardContent className="p-8 text-center">
              <CheckCircle className="h-16 w-16 mx-auto mb-4 text-green-500" />
              <h2 className="text-2xl font-bold mb-2">Заявка отправлена!</h2>
              <p className="text-muted-foreground mb-6">
                Ваша заявка успешно отправлена работодателю. Мы уведомим вас о любых изменениях статуса.
              </p>
              <div className="space-y-3">
                <Button onClick={() => setStep("chat")} className="w-full">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Перейти к чату
                </Button>
                <Link href="/dashboard">
                  <Button variant="outline" className="w-full">
                    Мои заявки
                  </Button>
                </Link>
                <Link href="/jobs">
                  <Button variant="ghost" className="w-full">
                    Продолжить поиск
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
