import Link from "next/link"
import { Briefcase, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <Briefcase className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">Joikor</span>
            </div>
            <p className="text-gray-400 mb-4">
              Ведущая платформа поиска работы в Таджикистане. Соединяем таланты с возможностями.
            </p>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>info@joikor.tj</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+992 37 123-45-67</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Душанбе, Таджикистан</span>
              </div>
            </div>
          </div>

          {/* For Job Seekers */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Соискателям</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/jobs" className="hover:text-white transition-colors">
                  Поиск работы
                </Link>
              </li>
              <li>
                <Link href="/resume-builder" className="hover:text-white transition-colors">
                  Создать резюме
                </Link>
              </li>
              <li>
                <Link href="/career-orientation" className="hover:text-white transition-colors">
                  Профориентация
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">
                  Карьерный блог
                </Link>
              </li>
              <li>
                <Link href="/salary-guide" className="hover:text-white transition-colors">
                  Гид по зарплатам
                </Link>
              </li>
            </ul>
          </div>

          {/* For Employers */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Работодателям</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/post-job" className="hover:text-white transition-colors">
                  Разместить вакансию
                </Link>
              </li>
              <li>
                <Link href="/candidates" className="hover:text-white transition-colors">
                  Поиск кандидатов
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-white transition-colors">
                  Тарифы
                </Link>
              </li>
              <li>
                <Link href="/employer-resources" className="hover:text-white transition-colors">
                  Ресурсы HR
                </Link>
              </li>
              <li>
                <Link href="/analytics" className="hover:text-white transition-colors">
                  Аналитика найма
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Компания</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  О нас
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Контакты
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Политика конфиденциальности
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Условия использования
                </Link>
              </li>
              <li>
                <Link href="/help" className="hover:text-white transition-colors">
                  Помощь
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© 2024 Joikor. Все права защищены.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/telegram" className="text-gray-400 hover:text-white transition-colors">
              Telegram
            </Link>
            <Link href="/facebook" className="text-gray-400 hover:text-white transition-colors">
              Facebook
            </Link>
            <Link href="/instagram" className="text-gray-400 hover:text-white transition-colors">
              Instagram
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
