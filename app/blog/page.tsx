"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Clock,
  User,
  TrendingUp,
  BookOpen,
  Briefcase,
  GraduationCap,
  Target,
  Calendar,
  Eye,
  MessageCircle,
  Share2,
} from "lucide-react"

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const featuredPost = {
    title: "Будущее работы в Таджикистане: тренды 2024 года",
    excerpt: "Анализ развития рынка труда, новых профессий и изменений в требованиях работодателей",
    author: "Команда Joikor",
    date: "15 мая 2024",
    readTime: "8 мин",
    views: 1250,
    comments: 23,
    category: "Тренды",
    image: "/placeholder.svg?height=400&width=800",
    featured: true,
  }

  const blogPosts = [
    {
      id: 1,
      title: "Как составить резюме, которое заметят",
      excerpt: "Практические советы по созданию эффективного резюме для соискателей в Таджикистане",
      author: "Алишер Каримов",
      date: "12 мая 2024",
      readTime: "5 мин",
      views: 890,
      comments: 15,
      category: "Резюме",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 2,
      title: "Топ-10 IT-компаний Душанбе",
      excerpt: "Обзор ведущих технологических компаний столицы и их требования к кандидатам",
      author: "Мадина Рахимова",
      date: "10 мая 2024",
      readTime: "7 мин",
      views: 1120,
      comments: 28,
      category: "Компании",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 3,
      title: "Удаленная работа в Таджикистане: возможности и вызовы",
      excerpt: "Как найти удаленную работу и что нужно знать о работе из дома",
      author: "Фарход Назаров",
      date: "8 мая 2024",
      readTime: "6 мин",
      views: 756,
      comments: 19,
      category: "Удаленная работа",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 4,
      title: "Навыки будущего: что изучать в 2024 году",
      excerpt: "Анализ самых востребованных навыков на рынке труда Таджикистана",
      author: "Зарина Юсупова",
      date: "5 мая 2024",
      readTime: "9 мин",
      views: 1340,
      comments: 31,
      category: "Навыки",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 5,
      title: "Как пройти собеседование: гид для соискателей",
      excerpt: "Подготовка к собеседованию, типичные вопросы и советы по самопрезентации",
      author: "Джамшед Холов",
      date: "3 мая 2024",
      readTime: "10 мин",
      views: 980,
      comments: 22,
      category: "Собеседование",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 6,
      title: "Женщины в IT: истории успеха из Таджикистана",
      excerpt: "Интервью с успешными женщинами-программистами и их советы начинающим",
      author: "Нигора Саидова",
      date: "1 мая 2024",
      readTime: "12 мин",
      views: 1450,
      comments: 35,
      category: "Истории успеха",
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  const categories = [
    { name: "Все", count: 156, icon: BookOpen },
    { name: "Карьера", count: 45, icon: TrendingUp },
    { name: "Резюме", count: 23, icon: User },
    { name: "Собеседование", count: 18, icon: MessageCircle },
    { name: "Навыки", count: 32, icon: Target },
    { name: "Компании", count: 15, icon: Briefcase },
    { name: "Образование", count: 23, icon: GraduationCap },
  ]

  const popularTags = [
    "IT",
    "Программирование",
    "Дизайн",
    "Маркетинг",
    "Продажи",
    "Менеджмент",
    "Стартапы",
    "Фриланс",
    "Удаленная работа",
    "Карьера",
  ]

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Блог Joikor</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Полезные статьи о карьере, поиске работы и профессиональном развитии в Таджикистане
          </p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Поиск статей..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Categories */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Категории</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {categories.map((category) => {
                    const IconComponent = category.icon
                    return (
                      <Button key={category.name} variant="ghost" className="w-full justify-between">
                        <div className="flex items-center gap-2">
                          <IconComponent className="h-4 w-4" />
                          <span>{category.name}</span>
                        </div>
                        <Badge variant="secondary">{category.count}</Badge>
                      </Button>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Popular Tags */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Популярные теги</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map((tag) => (
                    <Badge key={tag} variant="outline" className="cursor-pointer hover:bg-accent">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Newsletter */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Подписка на новости</CardTitle>
                <CardDescription>Получайте новые статьи на email</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Input placeholder="Ваш email" type="email" />
                  <Button className="w-full">Подписаться</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Featured Post */}
            <Card className="mb-8 overflow-hidden">
              <div className="aspect-video bg-muted"></div>
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-primary">Рекомендуемое</Badge>
                  <Badge variant="outline">{featuredPost.category}</Badge>
                </div>
                <CardTitle className="text-2xl hover:text-primary cursor-pointer transition-colors">
                  {featuredPost.title}
                </CardTitle>
                <CardDescription className="text-base">{featuredPost.excerpt}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {featuredPost.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {featuredPost.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {featuredPost.readTime}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      {featuredPost.views}
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="h-4 w-4" />
                      {featuredPost.comments}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Blog Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {blogPosts.map((post) => (
                <Card key={post.id} className="hover:shadow-lg transition-shadow">
                  <div className="aspect-video bg-muted rounded-t-lg"></div>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline">{post.category}</Badge>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {post.readTime}
                      </div>
                    </div>
                    <CardTitle className="text-lg hover:text-primary cursor-pointer transition-colors line-clamp-2">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2">{post.excerpt}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {post.author}
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          {post.views}
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="h-4 w-4" />
                          {post.comments}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-sm text-muted-foreground">{post.date}</span>
                      <Button variant="ghost" size="sm">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-8">
              <Button variant="outline" size="lg">
                Загрузить больше статей
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
