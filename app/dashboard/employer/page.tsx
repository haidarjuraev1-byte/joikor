import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, Briefcase, Eye, Users } from "lucide-react"
import Link from "next/link"

export default function EmployerDashboard() {
  // Mock data
  const activeJobs = 3
  const totalCandidates = 47
  const viewRate = 78
  const subscription = "Бизнес"

  const recentJobs = [
    {
      id: 1,
      title: "Frontend Developer",
      location: "Душанбе",
      posted: "5 дней назад",
      applicants: 12,
      views: 156,
    },
    {
      id: 2,
      title: "UX/UI Designer",
      location: "Удаленно",
      posted: "3 дня назад",
      applicants: 8,
      views: 98,
    },
    {
      id: 3,
      title: "Project Manager",
      location: "Душанбе",
      posted: "1 день назад",
      applicants: 3,
      views: 45,
    },
  ]

  const recentCandidates = [
    {
      id: 1,
      name: "Алишер Каримов",
      position: "Frontend Developer",
      experience: "3 года",
      match: 92,
      appliedDate: "15.05.2024",
    },
    {
      id: 2,
      name: "Мадина Рахимова",
      position: "UX/UI Designer",
      experience: "2 года",
      match: 87,
      appliedDate: "14.05.2024",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Панель работодателя</h1>
        <Link href="/post-job">
          <Button>
            <Briefcase className="mr-2 h-4 w-4" />
            Разместить вакансию
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Активные вакансии</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeJobs}</div>
            <p className="text-xs text-muted-foreground mt-2">
              <Link href="/dashboard/employer/jobs" className="text-primary hover:underline">
                Управление вакансиями
              </Link>
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Кандидаты</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCandidates}</div>
            <p className="text-xs text-muted-foreground mt-2">Всего откликов на ваши вакансии</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Просмотры</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{viewRate}%</div>
            <p className="text-xs text-muted-foreground mt-2">Средний показатель просмотров</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Тариф</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
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

      <Tabs defaultValue="jobs">
        <TabsList>
          <TabsTrigger value="jobs">Мои вакансии</TabsTrigger>
          <TabsTrigger value="candidates">Последние кандидаты</TabsTrigger>
        </TabsList>
        <TabsContent value="jobs" className="space-y-4 pt-4">
          {recentJobs.map((job) => (
            <Card key={job.id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold hover:text-primary cursor-pointer transition-colors">{job.title}</h3>
                    <p className="text-sm text-muted-foreground">{job.location}</p>
                    <p className="text-xs text-muted-foreground mt-1">Опубликовано: {job.posted}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Eye className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{job.views}</span>
                    </div>
                    <div className="flex items-center justify-end space-x-2 mt-1">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{job.applicants}</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end mt-4 space-x-2">
                  <Button variant="outline" size="sm">
                    Редактировать
                  </Button>
                  <Button size="sm">Просмотреть кандидатов</Button>
                </div>
              </CardContent>
            </Card>
          ))}
          <div className="text-center">
            <Link href="/dashboard/employer/jobs">
              <Button variant="outline">Все вакансии</Button>
            </Link>
          </div>
        </TabsContent>
        <TabsContent value="candidates" className="space-y-4 pt-4">
          {recentCandidates.map((candidate) => (
            <Card key={candidate.id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold hover:text-primary cursor-pointer transition-colors">
                      {candidate.name}
                    </h3>
                    <p className="text-sm">{candidate.position}</p>
                    <p className="text-xs text-muted-foreground mt-1">Опыт: {candidate.experience}</p>
                    <p className="text-xs text-muted-foreground">Отклик от: {candidate.appliedDate}</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                    {candidate.match}% совпадение
                  </Badge>
                </div>
                <div className="flex justify-end mt-4 space-x-2">
                  <Button variant="outline" size="sm">
                    Отклонить
                  </Button>
                  <Button size="sm">Связаться</Button>
                </div>
              </CardContent>
            </Card>
          ))}
          <div className="text-center">
            <Link href="/dashboard/employer/candidates">
              <Button variant="outline">Все кандидаты</Button>
            </Link>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
