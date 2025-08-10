"use client"

import { useLocale } from "@/contexts/locale-context"

export function useTranslation() {
  const { locale, setLocale, t } = useLocale()

  return {
    t,
    locale,
    setLocale,
    changeLanguage: setLocale,
    availableLocales: ["ru", "tg", "en"] as const,
  }
}

// Helper function for static translations (for use in server components)
export function getStaticTranslation(locale = "ru") {
  // Import translation files statically
  const ruTranslations = require("@/locales/ru.json")
  const tgTranslations = require("@/locales/tg.json")
  const enTranslations = require("@/locales/en.json")

  const translations = {
    ru: ruTranslations,
    tg: tgTranslations,
    en: enTranslations,
  }

  const validLocale = (locale in translations ? locale : "ru") as keyof typeof translations

  return (key: string, params?: Record<string, string | number>): string => {
    const keys = key.split(".")
    let value: any = translations[validLocale]

    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k]
      } else {
        // Fallback to Russian if key not found
        value = translations.ru
        for (const fallbackKey of keys) {
          if (value && typeof value === "object" && fallbackKey in value) {
            value = value[fallbackKey]
          } else {
            return key
          }
        }
        break
      }
    }

    if (typeof value !== "string") {
      return key
    }

    // Replace parameters in the string
    if (params) {
      return value.replace(/\{(\w+)\}/g, (match, paramKey) => {
        return params[paramKey]?.toString() || match
      })
    }

    return value
  }
}
