import HeroSection from "@/components/hero-section"
import PopularCategories from "@/components/popular-categories"
import HotJobs from "@/components/hot-jobs"
import NearbyJobs from "@/components/nearby-jobs"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Joikor - Поиск работы в Таджикистане",
  description:
    "Найдите идеальную работу или кандидата в Таджикистане с помощью Joikor - ведущей платформы по трудоустройству",
}

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <PopularCategories />
      <HotJobs />
      <NearbyJobs />
    </div>
  )
}
