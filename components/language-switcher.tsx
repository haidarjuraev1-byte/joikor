"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Globe } from "lucide-react"
import { useTranslation } from "@/hooks/useTranslation"

const languages = [
  { code: "ru", name: "Русский", flag: "🇷🇺", nativeName: "Русский" },
  { code: "tg", name: "Тоҷикӣ", flag: "🇹🇯", nativeName: "Тоҷикӣ" },
  { code: "en", name: "English", flag: "🇬🇧", nativeName: "English" },
] as const

export function LanguageSwitcher() {
  const { locale, setLocale } = useTranslation()
  const currentLanguage = languages.find((lang) => lang.code === locale) || languages[0]

  const handleLanguageChange = (langCode: "ru" | "tg" | "en") => {
    setLocale(langCode)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center space-x-1 h-9 px-3">
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline text-lg">{currentLanguage.flag}</span>
          <span className="hidden md:inline text-sm font-medium">{currentLanguage.code.toUpperCase()}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[180px]">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className={`flex items-center space-x-3 cursor-pointer p-3 ${
              locale === lang.code ? "bg-accent text-accent-foreground" : ""
            }`}
          >
            <span className="text-lg">{lang.flag}</span>
            <div className="flex flex-col">
              <span className="font-medium text-sm">{lang.nativeName}</span>
              <span className="text-xs text-muted-foreground">{lang.name}</span>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
