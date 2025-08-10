"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Briefcase,
  Building,
  FileText,
  Heart,
  History,
  LayoutDashboard,
  MessageSquare,
  Settings,
  Users,
} from "lucide-react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [userType, setUserType] = useState<"jobSeeker" | "employer">(
    pathname.includes("employer") ? "employer" : "jobSeeker",
  )

  const isActive = (path: string) => {
    return pathname === path
  }

  const handleUserTypeChange = (value: string) => {
    setUserType(value as "jobSeeker" | "employer")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="border-b">
        <div className="container flex h-16 items-center px-4">
          <Tabs value={userType} onValueChange={handleUserTypeChange} className="w-full max-w-xs">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="jobSeeker" asChild>
                <Link href="/dashboard/job-seeker">
                  <Briefcase className="mr-2 h-4 w-4" />
                  Соискатель
                </Link>
              </TabsTrigger>
              <TabsTrigger value="employer" asChild>
                <Link href="/dashboard/employer">
                  <Building className="mr-2 h-4 w-4" />
                  Работодатель
                </Link>
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="ml-auto flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <MessageSquare className="mr-2 h-4 w-4" />
              Сообщения
            </Button>
          </div>
        </div>
      </div>
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr] lg:grid-cols-[250px_1fr] px-4 py-6">
        <aside className="hidden md:block">
          <nav className="grid items-start gap-2">
            {userType === "jobSeeker" ? (
              <>
                <Link href="/dashboard/job-seeker">
                  <Button
                    variant={isActive("/dashboard/job-seeker") ? "default" : "ghost"}
                    className="w-full justify-start"
                  >
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Обзор
                  </Button>
                </Link>
                <Link href="/dashboard/job-seeker/resumes">
                  <Button
                    variant={isActive("/dashboard/job-seeker/resumes") ? "default" : "ghost"}
                    className="w-full justify-start"
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Мои резюме
                  </Button>
                </Link>
                <Link href="/dashboard/job-seeker/saved-jobs">
                  <Button
                    variant={isActive("/dashboard/job-seeker/saved-jobs") ? "default" : "ghost"}
                    className="w-full justify-start"
                  >
                    <Heart className="mr-2 h-4 w-4" />
                    Сохраненные вакансии
                  </Button>
                </Link>
                <Link href="/dashboard/job-seeker/applications">
                  <Button
                    variant={isActive("/dashboard/job-seeker/applications") ? "default" : "ghost"}
                    className="w-full justify-start"
                  >
                    <History className="mr-2 h-4 w-4" />
                    История откликов
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link href="/dashboard/employer">
                  <Button
                    variant={isActive("/dashboard/employer") ? "default" : "ghost"}
                    className="w-full justify-start"
                  >
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Обзор
                  </Button>
                </Link>
                <Link href="/dashboard/employer/jobs">
                  <Button
                    variant={isActive("/dashboard/employer/jobs") ? "default" : "ghost"}
                    className="w-full justify-start"
                  >
                    <Briefcase className="mr-2 h-4 w-4" />
                    Мои вакансии
                  </Button>
                </Link>
                <Link href="/dashboard/employer/candidates">
                  <Button
                    variant={isActive("/dashboard/employer/candidates") ? "default" : "ghost"}
                    className="w-full justify-start"
                  >
                    <Users className="mr-2 h-4 w-4" />
                    Кандидаты
                  </Button>
                </Link>
                <Link href="/dashboard/employer/company">
                  <Button
                    variant={isActive("/dashboard/employer/company") ? "default" : "ghost"}
                    className="w-full justify-start"
                  >
                    <Building className="mr-2 h-4 w-4" />
                    Профиль компании
                  </Button>
                </Link>
              </>
            )}
            <Link href="/dashboard/settings">
              <Button variant={isActive("/dashboard/settings") ? "default" : "ghost"} className="w-full justify-start">
                <Settings className="mr-2 h-4 w-4" />
                Настройки
              </Button>
            </Link>
          </nav>
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">{children}</main>
      </div>
    </div>
  )
}
