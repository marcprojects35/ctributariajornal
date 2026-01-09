"use client"

import { useState, useMemo } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { noticias, categorias, buscarNoticias, getNoticiasPorCategoria } from "@/lib/noticias-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Calendar, ArrowRight, Newspaper, Filter, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

const ITEMS_PER_PAGE = 6

export default function NoticiasPage() {
  const [busca, setBusca] = useState("")
  const [categoriaAtiva, setCategoriaAtiva] = useState("Todas")
  const [paginaAtual, setPaginaAtual] = useState(1)

  const noticiasFiltradas = useMemo(() => {
    let resultado = categoriaAtiva === "Todas" ? noticias : getNoticiasPorCategoria(categoriaAtiva)
    if (busca.trim()) {
      resultado = resultado.filter(n => 
        n.titulo.toLowerCase().includes(busca.toLowerCase()) ||
        n.resumo.toLowerCase().includes(busca.toLowerCase()) ||
        n.tags.some(tag => tag.toLowerCase().includes(busca.toLowerCase()))
      )
    }
    return resultado
  }, [busca, categoriaAtiva])

  const totalPaginas = Math.ceil(noticiasFiltradas.length / ITEMS_PER_PAGE)
  const noticiasPaginadas = noticiasFiltradas.slice(
    (paginaAtual - 1) * ITEMS_PER_PAGE,
    paginaAtual * ITEMS_PER_PAGE
  )

  const handleCategoriaChange = (categoria: string) => {
    setCategoriaAtiva(categoria)
    setPaginaAtual(1)
  }

  const handleBuscaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBusca(e.target.value)
    setPaginaAtual(1)
  }

  const getCategoriaColor = (categoria: string) => {
    switch (categoria) {
      case "Urgente": return "bg-red-500"
      case "Atualização": return "bg-blue-500"
      case "Reforma": return "bg-purple-500"
      case "Legislação": return "bg-green-500"
      case "Simples": return "bg-yellow-500"
      case "Obrigações": return "bg-orange-500"
      default: return "bg-gray-500"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors">
      <Header />
      <main className="max-w-[1400px] mx-auto px-4 py-12">
        <div className="mb-12 animate-fade-in">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-gradient-to-r from-[#FF7A00] to-[#FF9500] p-4 rounded-2xl shadow-lg">
              <Newspaper className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-[#0046B3] to-[#0046B3]/80 bg-clip-text text-transparent dark:from-blue-400 dark:to-blue-300">
                Notícias Tributárias
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Acompanhe as últimas atualizações sobre a Reforma Tributária e legislação fiscal
              </p>
            </div>
          </div>
        </div>

        <div className="mb-8 space-y-4">
          <div className="relative max-w-xl">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Buscar notícias por título, resumo ou tags..."
              value={busca}
              onChange={handleBuscaChange}
              className="pl-12 py-6 text-lg rounded-xl border-gray-200 dark:border-gray-700"
            />
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            <Filter className="h-4 w-4 text-gray-500 mr-2" />
            {categorias.map(cat => (
              <Button
                key={cat}
                variant={categoriaAtiva === cat ? "default" : "outline"}
                size="sm"
                onClick={() => handleCategoriaChange(cat)}
                className={categoriaAtiva === cat ? "bg-[#FF7A00] hover:bg-[#FF9500]" : ""}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>

        <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
          Exibindo {noticiasPaginadas.length} de {noticiasFiltradas.length} notícias
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {noticiasPaginadas.map(noticia => (
            <Card key={noticia.id} className="group hover:shadow-xl transition-all duration-300 border-gray-200 dark:border-gray-700 overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className={`${getCategoriaColor(noticia.categoria)} text-white text-xs`}>
                    {noticia.categoria}
                  </Badge>
                  {noticia.tags.slice(0, 2).map(tag => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <CardTitle className="text-lg leading-tight group-hover:text-[#FF7A00] transition-colors line-clamp-2">
                  {noticia.titulo}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                  {noticia.resumo}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Calendar className="h-3 w-3" />
                    {new Date(noticia.data).toLocaleDateString('pt-BR')}
                  </div>
                  <Link href={`/noticia/${noticia.id}`}>
                    <Button variant="ghost" size="sm" className="text-[#FF7A00] hover:text-[#FF9500] group/btn">
                      Ler mais
                      <ArrowRight className="h-4 w-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {noticiasFiltradas.length === 0 && (
          <div className="text-center py-12">
            <Newspaper className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">Nenhuma notícia encontrada</p>
            <p className="text-gray-400 text-sm">Tente ajustar os filtros ou termo de busca</p>
          </div>
        )}

        {totalPaginas > 1 && (
          <div className="flex items-center justify-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setPaginaAtual(p => Math.max(1, p - 1))}
              disabled={paginaAtual === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            {Array.from({ length: totalPaginas }, (_, i) => i + 1).map(pagina => (
              <Button
                key={pagina}
                variant={paginaAtual === pagina ? "default" : "outline"}
                size="sm"
                onClick={() => setPaginaAtual(pagina)}
                className={paginaAtual === pagina ? "bg-[#FF7A00] hover:bg-[#FF9500]" : ""}
              >
                {pagina}
              </Button>
            ))}
            
            <Button
              variant="outline"
              size="icon"
              onClick={() => setPaginaAtual(p => Math.min(totalPaginas, p + 1))}
              disabled={paginaAtual === totalPaginas}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
