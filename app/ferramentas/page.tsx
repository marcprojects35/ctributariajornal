"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { IbsCbsCalculator } from "@/components/calculators/ibs-cbs-calculator"
import { SplitPaymentSimulator } from "@/components/calculators/split-payment-simulator"
import { ReformTimeline } from "@/components/calculators/reform-timeline"
import { IssCalculator } from "@/components/calculators/iss-calculator"
import { RegimeSimulator } from "@/components/calculators/regime-simulator"
import { DarfGenerator } from "@/components/calculators/darf-generator"
import { DifalCalculator } from "@/components/calculators/difal-calculator"
import { AgendaTributaria } from "@/components/calculators/agenda-tributaria"
import { CalculadoraTributariaAutomatica } from "@/components/calculators/calculadora-tributaria-automatica"
import { Button } from "@/components/ui/button"
import { 
  Wrench, 
  Calculator, 
  FileText, 
  Calendar, 
  TrendingUp
} from "lucide-react"

const categorias = [
  { id: "todas", nome: "Todas", icon: Wrench },
  { id: "reforma", nome: "Reforma Tributária", icon: TrendingUp },
  { id: "calculos", nome: "Cálculos Fiscais", icon: Calculator },
  { id: "documentos", nome: "Documentos", icon: FileText },
  { id: "agenda", nome: "Agenda", icon: Calendar }
]

const ferramentas = [
  { id: "calculadora-automatica", categoria: "calculos", component: CalculadoraTributariaAutomatica },
  { id: "ibs-cbs", categoria: "reforma", component: IbsCbsCalculator },
  { id: "split", categoria: "reforma", component: SplitPaymentSimulator },
  { id: "timeline", categoria: "reforma", component: ReformTimeline },
  { id: "iss", categoria: "calculos", component: IssCalculator },
  { id: "regime", categoria: "calculos", component: RegimeSimulator },
  { id: "darf", categoria: "documentos", component: DarfGenerator },
  { id: "difal", categoria: "calculos", component: DifalCalculator },
  { id: "agenda", categoria: "agenda", component: AgendaTributaria }
]

export default function FerramentasPage() {
  const [categoriaAtiva, setCategoriaAtiva] = useState("todas")

  const ferramentasFiltradas = categoriaAtiva === "todas" 
    ? ferramentas 
    : ferramentas.filter(f => f.categoria === categoriaAtiva)

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors">
      <Header />
      <main className="max-w-[1400px] mx-auto px-4 py-12">
        <div className="mb-12 animate-fade-in">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-gradient-to-r from-[#FF7A00] to-[#FF9500] p-4 rounded-2xl shadow-lg">
              <Wrench className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-[#0046B3] to-[#0046B3]/80 bg-clip-text text-transparent dark:from-blue-400 dark:to-blue-300">
                Ferramentas e Calculadoras
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Utilize nossas calculadoras para entender melhor os tributos e a Reforma Tributária
              </p>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {categorias.map(cat => {
              const Icon = cat.icon
              return (
                <Button
                  key={cat.id}
                  variant={categoriaAtiva === cat.id ? "default" : "outline"}
                  onClick={() => setCategoriaAtiva(cat.id)}
                  className={categoriaAtiva === cat.id ? "bg-[#FF7A00] hover:bg-[#FF9500]" : ""}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {cat.nome}
                </Button>
              )
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {ferramentasFiltradas.map(ferramenta => {
            const Component = ferramenta.component
            return <Component key={ferramenta.id} />
          })}
        </div>

        {ferramentasFiltradas.length === 0 && (
          <div className="text-center py-12">
            <Wrench className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">Nenhuma ferramenta encontrada</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
