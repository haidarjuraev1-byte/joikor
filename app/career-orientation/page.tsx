"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  Brain,
  Target,
  TrendingUp,
  Award,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  CheckCircle,
  Briefcase,
  MapPin,
  DollarSign,
  Clock,
  Star,
  Users,
  BookOpen,
  Lightbulb,
} from "lucide-react"

interface Question {
  id: number
  text: string
  options: string[]
  category: "personality" | "interests" | "skills" | "values"
}

interface TestResult {
  personality: string
  interests: string[]
  skills: string[]
  values: string[]
  recommendedCareers: RecommendedCareer[]
  score: number
}

interface RecommendedCareer {
  title: string
  match: number
  description: string
  averageSalary: string
  growth: string
  location: string
  skills: string[]
  companies: string[]
}

export default function CareerOrientationPage() {
  const [currentStep, setCurrentStep] = useState<"intro" | "test" | "results">("intro")
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [testResult, setTestResult] = useState<TestResult | null>(null)

  const questions: Question[] = [
    {
      id: 1,
      text: "Что вас больше всего мотивирует в работе?",
      options: [
        "Возможность творчески самовыражаться",
        "Стабильный доход и социальные гарантии",
        "Возможность помогать людям",
        "Решение сложных технических задач",
        "Лидерство и управление командой",
      ],
      category: "values",
    },
    {
      id: 2,
      text: "Какой тип задач вам больше нравится?",
      options: [
        "Аналитические задачи с данными",
        "Творческие проекты и дизайн",
        "Работа с людьми и коммуникация",
        "Техническая разработка и программирование",
        "Планирование и организация процессов",
      ],
      category: "interests",
    },
    {
      id: 3,
      text: "В какой рабочей среде вы чувствуете себя комфортнее?",
      options: [
        "В тихом офисе с минимальными отвлечениями",
        "В динамичной команде с активным общением",
        "В творческой студии с свободной атмосферой",
        "Дома, работая удаленно",
        "В поездках и командировках",
      ],
      category: "personality",
    },
    {
      id: 4,
      text: "Какие навыки у вас развиты лучше всего?",
      options: [
        "Аналитическое мышление и работа с числами",
        "Креативность и художественные способности",
        "Коммуникация и работа с людьми",
        "Техническое мышление и логика",
        "Организационные способности и планирование",
      ],
      category: "skills",
    },
    {
      id: 5,
      text: "Что для вас важнее в карьере?",
      options: [
        "Высокая заработная плата",
        "Интересные и разнообразные задачи",
        "Возможность карьерного роста",
        "Баланс работы и личной жизни",
        "Признание и статус в обществе",
      ],
      category: "values",
    },
    {
      id: 6,
      text: "Как вы предпочитаете работать?",
      options: [
        "Самостоятельно, без постоянного контроля",
        "В небольшой команде единомышленников",
        "В большой корпорации с четкой структурой",
        "В стартапе с быстрым темпом развития",
        "Как фрилансер с гибким графиком",
      ],
      category: "personality",
    },
    {
      id: 7,
      text: "Какие предметы в школе/университете вам нравились больше?",
      options: [
        "Математика и физика",
        "Литература и история",
        "Биология и химия",
        "Информатика и технологии",
        "Экономика и обществознание",
      ],
      category: "interests",
    },
    {
      id: 8,
      text: "Что вас больше всего привлекает в работе?",
      options: [
        "Возможность изучать новые технологии",
        "Создание чего-то красивого и полезного",
        "Помощь в решении проблем людей",
        "Анализ данных и поиск закономерностей",
        "Управление проектами и командами",
      ],
      category: "interests",
    },
    {
      id: 9,
      text: "Как вы относитесь к рискам в карьере?",
      options: [
        "Предпочитаю стабильность и предсказуемость",
        "Готов рисковать ради больших возможностей",
        "Принимаю обдуманные риски",
        "Избегаю рисков, выбираю проверенные пути",
        "Люблю вызовы и неопределенность",
      ],
      category: "personality",
    },
    {
      id: 10,
      text: "Какой результат работы приносит вам больше удовлетворения?",
      options: [
        "Решенная техническая проблема",
        "Довольный клиент или пользователь",
        "Красивый и функциональный продукт",
        "Успешно завершенный проект в срок",
        "Рост показателей и достижение целей",
      ],
      category: "values",
    },
  ]

  const analyzeResults = (): TestResult => {
    const categoryScores = {
      personality: { introvert: 0, extrovert: 0, balanced: 0 },
      interests: { tech: 0, creative: 0, people: 0, analytical: 0, management: 0 },
      skills: { technical: 0, creative: 0, communication: 0, analytical: 0, organizational: 0 },
      values: { money: 0, creativity: 0, helping: 0, stability: 0, growth: 0 },
    }

    // Analyze answers (simplified scoring logic)
    Object.entries(answers).forEach(([questionId, answerIndex]) => {
      const question = questions.find((q) => q.id === Number.parseInt(questionId))
      if (!question) return

      const answerIdx = Number.parseInt(answerIndex)

      switch (question.category) {
        case "personality":
          if (answerIdx === 0 || answerIdx === 3) categoryScores.personality.introvert++
          else if (answerIdx === 1 || answerIdx === 4) categoryScores.personality.extrovert++
          else categoryScores.personality.balanced++
          break
        case "interests":
          if (answerIdx === 0) categoryScores.interests.analytical++
          else if (answerIdx === 1) categoryScores.interests.creative++
          else if (answerIdx === 2) categoryScores.interests.people++
          else if (answerIdx === 3) categoryScores.interests.tech++
          else categoryScores.interests.management++
          break
        case "skills":
          if (answerIdx === 0) categoryScores.skills.analytical++
          else if (answerIdx === 1) categoryScores.skills.creative++
          else if (answerIdx === 2) categoryScores.skills.communication++
          else if (answerIdx === 3) categoryScores.skills.technical++
          else categoryScores.skills.organizational++
          break
        case "values":
          if (answerIdx === 0) categoryScores.values.money++
          else if (answerIdx === 1) categoryScores.values.creativity++
          else if (answerIdx === 2) categoryScores.values.helping++
          else if (answerIdx === 3) categoryScores.values.stability++
          else categoryScores.values.growth++
          break
      }
    })

    // Determine personality type
    const personalityType = Object.entries(categoryScores.personality).sort(([, a], [, b]) => b - a)[0][0]

    // Determine top interests
    const topInterests = Object.entries(categoryScores.interests)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 2)
      .map(([interest]) => interest)

    // Determine top skills
    const topSkills = Object.entries(categoryScores.skills)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 2)
      .map(([skill]) => skill)

    // Determine top values
    const topValues = Object.entries(categoryScores.values)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 2)
      .map(([value]) => value)

    // Generate career recommendations based on profile
    const recommendedCareers: RecommendedCareer[] = []

    if (topInterests.includes("tech") && topSkills.includes("technical")) {
      recommendedCareers.push({
        title: "Frontend Developer",
        match: 95,
        description: "Создание пользовательских интерфейсов веб-приложений",
        averageSalary: "3,000 - 5,000 TJS",
        growth: "+25%",
        location: "Душанбе, Удаленно",
        skills: ["JavaScript", "React", "HTML/CSS", "TypeScript"],
        companies: ["TechCorp", "DigitalStudio", "WebSolutions"],
      })
    }

    if (topInterests.includes("creative") && topSkills.includes("creative")) {
      recommendedCareers.push({
        title: "UX/UI Designer",
        match: 90,
        description: "Проектирование пользовательского опыта и интерфейсов",
        averageSalary: "2,500 - 4,000 TJS",
        growth: "+20%",
        location: "Душанбе, Удаленно",
        skills: ["Figma", "Adobe XD", "Prototyping", "User Research"],
        companies: ["DesignStudio", "CreativeAgency", "UXLab"],
      })
    }

    if (topInterests.includes("analytical") && topSkills.includes("analytical")) {
      recommendedCareers.push({
        title: "Data Analyst",
        match: 88,
        description: "Анализ данных для принятия бизнес-решений",
        averageSalary: "2,800 - 4,200 TJS",
        growth: "+30%",
        location: "Душанбе",
        skills: ["Python", "SQL", "Excel", "Tableau"],
        companies: ["DataInsights", "Analytics Pro", "BusinessIntel"],
      })
    }

    if (topInterests.includes("people") && topSkills.includes("communication")) {
      recommendedCareers.push({
        title: "Project Manager",
        match: 85,
        description: "Управление проектами и координация команд",
        averageSalary: "3,200 - 4,800 TJS",
        growth: "+15%",
        location: "Душанбе",
        skills: ["Agile", "Scrum", "Leadership", "Communication"],
        companies: ["ProjectCorp", "ManagementPro", "TeamLead"],
      })
    }

    if (topInterests.includes("management") && topSkills.includes("organizational")) {
      recommendedCareers.push({
        title: "Marketing Manager",
        match: 82,
        description: "Разработка и реализация маркетинговых стратегий",
        averageSalary: "2,500 - 3,800 TJS",
        growth: "+18%",
        location: "Душанбе",
        skills: ["Digital Marketing", "Analytics", "Strategy", "Creativity"],
        companies: ["MarketingHub", "BrandStudio", "DigitalAgency"],
      })
    }

    // Ensure we have at least 3 recommendations
    if (recommendedCareers.length < 3) {
      recommendedCareers.push({
        title: "Business Analyst",
        match: 75,
        description: "Анализ бизнес-процессов и требований",
        averageSalary: "2,600 - 3,600 TJS",
        growth: "+12%",
        location: "Душанбе",
        skills: ["Analysis", "Documentation", "Process Mapping", "SQL"],
        companies: ["BusinessCorp", "ConsultingPro", "AnalyticsFirm"],
      })
    }

    const score = Math.round((Object.keys(answers).length / questions.length) * 100)

    return {
      personality: personalityType,
      interests: topInterests,
      skills: topSkills,
      values: topValues,
      recommendedCareers: recommendedCareers.slice(0, 5),
      score,
    }
  }

  const handleAnswer = (questionId: number, answerIndex: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answerIndex }))
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Test completed, analyze results
      const result = analyzeResults()
      setTestResult(result)
      setCurrentStep("results")
    }
  }

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const restartTest = () => {
    setCurrentStep("intro")
    setCurrentQuestion(0)
    setAnswers({})
    setTestResult(null)
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100

  if (currentStep === "intro") {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Тест профориентации</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Пройдите наш научно обоснованный тест, чтобы узнать, какие профессии подходят именно вам
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="text-center">
              <CardContent className="pt-6">
                <Brain className="h-12 w-12 mx-auto mb-4 text-blue-500" />
                <h3 className="font-semibold mb-2">Анализ личности</h3>
                <p className="text-sm text-muted-foreground">Определим ваш психологический тип</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <Target className="h-12 w-12 mx-auto mb-4 text-green-500" />
                <h3 className="font-semibold mb-2">Интересы</h3>
                <p className="text-sm text-muted-foreground">Выявим ваши профессиональные предпочтения</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <Award className="h-12 w-12 mx-auto mb-4 text-purple-500" />
                <h3 className="font-semibold mb-2">Навыки</h3>
                <p className="text-sm text-muted-foreground">Оценим ваши сильные стороны</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <TrendingUp className="h-12 w-12 mx-auto mb-4 text-orange-500" />
                <h3 className="font-semibold mb-2">Рекомендации</h3>
                <p className="text-sm text-muted-foreground">Получите персональные советы по карьере</p>
              </CardContent>
            </Card>
          </div>

          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-center">Готовы начать?</CardTitle>
              <CardDescription className="text-center">
                Тест займет около 5-7 минут. Отвечайте честно для получения точных результатов.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    5-7 минут
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {questions.length} вопросов
                  </div>
                  <div className="flex items-center gap-1">
                    <Briefcase className="h-4 w-4" />
                    Персональные рекомендации
                  </div>
                </div>
                <Button size="lg" onClick={() => setCurrentStep("test")} className="w-full max-w-xs">
                  Начать тест
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (currentStep === "test") {
    const currentQ = questions[currentQuestion]
    const currentAnswer = answers[currentQ.id]

    return (
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold">Тест профориентации</h1>
              <span className="text-sm text-muted-foreground">
                {currentQuestion + 1} из {questions.length}
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">{currentQ.text}</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={currentAnswer}
                onValueChange={(value) => handleAnswer(currentQ.id, value)}
                className="space-y-3"
              >
                {currentQ.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                    <Label
                      htmlFor={`option-${index}`}
                      className="flex-1 cursor-pointer p-3 rounded-lg hover:bg-accent transition-colors"
                    >
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>

          <div className="flex justify-between mt-8">
            <Button variant="outline" onClick={prevQuestion} disabled={currentQuestion === 0}>
              <ChevronLeft className="h-4 w-4 mr-2" />
              Назад
            </Button>
            <Button onClick={nextQuestion} disabled={!currentAnswer}>
              {currentQuestion === questions.length - 1 ? "Завершить тест" : "Далее"}
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (currentStep === "results" && testResult) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Ваши результаты готовы!</h1>
            <p className="text-muted-foreground">
              Мы проанализировали ваши ответы и подготовили персональные рекомендации
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Results Summary */}
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5" />
                    Ваш профиль
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">Тип личности</Label>
                    <p className="text-lg font-semibold capitalize">{testResult.personality}</p>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Основные интересы</Label>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {testResult.interests.map((interest) => (
                        <Badge key={interest} variant="secondary">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Сильные навыки</Label>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {testResult.skills.map((skill) => (
                        <Badge key={skill} variant="outline">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Ценности</Label>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {testResult.values.map((value) => (
                        <Badge key={value} variant="default">
                          {value}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5" />
                    Рекомендации
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <p className="font-medium mb-1">💡 Развитие навыков</p>
                    <p className="text-muted-foreground">
                      Сосредоточьтесь на развитии ваших сильных сторон в области {testResult.skills[0]}
                    </p>
                  </div>
                  <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <p className="font-medium mb-1">🎯 Карьерный путь</p>
                    <p className="text-muted-foreground">
                      Рассмотрите возможности в сфере {testResult.interests[0]} для максимального удовлетворения от
                      работы
                    </p>
                  </div>
                  <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <p className="font-medium mb-1">📚 Обучение</p>
                    <p className="text-muted-foreground">Изучите онлайн-курсы по рекомендованным профессиям</p>
                  </div>
                </CardContent>
              </Card>

              <Button onClick={restartTest} variant="outline" className="w-full">
                <RotateCcw className="h-4 w-4 mr-2" />
                Пройти тест заново
              </Button>
            </div>

            {/* Career Recommendations */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-6">Рекомендуемые профессии</h2>
              <div className="space-y-4">
                {testResult.recommendedCareers.map((career, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-xl font-semibold">{career.title}</h3>
                            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                              {career.match}% совпадение
                            </Badge>
                          </div>
                          <p className="text-muted-foreground mb-3">{career.description}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                          <span>{career.averageSalary}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <TrendingUp className="h-4 w-4 text-muted-foreground" />
                          <span>{career.growth} рост</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{career.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-muted-foreground" />
                          <span>Высокий спрос</span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <Label className="text-sm font-medium">Необходимые навыки:</Label>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {career.skills.map((skill) => (
                              <Badge key={skill} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <Label className="text-sm font-medium">Компании-работодатели:</Label>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {career.companies.map((company) => (
                              <Badge key={company} variant="outline" className="text-xs">
                                {company}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2 mt-4">
                        <Button className="flex-1">Найти вакансии</Button>
                        <Button variant="outline">
                          <BookOpen className="h-4 w-4 mr-1" />
                          Курсы
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="mt-8">
                <CardHeader>
                  <CardTitle>Следующие шаги</CardTitle>
                  <CardDescription>Рекомендации для развития вашей карьеры</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                        1
                      </div>
                      <div>
                        <h4 className="font-medium">Изучите рынок труда</h4>
                        <p className="text-sm text-muted-foreground">
                          Посмотрите актуальные вакансии в рекомендованных сферах
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                        2
                      </div>
                      <div>
                        <h4 className="font-medium">Развивайте навыки</h4>
                        <p className="text-sm text-muted-foreground">Пройдите онлайн-курсы по ключевым компетенциям</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                        3
                      </div>
                      <div>
                        <h4 className="font-medium">Создайте резюме</h4>
                        <p className="text-sm text-muted-foreground">
                          Используйте наш конструктор резюме с AI-помощником
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                        4
                      </div>
                      <div>
                        <h4 className="font-medium">Начните поиск</h4>
                        <p className="text-sm text-muted-foreground">
                          Откликайтесь на вакансии и развивайте профессиональную сеть
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return null
}
