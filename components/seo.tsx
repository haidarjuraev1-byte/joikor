"use client"

import Head from "next/head"
import { useRouter } from "next/router"
import { useTranslation } from "@/hooks/useTranslation"

interface SEOProps {
  title?: string
  description?: string
  keywords?: string
  image?: string
  url?: string
  type?: string
  noindex?: boolean
}

export default function SEO({
  title,
  description,
  keywords,
  image = "/og-image.jpg",
  url,
  type = "website",
  noindex = false,
}: SEOProps) {
  const router = useRouter()
  const { t, locale } = useTranslation()

  // Get current URL
  const currentUrl = url || `${process.env.NEXT_PUBLIC_APP_URL || "https://joikor.tj"}${router.asPath}`

  // Get localized meta data
  const siteTitle = "Joikor"
  const pageTitle = title || t("seo.home.title")
  const pageDescription = description || t("seo.home.description")
  const fullTitle = title ? `${title} | ${siteTitle}` : pageTitle

  // Language-specific URLs for hreflang
  const languages = ["ru", "tg", "en"]
  const hreflangs = languages.map((lang) => ({
    lang,
    url: currentUrl.replace(`/${locale}`, `/${lang}`).replace(/^\/\//, "/"),
  }))

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={pageDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="robots" content={noindex ? "noindex,nofollow" : "index,follow"} />

      {/* Language and Region */}
      <meta httpEquiv="content-language" content={locale} />
      <link rel="canonical" href={currentUrl} />

      {/* Hreflang for multilingual SEO */}
      {hreflangs.map(({ lang, url: hrefUrl }) => (
        <link key={lang} rel="alternate" hrefLang={lang} href={hrefUrl} />
      ))}
      <link rel="alternate" hrefLang="x-default" href={hreflangs[0].url} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content={pageTitle} />
      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:locale" content={locale === "tg" ? "tg_TJ" : locale === "en" ? "en_US" : "ru_RU"} />

      {/* Alternative locales */}
      {languages
        .filter((lang) => lang !== locale)
        .map((lang) => (
          <meta
            key={lang}
            property="og:locale:alternate"
            content={lang === "tg" ? "tg_TJ" : lang === "en" ? "en_US" : "ru_RU"}
          />
        ))}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@joikor_tj" />

      {/* Additional Meta Tags */}
      <meta name="author" content="Joikor" />
      <meta name="theme-color" content="#3b82f6" />

      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: siteTitle,
            description: pageDescription,
            url: currentUrl,
            potentialAction: {
              "@type": "SearchAction",
              target: `${currentUrl}/jobs?q={search_term_string}`,
              "query-input": "required name=search_term_string",
            },
            inLanguage: locale,
            availableLanguage: languages,
          }),
        }}
      />
    </Head>
  )
}
