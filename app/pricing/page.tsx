"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check, X } from "lucide-react"

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly")

  const pricingPlans = {
    jobSeeker: [
      {
        name: "Бесплатный",
        price: {
          monthly: "0",
          yearly: "0",
        },
        description: "Базовые функции для начала поиска работы",
        features: [
          "Создание 1 резюме",
          "До 5 откликов в день",
          "Базовый поиск вакансий",
          "Просмотр контактов работодателей",
          "Поддержка по email",
        ],
        limitations: [
          "Ограниченная видимость резюме",
          "Без приоритета в поиске",
          "Без AI-помощника",
          "Без аналитики профиля",
        ],
        buttonText: "Начать бесплатно",
        popular: false,
      },
      {
        name: "Бизнес",
        price: {
          monthly: "150",
          yearly: "1500",
        },
        description: "Расширенные возможности для активного поиска работы",
        features: [
          "Неограниченное количество резюме",
          "Неограниченное количество откликов",
          "Приоритет в поиске",
          "Расширенная аналитика",
          "AI-помощник для резюме",
          "Скрытие резюме от текущего работодателя",
          "Приоритетная поддержка",
          "Полный доступ к контактам работодателей",
        ],
        limitations: [],
        buttonText: "Выбрать план",
        popular: true,
      },
    ],
    employer: [
      {
        name: "HR+",
        price: {
          monthly: "500",
          yearly: "5000",
        },
        description: "Полный набор инструментов для эффективного найма",
        features: [
          "Неограниченное количество вакансий",
          "Полный доступ к базе резюме",
          "Умный поиск кандидатов",
          "Аналитика вакансий",
          "Брендинг компании",
          "Приоритетное продвижение вакансий",
          "Персональный менеджер",
          "Массовое приглашение кандидатов",
          "Интеграция с HR-системами",
        ],
        limitations: [],
        buttonText: "Для бизнеса",
        popular: false,
      },
    ],
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">Тарифные планы</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Выберите подходящий тариф для максимально эффективного использования платформы Joikor
        </p>
      </div>

      <div className="flex justify-center mb-10">
        <Tabs defaultValue="jobSeeker" className="w-full max-w-md">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="jobSeeker">Для соискателей</TabsTrigger>
            <TabsTrigger value="employer">Для работодателей</TabsTrigger>
          </TabsList>

          <div className="mt-8 flex justify-center">
            <div className="flex items-center space-x-2 rounded-lg border p-1">
              <Button
                variant={billingCycle === "monthly" ? "default" : "ghost"}
                size="sm"
                onClick={() => setBillingCycle("monthly")}
              >
                Ежемесячно
              </Button>
              <Button
                variant={billingCycle === "yearly" ? "default" : "ghost"}
                size="sm"
                onClick={() => setBillingCycle("yearly")}
              >
                Ежегодно
                <span className="ml-1 rounded-full bg-primary/20 px-2 py-0.5 text-xs font-medium text-primary">
                  -20%
                </span>
              </Button>
            </div>
          </div>

          <TabsContent value="jobSeeker" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              {pricingPlans.jobSeeker.map((plan) => (
                <Card key={plan.name} className={`flex flex-col ${plan.popular ? "border-primary shadow-md" : ""}`}>
                  {plan.popular && (
                    <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-0">
                      <span className="inline-block rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                        Популярный
                      </span>
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle>{plan.name}</CardTitle>
                    <div className="mt-4 flex items-baseline text-5xl font-extrabold">
                      {plan.price[billingCycle]} <span className="ml-1 text-2xl font-medium">TJS</span>
                      <span className="ml-2 text-sm font-medium text-muted-foreground">
                        /{billingCycle === "monthly" ? "месяц" : "год"}
                      </span>
                    </div>
                    <CardDescription className="mt-4">{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <ul className="space-y-3">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-center">
                          <Check className="mr-2 h-4 w-4 text-green-500" />
                          <span>{feature}</span>
                        </li>
                      ))}
                      {plan.limitations.map((limitation) => (
                        <li key={limitation} className="flex items-center text-muted-foreground">
                          <X className="mr-2 h-4 w-4 text-red-500" />
                          <span>{limitation}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className={`w-full ${plan.popular ? "bg-primary" : ""}`}>{plan.buttonText}</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="employer" className="mt-6">
            <div className="flex justify-center">
              {pricingPlans.employer.map((plan) => (
                <Card key={plan.name} className="flex flex-col max-w-md w-full">
                  <CardHeader>
                    <CardTitle>{plan.name}</CardTitle>
                    <div className="mt-4 flex items-baseline text-5xl font-extrabold">
                      {plan.price[billingCycle]} <span className="ml-1 text-2xl font-medium">TJS</span>
                      <span className="ml-2 text-sm font-medium text-muted-foreground">
                        /{billingCycle === "monthly" ? "месяц" : "год"}
                      </span>
                    </div>
                    <CardDescription className="mt-4">{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <ul className="space-y-3">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-center">
                          <Check className="mr-2 h-4 w-4 text-green-500" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">{plan.buttonText}</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Часто задаваемые вопросы</h2>
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="bg-muted rounded-lg p-4 text-left">
            <h3 className="font-semibold mb-2">Могу ли я сменить тариф в любое время?</h3>
            <p className="text-muted-foreground">
              Да, вы можете изменить свой тарифный план в любое время. Изменения вступят в силу немедленно, а оплата
              будет пересчитана пропорционально оставшемуся периоду.
            </p>
          </div>
          <div className="bg-muted rounded-lg p-4 text-left">
            <h3 className="font-semibold mb-2">Как происходит оплата?</h3>
            <p className="text-muted-foreground">
              Мы принимаем оплату банковскими картами, через мобильные кошельки и банковским переводом. Для юридических
              лиц доступна оплата по счету.
            </p>
          </div>
          <div className="bg-muted rounded-lg p-4 text-left">
            <h3 className="font-semibold mb-2">Есть ли пробный период?</h3>
            <p className="text-muted-foreground">
              Для тарифа "Бизнес" доступен 7-дневный пробный период. Для корпоративных клиентов возможны индивидуальные
              условия.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
