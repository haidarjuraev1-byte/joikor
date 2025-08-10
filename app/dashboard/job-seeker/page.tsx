import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Eye, FileText, MessageSquare, Star } from "lucide-react"
import Link from "next/link"

export default function JobSeekerDashboard() {
  // Mock data
  const profileCompleteness = 65
  const profileViews = 24
  const responseRate = 18
  const subscription = "Бесплатный"

  const suggestedJobs = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "TechCorp",
      location: "Душанбе",
      salary: "2,500 - 3,500 TJS",
      posted: "2 дня назад",
      match: 95,
    },
    {
      id: 2,
      title: "UX/UI Designer",
      company: "DesignStudio",
      location: "Удаленно",
      salary: "2,000 - 3,000 TJS",
      posted: "1 день назад",
      match: 87,
    },
    {
      id: 3,
      title: "React Developer",
      company: "WebSolutions",
      location: "Душанбе",
      salary: "3,000 - 4,000 TJS",
      posted: "3 дня назад",
      match: 82,
    },
  ]

  const recentApplications = [
    {
      id: 1,
      title: "Web Developer",
      company: "TajTech",
      status: "На рассмотрении",
      appliedDate: "15.05.2024",
    },
    {
      id: 2,
      title: "Frontend Engineer",
      company: "Digital Solutions",
      status: "Просмотрено",
      appliedDate: "12.05.2024",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Личный кабинет</h1>
        <Link href="/resume-builder">
          <Button>
            <FileText className="mr-2 h-4 w-4" />
            Создать резюме
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Профиль</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{profileCompleteness}%</div>
            <Progress value={profileCompleteness} className="h-2 mt-2" />
            <p className="text-xs text-muted-foreground mt-2">Заполните профиль для лучших результатов</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Просмотры</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{profileViews}</div>
            <p className="text-xs text-muted-foreground mt-2">За последние 30 дней</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Отклики</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{responseRate}%</div>
            <p className="text-xs text-muted-foreground mt-2">Процент ответов на ваши заявки</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Тариф</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{subscription}</div>
            <p className="text-xs text-muted-foreground mt-2">
              <Link href="/pricing" className="text-primary hover:underline">
                Улучшить тариф
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="suggested">
        <TabsList>
          <TabsTrigger value="suggested">Рекомендуемые вакансии</TabsTrigger>
          <TabsTrigger value="applications">Последние отклики</TabsTrigger>
        </TabsList>
        <TabsContent value="suggested" className="space-y-4 pt-4">
          {suggestedJobs.map((job) => (
            <Card key={job.id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold hover:text-primary cursor-pointer transition-colors">{job.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {job.company} • {job.location}
                    </p>
                    <p className="text-sm mt-1">{job.salary}</p>
                    <p className="text-xs text-muted-foreground mt-1">Опубликовано: {job.posted}</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                    {job.match}% совпадение
                  </Badge>
                </div>
                <div className="flex justify-end mt-4 space-x-2">
                  <Button variant="outline" size="sm">
                    Сохранить
                  </Button>
                  <Button size="sm">Откликнуться</Button>
                </div>
              </CardContent>
            </Card>
          ))}
          <div className="text-center">
            <Button variant="outline">Показать больше вакансий</Button>
          </div>
        </TabsContent>
        <TabsContent value="applications" className="space-y-4 pt-4">
          {recentApplications.map((application) => (
            <Card key={application.id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold hover:text-primary cursor-pointer transition-colors">
                      {application.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{application.company}</p>
                    <p className="text-xs text-muted-foreground mt-1">Отклик от: {application.appliedDate}</p>
                  </div>
                  <Badge variant="outline">{application.status}</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
          <div className="text-center">
            <Link href="/dashboard/job-seeker/applications">
              <Button variant="outline">Все отклики</Button>
            </Link>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
