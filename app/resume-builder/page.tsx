"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Plus,
  Trash2,
  Download,
  Eye,
  Sparkles,
  User,
  Briefcase,
  GraduationCap,
  Award,
  FileText,
  Crown,
  Check,
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
          // Delay hiding suggestions to allow clicking
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

export default function ResumeBuilderPage() {
  const [currentStep, setCurrentStep] = useState("template")
  const [selectedTemplate, setSelectedTemplate] = useState("")
  const [completeness, setCompleteness] = useState(25)
  const [userPlan, setUserPlan] = useState<"free" | "premium">("free")

  const [resumeData, setResumeData] = useState({
    personal: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      city: "",
      title: "",
      summary: "",
    },
    experience: [],
    education: [],
    skills: [],
    languages: [],
  })

  // AI Suggestions Data
  const jobTitleSuggestions = [
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "UX/UI Designer",
    "Data Analyst",
    "Project Manager",
    "Marketing Manager",
    "Sales Manager",
    "Business Analyst",
    "DevOps Engineer",
    "Mobile Developer",
    "QA Engineer",
    "Product Manager",
    "Graphic Designer",
    "Content Manager",
  ]

  const citySuggestions = [
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
  ]

  const templates = [
    {
      id: "modern",
      name: "Современный",
      description: "Чистый и профессиональный дизайн",
      preview: "/placeholder.svg?height=300&width=200",
      free: true,
    },
    {
      id: "creative",
      name: "Креативный",
      description: "Яркий дизайн для творческих профессий",
      preview: "/placeholder.svg?height=300&width=200",
      free: false,
    },
    {
      id: "classic",
      name: "Классический",
      description: "Традиционный формат для консервативных сфер",
      preview: "/placeholder.svg?height=300&width=200",
      free: true,
    },
    {
      id: "minimal",
      name: "Минималистичный",
      description: "Простой и элегантный стиль",
      preview: "/placeholder.svg?height=300&width=200",
      free: true,
    },
    {
      id: "executive",
      name: "Руководитель",
      description: "Премиум дизайн для топ-менеджеров",
      preview: "/placeholder.svg?height=300&width=200",
      free: false,
    },
    {
      id: "tech",
      name: "IT-специалист",
      description: "Современный дизайн для IT-сферы",
      preview: "/placeholder.svg?height=300&width=200",
      free: false,
    },
  ]

  const handleAiSuggestion = (field: string) => {
    const suggestions = {
      summary:
        "Опытный специалист с 3+ годами работы в сфере IT. Специализируюсь на разработке веб-приложений с использованием современных технологий. Имею опыт работы в команде и самостоятельно над проектами различной сложности. Стремлюсь к постоянному профессиональному развитию и изучению новых технологий.",
      title: "Frontend Developer",
    }

    if (suggestions[field as keyof typeof suggestions]) {
      setResumeData((prev) => ({
        ...prev,
        personal: {
          ...prev.personal,
          [field]: suggestions[field as keyof typeof suggestions],
        },
      }))
    }
  }

  const addExperience = () => {
    const newExperience = {
      id: Date.now(),
      position: "",
      company: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    }
    setResumeData((prev) => ({
      ...prev,
      experience: [...prev.experience, newExperience],
    }))
  }

  const addEducation = () => {
    const newEducation = {
      id: Date.now(),
      degree: "",
      institution: "",
      startDate: "",
      endDate: "",
      description: "",
    }
    setResumeData((prev) => ({
      ...prev,
      education: [...prev.education, newEducation],
    }))
  }

  const addSkill = (skill: string) => {
    if (skill && !resumeData.skills.includes(skill)) {
      setResumeData((prev) => ({
        ...prev,
        skills: [...prev.skills, skill],
      }))
    }
  }

  const removeSkill = (skillToRemove: string) => {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }))
  }

  const steps = [
    { id: "template", title: "Шаблон", icon: FileText },
    { id: "personal", title: "Личные данные", icon: User },
    { id: "experience", title: "Опыт", icon: Briefcase },
    { id: "education", title: "Образование", icon: GraduationCap },
    { id: "skills", title: "Навыки", icon: Award },
    { id: "preview", title: "Предварительный просмотр", icon: Eye },
  ]

  const currentStepIndex = steps.findIndex((step) => step.id === currentStep)

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Конструктор резюме</h1>
          <p className="text-muted-foreground">Создайте профессиональное резюме с помощью AI-помощника</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => {
              const IconComponent = step.icon
              const isActive = step.id === currentStep
              const isCompleted = index < currentStepIndex

              return (
                <div key={step.id} className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                      isActive
                        ? "border-primary bg-primary text-primary-foreground"
                        : isCompleted
                          ? "border-green-500 bg-green-500 text-white"
                          : "border-muted-foreground text-muted-foreground"
                    }`}
                  >
                    {isCompleted ? <Check className="h-5 w-5" /> : <IconComponent className="h-5 w-5" />}
                  </div>
                  <span
                    className={`ml-2 text-sm font-medium ${
                      isActive ? "text-primary" : isCompleted ? "text-green-600" : "text-muted-foreground"
                    }`}
                  >
                    {step.title}
                  </span>
                  {index < steps.length - 1 && (
                    <div className={`w-12 h-0.5 mx-4 ${isCompleted ? "bg-green-500" : "bg-muted"}`} />
                  )}
                </div>
              )
            })}
          </div>
          <Progress value={((currentStepIndex + 1) / steps.length) * 100} className="h-2" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Template Selection */}
            {currentStep === "template" && (
              <Card>
                <CardHeader>
                  <CardTitle>Выберите шаблон резюме</CardTitle>
                  <CardDescription>Выберите дизайн, который лучше всего подходит для вашей профессии</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {templates.map((template) => (
                      <div
                        key={template.id}
                        className={`relative border-2 rounded-lg p-4 cursor-pointer transition-all ${
                          selectedTemplate === template.id
                            ? "border-primary bg-primary/5"
                            : "border-muted hover:border-primary/50"
                        }`}
                        onClick={() => setSelectedTemplate(template.id)}
                      >
                        {!template.free && (
                          <Badge className="absolute top-2 right-2 bg-yellow-500">
                            <Crown className="h-3 w-3 mr-1" />
                            Премиум
                          </Badge>
                        )}
                        <div className="aspect-[3/4] bg-muted rounded mb-3"></div>
                        <h3 className="font-medium mb-1">{template.name}</h3>
                        <p className="text-sm text-muted-foreground">{template.description}</p>
                        {selectedTemplate === template.id && (
                          <div className="absolute inset-0 flex items-center justify-center bg-primary/10 rounded-lg">
                            <Check className="h-8 w-8 text-primary" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {userPlan === "free" && (
                    <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Crown className="h-5 w-5 text-yellow-600" />
                        <span className="font-medium text-yellow-800 dark:text-yellow-200">Бесплатный план</span>
                      </div>
                      <p className="text-sm text-yellow-700 dark:text-yellow-300 mb-3">
                        Доступны только базовые шаблоны. Обновитесь до премиум для доступа ко всем дизайнам.
                      </p>
                      <Button size="sm" className="bg-yellow-600 hover:bg-yellow-700">
                        Обновить до премиум
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Personal Information */}
            {currentStep === "personal" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Личная информация
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Имя *</Label>
                      <Input
                        id="firstName"
                        value={resumeData.personal.firstName}
                        onChange={(e) =>
                          setResumeData((prev) => ({
                            ...prev,
                            personal: { ...prev.personal, firstName: e.target.value },
                          }))
                        }
                        placeholder="Введите ваше имя"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Фамилия *</Label>
                      <Input
                        id="lastName"
                        value={resumeData.personal.lastName}
                        onChange={(e) =>
                          setResumeData((prev) => ({
                            ...prev,
                            personal: { ...prev.personal, lastName: e.target.value },
                          }))
                        }
                        placeholder="Введите вашу фамилию"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={resumeData.personal.email}
                        onChange={(e) =>
                          setResumeData((prev) => ({
                            ...prev,
                            personal: { ...prev.personal, email: e.target.value },
                          }))
                        }
                        placeholder="your@email.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Телефон *</Label>
                      <Input
                        id="phone"
                        value={resumeData.personal.phone}
                        onChange={(e) =>
                          setResumeData((prev) => ({
                            ...prev,
                            personal: { ...prev.personal, phone: e.target.value },
                          }))
                        }
                        placeholder="+992 XX XXX XX XX"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="city">Город *</Label>
                    <AutocompleteInput
                      value={resumeData.personal.city}
                      onChange={(value) =>
                        setResumeData((prev) => ({
                          ...prev,
                          personal: { ...prev.personal, city: value },
                        }))
                      }
                      suggestions={citySuggestions}
                      placeholder="Начните вводить название города"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="title">Желаемая должность *</Label>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleAiSuggestion("title")}
                        className="text-xs"
                      >
                        <Sparkles className="h-3 w-3 mr-1" />
                        AI предложение
                      </Button>
                    </div>
                    <AutocompleteInput
                      value={resumeData.personal.title}
                      onChange={(value) =>
                        setResumeData((prev) => ({
                          ...prev,
                          personal: { ...prev.personal, title: value },
                        }))
                      }
                      suggestions={jobTitleSuggestions}
                      placeholder="Начните вводить название должности"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="summary">О себе</Label>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleAiSuggestion("summary")}
                        className="text-xs"
                      >
                        <Sparkles className="h-3 w-3 mr-1" />
                        AI предложение
                      </Button>
                    </div>
                    <Textarea
                      id="summary"
                      value={resumeData.personal.summary}
                      onChange={(e) =>
                        setResumeData((prev) => ({
                          ...prev,
                          personal: { ...prev.personal, summary: e.target.value },
                        }))
                      }
                      placeholder="Расскажите о себе, своих достижениях и целях..."
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Experience */}
            {currentStep === "experience" && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Briefcase className="h-5 w-5" />
                      Опыт работы
                    </CardTitle>
                    <Button onClick={addExperience} size="sm">
                      <Plus className="h-4 w-4 mr-1" />
                      Добавить
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {resumeData.experience.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <Briefcase className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Добавьте ваш опыт работы</p>
                      <Button onClick={addExperience} variant="outline" className="mt-4">
                        <Plus className="h-4 w-4 mr-1" />
                        Добавить первое место работы
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {resumeData.experience.map((exp: any, index) => (
                        <div key={exp.id} className="border rounded-lg p-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>Должность *</Label>
                              <AutocompleteInput
                                value={exp.position || ""}
                                onChange={(value) => {
                                  // Update experience position
                                }}
                                suggestions={jobTitleSuggestions}
                                placeholder="Например: Frontend Developer"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Компания *</Label>
                              <Input placeholder="Название компании" />
                            </div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <div className="space-y-2">
                              <Label>Начало работы</Label>
                              <Input type="month" />
                            </div>
                            <div className="space-y-2">
                              <Label>Окончание работы</Label>
                              <Input type="month" />
                            </div>
                          </div>
                          <div className="mt-4 space-y-2">
                            <Label>Описание обязанностей</Label>
                            <Textarea placeholder="Опишите ваши обязанности и достижения..." rows={3} />
                          </div>
                          <div className="flex justify-end mt-4">
                            <Button variant="outline" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Education */}
            {currentStep === "education" && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <GraduationCap className="h-5 w-5" />
                      Образование
                    </CardTitle>
                    <Button onClick={addEducation} size="sm">
                      <Plus className="h-4 w-4 mr-1" />
                      Добавить
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {resumeData.education.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <GraduationCap className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Добавьте информацию об образовании</p>
                      <Button onClick={addEducation} variant="outline" className="mt-4">
                        <Plus className="h-4 w-4 mr-1" />
                        Добавить образование
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {resumeData.education.map((edu: any, index) => (
                        <div key={edu.id} className="border rounded-lg p-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>Степень/Специальность</Label>
                              <Input placeholder="Например: Бакалавр информатики" />
                            </div>
                            <div className="space-y-2">
                              <Label>Учебное заведение</Label>
                              <Input placeholder="Название университета/колледжа" />
                            </div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <div className="space-y-2">
                              <Label>Год поступления</Label>
                              <Input type="number" placeholder="2020" />
                            </div>
                            <div className="space-y-2">
                              <Label>Год окончания</Label>
                              <Input type="number" placeholder="2024" />
                            </div>
                          </div>
                          <div className="flex justify-end mt-4">
                            <Button variant="outline" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Skills */}
            {currentStep === "skills" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Навыки и компетенции
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Добавить навык</Label>
                    <AutocompleteInput
                      value=""
                      onChange={(value) => {
                        if (value && skillSuggestions.includes(value)) {
                          addSkill(value)
                        }
                      }}
                      suggestions={skillSuggestions}
                      placeholder="Начните вводить название навыка"
                    />
                  </div>

                  {resumeData.skills.length > 0 && (
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Выбранные навыки</h4>
                        <div className="flex flex-wrap gap-2">
                          {resumeData.skills.map((skill, index) => (
                            <Badge key={index} variant="secondary" className="flex items-center gap-1">
                              {skill}
                              <button onClick={() => removeSkill(skill)} className="ml-1 hover:text-destructive">
                                ×
                              </button>
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label>Популярные навыки</Label>
                    <div className="flex flex-wrap gap-2">
                      {skillSuggestions.slice(0, 12).map((skill) => (
                        <Badge
                          key={skill}
                          variant="outline"
                          className="cursor-pointer hover:bg-accent"
                          onClick={() => addSkill(skill)}
                        >
                          + {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Preview */}
            {currentStep === "preview" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5" />
                    Предварительный просмотр
                  </CardTitle>
                  <CardDescription>Проверьте ваше резюме перед скачиванием</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-white border rounded-lg p-8 text-black min-h-[800px]">
                    {/* Resume Preview Content */}
                    <div className="text-center mb-8">
                      <h1 className="text-3xl font-bold mb-2">
                        {resumeData.personal.firstName} {resumeData.personal.lastName}
                      </h1>
                      {resumeData.personal.title && (
                        <h2 className="text-xl text-gray-600 mb-4">{resumeData.personal.title}</h2>
                      )}
                      <div className="text-sm text-gray-500 space-y-1">
                        {resumeData.personal.email && <p>{resumeData.personal.email}</p>}
                        {resumeData.personal.phone && <p>{resumeData.personal.phone}</p>}
                        {resumeData.personal.city && <p>{resumeData.personal.city}</p>}
                      </div>
                    </div>

                    {resumeData.personal.summary && (
                      <div className="mb-8">
                        <h3 className="text-lg font-semibold mb-3 border-b border-gray-300 pb-1">О себе</h3>
                        <p className="text-gray-700 leading-relaxed">{resumeData.personal.summary}</p>
                      </div>
                    )}

                    {resumeData.skills.length > 0 && (
                      <div className="mb-8">
                        <h3 className="text-lg font-semibold mb-3 border-b border-gray-300 pb-1">Навыки</h3>
                        <div className="flex flex-wrap gap-2">
                          {resumeData.skills.map((skill, index) => (
                            <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {userPlan === "free" && (
                      <div className="absolute bottom-4 right-4 text-gray-400 text-xs opacity-50">
                        Создано на Joikor.tj
                      </div>
                    )}
                  </div>

                  <div className="flex gap-4 mt-6">
                    <Button className="flex-1">
                      <Download className="h-4 w-4 mr-2" />
                      {userPlan === "free" ? "Скачать PDF (с водяным знаком)" : "Скачать PDF"}
                    </Button>
                    {userPlan === "premium" && (
                      <Button variant="outline" className="flex-1">
                        <Download className="h-4 w-4 mr-2" />
                        Скачать Word
                      </Button>
                    )}
                  </div>

                  {userPlan === "free" && (
                    <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Crown className="h-5 w-5 text-blue-600" />
                        <span className="font-medium text-blue-800 dark:text-blue-200">Обновитесь до премиум</span>
                      </div>
                      <p className="text-sm text-blue-700 dark:text-blue-300 mb-3">
                        Получите доступ к скачиванию в формате Word без водяных знаков и премиум шаблонам.
                      </p>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        Обновить план
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Navigation */}
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={() => {
                  const currentIndex = steps.findIndex((step) => step.id === currentStep)
                  if (currentIndex > 0) {
                    setCurrentStep(steps[currentIndex - 1].id)
                  }
                }}
                disabled={currentStepIndex === 0}
              >
                Назад
              </Button>
              <Button
                onClick={() => {
                  const currentIndex = steps.findIndex((step) => step.id === currentStep)
                  if (currentIndex < steps.length - 1) {
                    setCurrentStep(steps[currentIndex + 1].id)
                  }
                }}
                disabled={currentStepIndex === steps.length - 1}
              >
                {currentStepIndex === steps.length - 1 ? "Завершить" : "Далее"}
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 space-y-6">
              {/* Progress Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Прогресс заполнения</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Заполнено</span>
                        <span>{completeness}%</span>
                      </div>
                      <Progress value={completeness} className="h-2" />
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span>Личные данные</span>
                        <Check className="h-4 w-4 text-green-500" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Опыт работы</span>
                        <div className="w-4 h-4 rounded-full border-2 border-muted" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Образование</span>
                        <div className="w-4 h-4 rounded-full border-2 border-muted" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Навыки</span>
                        <div className="w-4 h-4 rounded-full border-2 border-muted" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tips Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Sparkles className="h-5 w-5" />
                    Советы AI
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <p className="font-medium mb-1">💡 Совет дня</p>
                      <p className="text-muted-foreground">
                        Используйте конкретные цифры и достижения в описании опыта работы
                      </p>
                    </div>
                    <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <p className="font-medium mb-1">✨ Рекомендация</p>
                      <p className="text-muted-foreground">
                        Добавьте ключевые навыки, которые ищут работодатели в вашей сфере
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Plan Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Ваш план</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{userPlan === "free" ? "Бесплатный" : "Премиум"}</span>
                      {userPlan === "premium" && <Crown className="h-4 w-4 text-yellow-500" />}
                    </div>
                    {userPlan === "free" ? (
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <p>• 3 базовых шаблона</p>
                        <p>• PDF с водяным знаком</p>
                        <p>• Базовые AI советы</p>
                        <Button size="sm" className="w-full mt-3">
                          Обновить до премиум
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <p>• Все премиум шаблоны</p>
                        <p>• PDF и Word без водяных знаков</p>
                        <p>• Расширенные AI советы</p>
                        <p>• Приоритетная поддержка</p>
                      </div>
                    )}
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
