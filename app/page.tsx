"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Sidebar } from "@/components/layout/sidebar"
import { HeroNews } from "@/components/features/hero-news"
import { NewsGrid } from "@/components/features/news-grid"
import { ChatBot } from "@/components/features/chat-bot"
import { FloatingCalculatorButton } from "@/components/features/floating-calculator-button"
import { SearchBar } from "@/components/features/search-bar"
import { NewsletterDownload } from "@/components/features/newsletter-download"

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const handleSearch = (query: string, filters: string[]) => {
    setSearchQuery(query)
    setActiveFilters(filters)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors">
      <Header />
      <main className="max-w-[1400px] mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#FF7A00]">
            Jornal Tributário
          </h1>
        </div>
        <SearchBar onSearch={handleSearch} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            <NewsGrid searchQuery={searchQuery} activeFilters={activeFilters} />
            <HeroNews />
            <NewsletterDownload />
          </div>
          <div className="lg:col-span-1">
            <Sidebar />
          </div>
        </div>
        <FloatingCalculatorButton />
        <ChatBot />
      </main>
      <Footer />
    </div>
  )
}
