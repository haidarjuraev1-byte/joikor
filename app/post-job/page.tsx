"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Building,
  MapPin,
  DollarSign,
  Clock,
  FileText,
  Settings,
  Plus,
  X,
  Eye,
  Send,
  Sparkles,
  Target,
  Briefcase,
} from "lucide-react"

interface AutocompleteProps {
  value: string
  onChange: (value: string) => void
  suggestions: string[]
  placeholder: string
  className?: string
}

function AutocompleteInput({ value, onChange, suggestions, placeholder, className }: AutocompleteProps) {
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  const handleInputChange = (inputValue: string) => {
    onChange(inputValue)

    if (inputValue.length > 0) {
      const filtered = suggestions.filter((suggestion) => suggestion.toLowerCase().includes(inputValue.toLowerCase()))
      setFilteredSuggestions(filtered)
      setShowSuggestions(filtered.length > 0)
    } else {
      setShowSuggestions(false)
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    onChange(suggestion)
    setShowSuggestions(false)
    inputRef.current?.focus()
  }

  return (
    <div className="relative">
      <Input
        ref={inputRef}
        value={value}
        onChange={(e) => handleInputChange(e.target.value)}
        onFocus={() => {
          if (value.length > 0 && filteredSuggestions.length > 0) {
            setShowSuggestions(true)
          }
        }}
        onBlur={() => {
          setTimeout(() => setShowSuggestions(false), 200)
        }}
        placeholder={placeholder}
        className={className}
      />
      {showSuggestions && (
        <div className="absolute z-10 w-full mt-1 bg-background border rounded-md shadow-lg max-h-60 overflow-auto">
          {filteredSuggestions.map((suggestion, index) => (
            <div
              key={index}
              className="px-3 py-2 cursor-pointer hover:bg-accent text-sm"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default function PostJobPage() {
  const [activeTab, setActiveTab] = useState("basic")
  const [jobData, setJobData] = useState({
    title: "",
    company: "",
    location: "",
    category: "",
    type: "",
    experience: "",
    salary: {
      min: "",
      max: "",
      currency: "TJS",
      negotiable: false,
    },
    description: "",
    requirements: "",
    benefits: "",
    skills: [],
    questions: [],
  })

  const [newSkill, setNewSkill] = useState("")
  const [newQuestion, setNewQuestion] = useState("")

  // Intelligent suggestions data
  const jobTitleSuggestions = [
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "UX/UI Designer",
    "Data Analyst",
    "Data Scientist",
    "Project Manager",
    "Product Manager",
    "Marketing Manager",
    "Sales Manager",
    "Business Analyst",
    "DevOps Engineer",
    "Mobile Developer",
    "QA Engineer",
    "Graphic Designer",
    "Content Manager",
    "HR Manager",
    "Financial Analyst",
    "Customer Support",
    "System Administrator",
    "Network Engineer",
    "Cybersecurity Specialist",
    "Machine Learning Engineer",
    "Software Architect",
    "Technical Writer",
  ]

  const companySuggestions = [
    "TechCorp Tajikistan",
    "DesignStudio Pro",
    "Analytics Solutions",
    "Digital Innovations",
    "Smart Systems",
    "Creative Agency",
    "Data Insights",
    "Web Solutions",
    "Mobile Apps Co",
    "Cloud Technologies",
  ]

  const locationSuggestions = [
    "Душанбе",
    "Худжанд",
    "Куляб",
    "Бохтар",
    "Хорог",
    "Истаравшан",
    "Канибадам",
    "Турсунзаде",
    "Исфара",
    "Пенджикент",
    "Удаленно",
    "Гибридно",
  ]

  const categorySuggestions = [
    "IT и разработка",
    "Дизайн",
    "Маркетинг",
    "Продажи",
    "Финансы",
    "HR и кадры",
    "Образование",
    "Медицина",
    "Строительство",
    "Логистика",
    "Производство",
    "Консалтинг",
    "Банковское дело",
    "Страхование",
    "Недвижимость",
    "Туризм",
    "Ресторанный бизнес",
    "Розничная торговля",
  ]

  const skillSuggestions = [
    "JavaScript",
    "React",
    "TypeScript",
    "Node.js",
    "Python",
    "Java",
    "PHP",
    "C#",
    "HTML/CSS",
    "Vue.js",
    "Angular",
    "SQL",
    "MongoDB",
    "PostgreSQL",
    "Docker",
    "AWS",
    "Git",
    "Figma",
    "Adobe Photoshop",
    "Adobe Illustrator",
    "Sketch",
    "InVision",
    "Google Analytics",
    "SEO",
    "SEM",
    "Social Media Marketing",
    "Content Marketing",
    "Project Management",
    "Agile",
    "Scrum",
    "Jira",
    "Confluence",
    "Slack",
    "Trello",
    "Excel",
    "PowerPoint",
    "Word",
    "Salesforce",
    "HubSpot",
    "Mailchimp",
  ]

  const benefitsSuggestions = [
    "Медицинская страховка",
    "Оплачиваемый отпуск",
    "Гибкий график работы",
    "Удаленная работа",
    "Обучение и развитие",
    "Корпоративные мероприятия",
    "Бонусы и премии",
    "Компенсация обедов",
    "Спортзал",
    "Парковка",
    "Мобильная связь",
    "Интернет",
    "Транспортные расходы",
  ]

  const addSkill = () => {
    if (newSkill.trim() && !jobData.skills.includes(newSkill.trim())) {
      setJobData((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }))
      setNewSkill("")
    }
  }

  const removeSkill = (index: number) => {
    setJobData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }))
  }

  const addQuestion = () => {
    if (newQuestion.trim()) {
      setJobData((prev) => ({
        ...prev,
        questions: [...prev.questions, { id: Date.now(), text: newQuestion.trim(), required: false }],
      }))
      setNewQuestion("")
    }
  }

  const removeQuestion = (id: number) => {
    setJobData((prev) => ({
      ...prev,
      questions: prev.questions.filter((q: any) => q.id !== id),
    }))
  }

  const generateAIDescription = () => {
    const aiDescription = `Мы ищем талантливого ${jobData.title || "специалиста"} для присоединения к нашей команде в ${jobData.company || "компании"}. 

Основные обязанности:
• Участие в разработке и реализации проектов
• Сотрудничество с командой для достижения целей
• Анализ требований и предложение решений
• Поддержание высокого качества работы

Мы предлагаем:
• Конкурентоспособную заработную плату
• Возможности профессионального роста
• Дружный коллектив
• Современное рабочее место`

    setJobData((prev) => ({ ...prev, description: aiDescription }))
  }

  const generateAIRequirements = () => {
    const aiRequirements = `Требования к кандидату:
• Опыт работы ${jobData.experience || "от 1 года"} в соответствующей области
• Знание современных технологий и инструментов
• Аналитическое мышление и внимание к деталям
• Коммуникативные навыки и умение работать в команде
• Ответственность и нацеленность на результат
• Знание русского языка (обязательно)
• Знание английского языка будет преимуществом`

    setJobData((prev) => ({ ...prev, requirements: aiRequirements }))
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Разместить вакансию</h1>
          <p className="text-muted-foreground">Найдите идеального кандидата для вашей компании</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="basic">Основное</TabsTrigger>
                <TabsTrigger value="details">Детали</TabsTrigger>
                <TabsTrigger value="requirements">Требования</TabsTrigger>
                <TabsTrigger value="settings">Настройки</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building className="h-5 w-5" />
                      Основная информация
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Название вакансии *</Label>
                      <AutocompleteInput
                        value={jobData.title}
                        onChange={(value) => setJobData((prev) => ({ ...prev, title: value }))}
                        suggestions={jobTitleSuggestions}
                        placeholder="Начните вводить название должности"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="company">Компания *</Label>
                      <AutocompleteInput
                        value={jobData.company}
                        onChange={(value) => setJobData((prev) => ({ ...prev, company: value }))}
                        suggestions={companySuggestions}
                        placeholder="Начните вводить название компании"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Местоположение *</Label>
                        <AutocompleteInput
                          value={jobData.location}
                          onChange={(value) => setJobData((prev) => ({ ...prev, location: value }))}
                          suggestions={locationSuggestions}
                          placeholder="Начните вводить город"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Категория *</Label>
                        <AutocompleteInput
                          value={jobData.category}
                          onChange={(value) => setJobData((prev) => ({ ...prev, category: value }))}
                          suggestions={categorySuggestions}
                          placeholder="Выберите категорию"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Тип занятости *</Label>
                        <Select
                          value={jobData.type}
                          onValueChange={(value) => setJobData((prev) => ({ ...prev, type: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Выберите тип" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="fullTime">Полная занятость</SelectItem>
                            <SelectItem value="partTime">Частичная занятость</SelectItem>
                            <SelectItem value="contract">Контракт</SelectItem>
                            <SelectItem value="internship">Стажировка</SelectItem>
                            <SelectItem value="freelance">Фриланс</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Требуемый опыт</Label>
                        <Select
                          value={jobData.experience}
                          onValueChange={(value) => setJobData((prev) => ({ ...prev, experience: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Выберите опыт" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="noExperience">Без опыта</SelectItem>
                            <SelectItem value="junior">До 1 года</SelectItem>
                            <SelectItem value="middle">1-3 года</SelectItem>
                            <SelectItem value="senior">3-5 лет</SelectItem>
                            <SelectItem value="expert">Более 5 лет</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5" />
                      Зарплата
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>От (TJS)</Label>
                        <Input
                          type="number"
                          value={jobData.salary.min}
                          onChange={(e) =>
                            setJobData((prev) => ({
                              ...prev,
                              salary: { ...prev.salary, min: e.target.value },
                            }))
                          }
                          placeholder="1500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>До (TJS)</Label>
                        <Input
                          type="number"
                          value={jobData.salary.max}
                          onChange={(e) =>
                            setJobData((prev) => ({
                              ...prev,
                              salary: { ...prev.salary, max: e.target.value },
                            }))
                          }
                          placeholder="3000"
                        />
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="negotiable"
                        checked={jobData.salary.negotiable}
                        onCheckedChange={(checked) =>
                          setJobData((prev) => ({
                            ...prev,
                            salary: { ...prev.salary, negotiable: checked as boolean },
                          }))
                        }
                      />
                      <Label htmlFor="negotiable">Зарплата договорная</Label>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="details" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Описание вакансии
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="description">Описание работы *</Label>
                        <Button variant="outline" size="sm" onClick={generateAIDescription} className="text-xs">
                          <Sparkles className="h-3 w-3 mr-1" />
                          AI генерация
                        </Button>
                      </div>
                      <Textarea
                        id="description"
                        value={jobData.description}
                        onChange={(e) => setJobData((prev) => ({ ...prev, description: e.target.value }))}
                        placeholder="Опишите обязанности, задачи и особенности работы..."
                        rows={8}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="benefits">Что мы предлагаем</Label>
                      <Textarea
                        id="benefits"
                        value={jobData.benefits}
                        onChange={(e) => setJobData((prev) => ({ ...prev, benefits: e.target.value }))}
                        placeholder="Льготы, бонусы, возможности развития..."
                        rows={4}
                      />
                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className="text-sm text-muted-foreground">Популярные льготы:</span>
                        {benefitsSuggestions.slice(0, 6).map((benefit) => (
                          <Badge
                            key={benefit}
                            variant="outline"
                            className="cursor-pointer hover:bg-accent text-xs"
                            onClick={() => {
                              const currentBenefits = jobData.benefits
                              const newBenefits = currentBenefits ? `${currentBenefits}\n• ${benefit}` : `• ${benefit}`
                              setJobData((prev) => ({ ...prev, benefits: newBenefits }))
                            }}
                          >
                            + {benefit}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="requirements" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      Требования к кандидату
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="requirements">Требования *</Label>
                        <Button variant="outline" size="sm" onClick={generateAIRequirements} className="text-xs">
                          <Sparkles className="h-3 w-3 mr-1" />
                          AI генерация
                        </Button>
                      </div>
                      <Textarea
                        id="requirements"
                        value={jobData.requirements}
                        onChange={(e) => setJobData((prev) => ({ ...prev, requirements: e.target.value }))}
                        placeholder="Образование, опыт, навыки, личные качества..."
                        rows={8}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Ключевые навыки</Label>
                      <div className="flex gap-2">
                        <AutocompleteInput
                          value={newSkill}
                          onChange={setNewSkill}
                          suggestions={skillSuggestions}
                          placeholder="Начните вводить навык"
                        />
                        <Button onClick={addSkill} size="sm">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      {jobData.skills.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {jobData.skills.map((skill, index) => (
                            <Badge key={index} variant="secondary" className="flex items-center gap-1">
                              {skill}
                              <X className="h-3 w-3 cursor-pointer" onClick={() => removeSkill(index)} />
                            </Badge>
                          ))}
                        </div>
                      )}
                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className="text-sm text-muted-foreground">Популярные навыки:</span>
                        {skillSuggestions.slice(0, 8).map((skill) => (
                          <Badge
                            key={skill}
                            variant="outline"
                            className="cursor-pointer hover:bg-accent text-xs"
                            onClick={() => {
                              if (!jobData.skills.includes(skill)) {
                                setJobData((prev) => ({ ...prev, skills: [...prev.skills, skill] }))
                              }
                            }}
                          >
                            + {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Дополнительные вопросы</CardTitle>
                    <CardDescription>Добавьте вопросы, которые помогут лучше оценить кандидатов</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex gap-2">
                      <Input
                        value={newQuestion}
                        onChange={(e) => setNewQuestion(e.target.value)}
                        placeholder="Введите вопрос для кандидатов"
                        onKeyPress={(e) => e.key === "Enter" && addQuestion()}
                      />
                      <Button onClick={addQuestion} size="sm">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    {jobData.questions.length > 0 && (
                      <div className="space-y-2">
                        {jobData.questions.map((question: any, index) => (
                          <div key={question.id} className="flex items-center justify-between p-3 border rounded">
                            <span className="text-sm">{question.text}</span>
                            <Button variant="ghost" size="sm" onClick={() => removeQuestion(question.id)}>
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="space-y-2">
                      <span className="text-sm text-muted-foreground">Популярные вопросы:</span>
                      <div className="space-y-1">
                        {[
                          "Расскажите о своем опыте работы с нашими технологиями",
                          "Почему вы хотите работать в нашей компании?",
                          "Какие ваши карьерные цели на ближайшие 2-3 года?",
                          "Опишите ваш самый сложный проект",
                        ].map((question) => (
                          <Badge
                            key={question}
                            variant="outline"
                            className="cursor-pointer hover:bg-accent text-xs mr-2 mb-2"
                            onClick={() => {
                              setJobData((prev) => ({
                                ...prev,
                                questions: [...prev.questions, { id: Date.now(), text: question, required: false }],
                              }))
                            }}
                          >
                            + {question}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="h-5 w-5" />
                      Настройки публикации
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-base">Срочная вакансия</Label>
                          <p className="text-sm text-muted-foreground">Выделить вакансию в поиске (+50 TJS)</p>
                        </div>
                        <Checkbox />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-base">Автопродление</Label>
                          <p className="text-sm text-muted-foreground">Автоматически продлевать вакансию</p>
                        </div>
                        <Checkbox />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-base">Уведомления</Label>
                          <p className="text-sm text-muted-foreground">Получать уведомления о новых откликах</p>
                        </div>
                        <Checkbox defaultChecked />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-base">Показать зарплату</Label>
                          <p className="text-sm text-muted-foreground">Отображать зарплату в объявлении</p>
                        </div>
                        <Checkbox defaultChecked />
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <Label>Срок публикации</Label>
                      <Select defaultValue="30">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="7">7 дней</SelectItem>
                          <SelectItem value="14">14 дней</SelectItem>
                          <SelectItem value="30">30 дней</SelectItem>
                          <SelectItem value="60">60 дней</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Контактное лицо</Label>
                      <Input placeholder="Имя HR-менеджера" />
                    </div>

                    <div className="space-y-2">
                      <Label>Email для откликов</Label>
                      <Input type="email" placeholder="hr@company.com" />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Preview Panel */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5" />
                    Предварительный просмотр
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-lg">{jobData.title || "Название вакансии"}</h3>
                      <p className="text-muted-foreground">{jobData.company || "Название компании"}</p>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{jobData.location || "Местоположение"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{jobData.type || "Тип занятости"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Briefcase className="h-4 w-4" />
                        <span>{jobData.category || "Категория"}</span>
                      </div>
                      {(jobData.salary.min || jobData.salary.max) && (
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4" />
                          <span>
                            {jobData.salary.min && jobData.salary.max
                              ? `${jobData.salary.min} - ${jobData.salary.max} TJS`
                              : jobData.salary.negotiable
                                ? "Договорная"
                                : "Не указана"}
                          </span>
                        </div>
                      )}
                    </div>

                    {jobData.skills.length > 0 && (
                      <div>
                        <h4 className="font-medium mb-2">Навыки:</h4>
                        <div className="flex flex-wrap gap-1">
                          {jobData.skills.slice(0, 3).map((skill, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                          {jobData.skills.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{jobData.skills.length - 3}
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="pt-4 border-t">
                      <p className="text-xs text-muted-foreground">Опубликовано: сегодня</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-2">
                <Button className="w-full">
                  <Send className="h-4 w-4 mr-2" />
                  Опубликовать вакансию
                </Button>
                <Button variant="outline" className="w-full">
                  Сохранить черновик
                </Button>
              </div>

              <Card>
                <CardContent className="pt-6">
                  <div className="text-center space-y-2">
                    <h4 className="font-medium">Стоимость публикации</h4>
                    <div className="text-2xl font-bold">Бесплатно</div>
                    <p className="text-xs text-muted-foreground">Первые 3 вакансии бесплатно</p>
                    <Separator className="my-3" />
                    <div className="space-y-1 text-xs text-muted-foreground">
                      <p>• Срочная вакансия: +50 TJS</p>
                      <p>• Продвижение в топ: +100 TJS</p>
                      <p>• Премиум размещение: +200 TJS</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">AI Помощник</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <p className="font-medium mb-1">💡 Совет</p>
                      <p className="text-muted-foreground">
                        Добавьте конкретные требования к навыкам для привлечения подходящих кандидатов
                      </p>
                    </div>
                    <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <p className="font-medium mb-1">✨ Рекомендация</p>
                      <p className="text-muted-foreground">Укажите возможности карьерного роста в описании вакансии</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
