"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Briefcase, Building, ChevronLeft, ChevronRight, CheckCircle } from "lucide-react"

interface OnboardingWizardProps {
  onComplete: (userData: any) => void
}

export default function OnboardingWizard({ onComplete }: OnboardingWizardProps) {
  const [step, setStep] = useState(1)
  const [userData, setUserData] = useState({
    userType: "",
    lookingFor: [],
    region: "",
    industry: "",
    experience: "",
    referralSource: "",
  })

  const totalSteps = 5
  const progress = (step / totalSteps) * 100

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1)
    } else {
      onComplete(userData)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const updateUserData = (field: string, value: any) => {
    setUserData({ ...userData, [field]: value })
  }

  const handleCheckboxChange = (value: string) => {
    const currentValues = userData.lookingFor as string[]
    const newValues = currentValues.includes(value)
      ? currentValues.filter((item) => item !== value)
      : [...currentValues, value]

    updateUserData("lookingFor", newValues)
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Настройка профиля</CardTitle>
        <CardDescription>Расскажите нам о себе, чтобы мы могли персонализировать ваш опыт</CardDescription>
        <Progress value={progress} className="h-2 mt-4" />
      </CardHeader>
      <CardContent>
        {step === 1 && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Кто вы?</h3>
            <RadioGroup
              value={userData.userType}
              onValueChange={(value) => updateUserData("userType", value)}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div>
                <RadioGroupItem value="jobSeeker" id="jobSeeker" className="peer sr-only" />
                <Label
                  htmlFor="jobSeeker"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <Briefcase className="mb-3 h-10 w-10" />
                  <div className="text-center">
                    <p className="font-medium">Соискатель</p>
                    <p className="text-sm text-muted-foreground">Я ищу работу или хочу создать резюме</p>
                  </div>
                </Label>
              </div>
              <div>
                <RadioGroupItem value="employer" id="employer" className="peer sr-only" />
                <Label
                  htmlFor="employer"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <Building className="mb-3 h-10 w-10" />
                  <div className="text-center">
                    <p className="font-medium">Работодатель</p>
                    <p className="text-sm text-muted-foreground">Я ищу сотрудников или хочу разместить вакансию</p>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Что вы ищете?</h3>
            {userData.userType === "jobSeeker" ? (
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="fullTime"
                    checked={userData.lookingFor.includes("fullTime")}
                    onCheckedChange={() => handleCheckboxChange("fullTime")}
                  />
                  <label
                    htmlFor="fullTime"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Полная занятость
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="partTime"
                    checked={userData.lookingFor.includes("partTime")}
                    onCheckedChange={() => handleCheckboxChange("partTime")}
                  />
                  <label
                    htmlFor="partTime"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Частичная занятость
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remote"
                    checked={userData.lookingFor.includes("remote")}
                    onCheckedChange={() => handleCheckboxChange("remote")}
                  />
                  <label
                    htmlFor="remote"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Удаленная работа
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="internship"
                    checked={userData.lookingFor.includes("internship")}
                    onCheckedChange={() => handleCheckboxChange("internship")}
                  />
                  <label
                    htmlFor="internship"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Стажировка
                  </label>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="permanent"
                    checked={userData.lookingFor.includes("permanent")}
                    onCheckedChange={() => handleCheckboxChange("permanent")}
                  />
                  <label
                    htmlFor="permanent"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Постоянные сотрудники
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="temporary"
                    checked={userData.lookingFor.includes("temporary")}
                    onCheckedChange={() => handleCheckboxChange("temporary")}
                  />
                  <label
                    htmlFor="temporary"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Временные сотрудники
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="contractors"
                    checked={userData.lookingFor.includes("contractors")}
                    onCheckedChange={() => handleCheckboxChange("contractors")}
                  />
                  <label
                    htmlFor="contractors"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Подрядчики
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="interns"
                    checked={userData.lookingFor.includes("interns")}
                    onCheckedChange={() => handleCheckboxChange("interns")}
                  />
                  <label
                    htmlFor="interns"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Стажеры
                  </label>
                </div>
              </div>
            )}
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Регион и отрасль</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="region">Регион</Label>
                <Select value={userData.region} onValueChange={(value) => updateUserData("region", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите регион" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dushanbe">Душанбе</SelectItem>
                    <SelectItem value="khujand">Худжанд</SelectItem>
                    <SelectItem value="kulob">Куляб</SelectItem>
                    <SelectItem value="bokhtar">Бохтар</SelectItem>
                    <SelectItem value="khorog">Хорог</SelectItem>
                    <SelectItem value="other">Другой</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="industry">Отрасль</Label>
                <Select value={userData.industry} onValueChange={(value) => updateUserData("industry", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите отрасль" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="it">IT и разработка</SelectItem>
                    <SelectItem value="medicine">Медицина</SelectItem>
                    <SelectItem value="education">Образование</SelectItem>
                    <SelectItem value="finance">Финансы</SelectItem>
                    <SelectItem value="retail">Розничная торговля</SelectItem>
                    <SelectItem value="construction">Строительство</SelectItem>
                    <SelectItem value="other">Другое</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {userData.userType === "jobSeeker" && (
                <div className="space-y-2">
                  <Label htmlFor="experience">Опыт работы</Label>
                  <Select value={userData.experience} onValueChange={(value) => updateUserData("experience", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите опыт работы" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="student">Студент/без опыта</SelectItem>
                      <SelectItem value="junior">До 1 года</SelectItem>
                      <SelectItem value="middle">1-3 года</SelectItem>
                      <SelectItem value="senior">3-5 лет</SelectItem>
                      <SelectItem value="expert">Более 5 лет</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Откуда вы узнали о Joikor?</h3>
            <div className="space-y-2">
              <Label htmlFor="referralSource">Источник</Label>
              <Select
                value={userData.referralSource}
                onValueChange={(value) => updateUserData("referralSource", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Выберите источник" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="socialMedia">Социальные сети</SelectItem>
                  <SelectItem value="telegram">Telegram</SelectItem>
                  <SelectItem value="friends">От друзей</SelectItem>
                  <SelectItem value="google">Google</SelectItem>
                  <SelectItem value="other">Другое</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-6 text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
            <h3 className="text-lg font-medium">Готово!</h3>
            <p className="text-muted-foreground">
              Спасибо за заполнение профиля. Теперь мы можем предложить вам персонализированный опыт на платформе
              Joikor.
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={handleBack} disabled={step === 1}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Назад
        </Button>
        <Button onClick={handleNext}>
          {step === totalSteps ? (
            "Завершить"
          ) : (
            <>
              Далее
              <ChevronRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
