"use client"

import { useState, useEffect } from "react"
import { Search, Calculator, Package } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

interface Produto {
  id: number
  gtin: string
  ncm: string
  nome: string
  cest: string
  origem: string
  icms: number
  cbs: number
  ibs_estadual: number
  ibs_municipal: number
}

export function CalculadoraTributariaAutomatica() {
  const [searchTerm, setSearchTerm] = useState("")
  const [searching, setSearching] = useState(false)
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | null>(null)
  const [valorProduto, setValorProduto] = useState("")
  const [totalProdutos, setTotalProdutos] = useState(0)

  // Buscar total de produtos no banco ao carregar
  useEffect(() => {
    fetch('/api/produtos/import')
      .then(res => res.json())
      .then(data => {
        if (data.totalProdutos) {
          setTotalProdutos(data.totalProdutos)
        }
      })
      .catch(err => console.error('Erro ao buscar total:', err))
  }, [])

  // Buscar produtos da API
  const buscarProdutos = async () => {
    if (searchTerm.length < 2) {
      alert('Digite pelo menos 2 caracteres para buscar')
      return
    }

    setSearching(true)
    try {
      const response = await fetch(`/api/produtos/search?q=${encodeURIComponent(searchTerm)}&limit=50`)
      const data = await response.json()
      
      if (data.success) {
        setProdutos(data.produtos)
        if (data.produtos.length === 0) {
          alert('Nenhum produto encontrado')
        }
      } else {
        alert('Erro ao buscar produtos: ' + data.error)
      }
    } catch (error) {
      console.error('Erro:', error)
      alert('Erro ao conectar com a API')
    } finally {
      setSearching(false)
    }
  }

  // Selecionar produto
  const selecionarProduto = (produto: Produto) => {
    setProdutoSelecionado(produto)
    setProdutos([]) // Limpar resultados
    setSearchTerm(produto.nome) // Mostrar nome no campo
  }

  // Calcular impostos
  const calcularImpostos = () => {
    if (!produtoSelecionado || !valorProduto) {
      alert('Selecione um produto e informe o valor')
      return
    }

    const valor = parseFloat(valorProduto)
    
    return {
      icms: (valor * produtoSelecionado.icms) / 100,
      cbs: (valor * produtoSelecionado.cbs) / 100,
      ibsEstadual: (valor * produtoSelecionado.ibs_estadual) / 100,
      ibsMunicipal: (valor * produtoSelecionado.ibs_municipal) / 100,
    }
  }

  const impostos = produtoSelecionado && valorProduto ? calcularImpostos() : null
  const total = impostos 
    ? impostos.icms + impostos.cbs + impostos.ibsEstadual + impostos.ibsMunicipal 
    : 0

  return (
    <Card className="border-2 hover:border-[#FF7A00]/50 transition-all">
      <CardHeader className="bg-gradient-to-r from-[#FF7A00]/10 to-transparent">
        <div className="flex items-center gap-3">
          <div className="bg-[#FF7A00] p-3 rounded-xl">
            <Calculator className="h-6 w-6 text-white" />
          </div>
          <div>
            <CardTitle className="text-xl">Calculadora Tributária Automática</CardTitle>
            <CardDescription>
              Pesquise por nome, GTIN ou NCM e calcule automaticamente os impostos (Base de dados com {totalProdutos.toLocaleString('pt-BR')} produtos)
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        
        {/* Busca de Produto */}
        <div className="space-y-2">
          <Label htmlFor="buscar">Buscar Produto</Label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="buscar"
                placeholder="Nome, GTIN ou NCM..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && buscarProdutos()}
                className="pl-10"
              />
            </div>
            <Button 
              onClick={buscarProdutos} 
              disabled={searching}
              className="bg-[#FF7A00] hover:bg-[#FF9500]"
            >
              {searching ? 'Buscando...' : 'Buscar'}
            </Button>
          </div>
        </div>

        {/* Resultados da Busca */}
        {produtos.length > 0 && (
          <div className="border rounded-lg p-4 space-y-2 max-h-60 overflow-y-auto bg-gray-50">
            <p className="text-sm font-medium text-gray-700 mb-2">
              {produtos.length} produto(s) encontrado(s):
            </p>
            {produtos.map((produto) => (
              <div
                key={produto.id}
                onClick={() => selecionarProduto(produto)}
                className="p-3 bg-white rounded-lg border hover:border-[#FF7A00] cursor-pointer transition-all hover:shadow-md"
              >
                <div className="flex items-start gap-3">
                  <Package className="h-5 w-5 text-[#FF7A00] mt-0.5" />
                  <div className="flex-1">
                    <p className="font-medium text-sm">{produto.nome}</p>
                    <p className="text-xs text-gray-600 mt-1">
                      NCM: {produto.ncm} | GTIN: {produto.gtin}
                      {produto.cest && ` | CEST: ${produto.cest}`}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Produto Selecionado */}
        {produtoSelecionado && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-sm mb-2 text-blue-900">Produto Selecionado:</h4>
            <div className="space-y-1 text-sm">
              <p><span className="font-medium">Nome:</span> {produtoSelecionado.nome}</p>
              <p><span className="font-medium">NCM:</span> {produtoSelecionado.ncm}</p>
              <p><span className="font-medium">GTIN:</span> {produtoSelecionado.gtin}</p>
              {produtoSelecionado.cest && (
                <p><span className="font-medium">CEST:</span> {produtoSelecionado.cest}</p>
              )}
              <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-blue-200">
                <p><span className="font-medium">ICMS:</span> {produtoSelecionado.icms}%</p>
                <p><span className="font-medium">CBS:</span> {produtoSelecionado.cbs}%</p>
                <p><span className="font-medium">IBS Estadual:</span> {produtoSelecionado.ibs_estadual}%</p>
                <p><span className="font-medium">IBS Municipal:</span> {produtoSelecionado.ibs_municipal}%</p>
              </div>
            </div>
          </div>
        )}

        {/* Valor do Produto */}
        {produtoSelecionado && (
          <div className="space-y-2">
            <Label htmlFor="valor">Valor do Produto (R$)</Label>
            <Input
              id="valor"
              type="number"
              placeholder="0,00"
              value={valorProduto}
              onChange={(e) => setValorProduto(e.target.value)}
              step="0.01"
              min="0"
            />
          </div>
        )}

        {/* Resultado */}
        {impostos && (
          <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6 space-y-4 border-2 border-green-200">
            <h3 className="font-bold text-lg text-center text-green-900">Cálculo dos Impostos</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-3 shadow-sm">
                <p className="text-xs text-gray-600">ICMS</p>
                <p className="text-lg font-bold text-green-700">
                  R$ {impostos.icms.toFixed(2)}
                </p>
                <p className="text-xs text-gray-500">{produtoSelecionado.icms}%</p>
              </div>
              
              <div className="bg-white rounded-lg p-3 shadow-sm">
                <p className="text-xs text-gray-600">CBS</p>
                <p className="text-lg font-bold text-blue-700">
                  R$ {impostos.cbs.toFixed(2)}
                </p>
                <p className="text-xs text-gray-500">{produtoSelecionado.cbs}%</p>
              </div>
              
              <div className="bg-white rounded-lg p-3 shadow-sm">
                <p className="text-xs text-gray-600">IBS Estadual</p>
                <p className="text-lg font-bold text-purple-700">
                  R$ {impostos.ibsEstadual.toFixed(2)}
                </p>
                <p className="text-xs text-gray-500">{produtoSelecionado.ibs_estadual}%</p>
              </div>
              
              <div className="bg-white rounded-lg p-3 shadow-sm">
                <p className="text-xs text-gray-600">IBS Municipal</p>
                <p className="text-lg font-bold text-orange-700">
                  R$ {impostos.ibsMunicipal.toFixed(2)}
                </p>
                <p className="text-xs text-gray-500">{produtoSelecionado.ibs_municipal}%</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-lg p-4 text-white text-center">
              <p className="text-sm opacity-90">Total de Impostos</p>
              <p className="text-3xl font-bold">R$ {total.toFixed(2)}</p>
              <p className="text-sm opacity-90 mt-1">
                Valor Final: R$ {(parseFloat(valorProduto) + total).toFixed(2)}
              </p>
            </div>
          </div>
        )}

        {!produtoSelecionado && (
          <div className="text-center py-8 text-gray-500">
            <Package className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p className="text-sm">Digite o nome, GTIN ou NCM do produto para começar</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
