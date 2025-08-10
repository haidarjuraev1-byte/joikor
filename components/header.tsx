"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Menu, Search, User, ChevronDown, Briefcase, Users, FileText, Building, Compass } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useTranslation } from "@/hooks/useTranslation"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useTranslation()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <Briefcase className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-bold text-xl">Joikor</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {/* Search Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-1 h-9 px-3">
                <Search className="h-4 w-4" />
                <span>{t("common.search")}</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80">
              <DropdownMenuItem asChild>
                <Link href="/jobs" className="flex items-center space-x-3 p-4">
                  <Briefcase className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-medium">{t("navigation.findJob")}</div>
                    <div className="text-sm text-muted-foreground">{t("navigation.findJobDesc")}</div>
                  </div>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/candidates" className="flex items-center space-x-3 p-4">
                  <Users className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-medium">{t("navigation.findCandidates")}</div>
                    <div className="text-sm text-muted-foreground">{t("navigation.findCandidatesDesc")}</div>
                  </div>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Services Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-1 h-9 px-3">
                <span>{t("common.services")}</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80">
              <DropdownMenuItem asChild>
                <Link href="/resume-builder" className="flex items-center space-x-3 p-4">
                  <FileText className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-medium">{t("navigation.createResume")}</div>
                    <div className="text-sm text-muted-foreground">{t("navigation.createResumeDesc")}</div>
                  </div>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/post-job" className="flex items-center space-x-3 p-4">
                  <Building className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-medium">{t("navigation.postJob")}</div>
                    <div className="text-sm text-muted-foreground">{t("navigation.postJobDesc")}</div>
                  </div>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/career-orientation" className="flex items-center space-x-3 p-4">
                  <Compass className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-medium">{t("navigation.careerOrientation")}</div>
                    <div className="text-sm text-muted-foreground">{t("navigation.careerOrientationDesc")}</div>
                  </div>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Static Links */}
          <Link href="/blog">
            <Button variant="ghost" className="h-9 px-3">
              {t("navigation.blog")}
            </Button>
          </Link>
          <Link href="/pricing">
            <Button variant="ghost" className="h-9 px-3">
              {t("navigation.pricing")}
            </Button>
          </Link>
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-2">
          <LanguageSwitcher />
          <ThemeToggle />

          {/* Auth Buttons */}
          <div className="hidden sm:flex items-center space-x-2">
            <Button variant="ghost" size="sm" asChild className="h-9 px-4">
              <Link href="/login">{t("common.login")}</Link>
            </Button>
            <Button size="sm" asChild className="h-9 px-4">
              <Link href="/register">{t("common.register")}</Link>
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="md:hidden h-9 w-9 p-0">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col space-y-4 mt-8">
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">{t("common.search")}</h3>
                  <Link
                    href="/jobs"
                    className="flex items-center space-x-3 p-3 rounded-md hover:bg-accent"
                    onClick={() => setIsOpen(false)}
                  >
                    <Briefcase className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-medium">{t("navigation.findJob")}</div>
                      <div className="text-sm text-muted-foreground">{t("navigation.findJobDesc")}</div>
                    </div>
                  </Link>
                  <Link
                    href="/candidates"
                    className="flex items-center space-x-3 p-3 rounded-md hover:bg-accent"
                    onClick={() => setIsOpen(false)}
                  >
                    <Users className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-medium">{t("navigation.findCandidates")}</div>
                      <div className="text-sm text-muted-foreground">{t("navigation.findCandidatesDesc")}</div>
                    </div>
                  </Link>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">{t("common.services")}</h3>
                  <Link
                    href="/resume-builder"
                    className="flex items-center space-x-3 p-3 rounded-md hover:bg-accent"
                    onClick={() => setIsOpen(false)}
                  >
                    <FileText className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-medium">{t("navigation.createResume")}</div>
                      <div className="text-sm text-muted-foreground">{t("navigation.createResumeDesc")}</div>
                    </div>
                  </Link>
                  <Link
                    href="/post-job"
                    className="flex items-center space-x-3 p-3 rounded-md hover:bg-accent"
                    onClick={() => setIsOpen(false)}
                  >
                    <Building className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-medium">{t("navigation.postJob")}</div>
                      <div className="text-sm text-muted-foreground">{t("navigation.postJobDesc")}</div>
                    </div>
                  </Link>
                  <Link
                    href="/career-orientation"
                    className="flex items-center space-x-3 p-3 rounded-md hover:bg-accent"
                    onClick={() => setIsOpen(false)}
                  >
                    <Compass className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-medium">{t("navigation.careerOrientation")}</div>
                      <div className="text-sm text-muted-foreground">{t("navigation.careerOrientationDesc")}</div>
                    </div>
                  </Link>
                </div>

                <div className="space-y-2">
                  <Link
                    href="/blog"
                    className="block p-3 rounded-md hover:bg-accent font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    {t("navigation.blog")}
                  </Link>
                  <Link
                    href="/pricing"
                    className="block p-3 rounded-md hover:bg-accent font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    {t("navigation.pricing")}
                  </Link>
                </div>

                <div className="space-y-2 pt-4 border-t">
                  <Button variant="ghost" className="w-full justify-start h-10" asChild>
                    <Link href="/login" onClick={() => setIsOpen(false)}>
                      <User className="h-4 w-4 mr-2" />
                      {t("common.login")}
                    </Link>
                  </Button>
                  <Button className="w-full h-10" asChild>
                    <Link href="/register" onClick={() => setIsOpen(false)}>
                      {t("common.register")}
                    </Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
