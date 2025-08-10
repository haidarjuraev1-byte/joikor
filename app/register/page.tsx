"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BellIcon as BrandTelegram, Mail } from "lucide-react"
import OnboardingWizard from "@/components/onboarding-wizard"

export default function RegisterPage() {
  const router = useRouter()
  const [registerMethod, setRegisterMethod] = useState<"email" | "phone" | "telegram">("email")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showOnboarding, setShowOnboarding] = useState(false)

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, we would validate and submit the form data
    // For now, we'll just show the onboarding wizard
    setShowOnboarding(true)
  }

  const handleOnboardingComplete = (userData: any) => {
    // In a real app, we would save the user data and redirect to the appropriate dashboard
    console.log("Onboarding data:", userData)

    // Redirect based on user type
    if (userData.userType === "jobSeeker") {
      router.push("/dashboard/job-seeker")
    } else {
      router.push("/dashboard/employer")
    }
  }

  return (
    <div className="container mx-auto py-10 px-4 flex items-center justify-center min-h-[calc(100vh-4rem)]">
      {showOnboarding ? (
        <OnboardingWizard onComplete={handleOnboardingComplete} />
      ) : (
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Создайте аккаунт</CardTitle>
            <CardDescription>Выберите способ регистрации для доступа к платформе Joikor</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="email" className="w-full" onValueChange={(value) => setRegisterMethod(value as any)}>
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="email">Email</TabsTrigger>
                <TabsTrigger value="phone">Телефон</TabsTrigger>
                <TabsTrigger value="telegram">Telegram</TabsTrigger>
              </TabsList>

              <TabsContent value="email">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Пароль</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Подтвердите пароль</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Зарегистрироваться
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="phone">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Номер телефона</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+992 XXX XX XX XX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Получить код
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="telegram">
                <div className="flex flex-col items-center justify-center py-6 space-y-4">
                  <BrandTelegram className="h-16 w-16 text-blue-500" />
                  <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                    Нажмите кнопку ниже, чтобы продолжить регистрацию через Telegram
                  </p>
                  <Button onClick={handleRegister} className="w-full bg-blue-500 hover:bg-blue-600">
                    Войти через Telegram
                  </Button>
                </div>
              </TabsContent>

              <div className="mt-4 text-center text-sm">
                <p>
                  Уже есть аккаунт?{" "}
                  <Link href="/login" className="text-primary hover:underline">
                    Войти
                  </Link>
                </p>
              </div>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Или войти через</span>
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button variant="outline" className="w-full">
                    <Mail className="mr-2 h-4 w-4" />
                    Google
                  </Button>
                </div>
              </div>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
