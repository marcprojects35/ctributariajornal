import { NextRequest, NextResponse } from 'next/server'
import { insertProdutos, countProdutos } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    // Verificar senha de admin
    const adminPassword = request.headers.get('x-admin-password')
    if (adminPassword !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { produtos, batch = false } = body

    if (!produtos || !Array.isArray(produtos)) {
      return NextResponse.json(
        { error: 'Produtos inválidos' },
        { status: 400 }
      )
    }

    // Se for batch, importar em lotes de 1000
    if (batch) {
      const batchSize = 1000
      let imported = 0
      
      for (let i = 0; i < produtos.length; i += batchSize) {
        const batch = produtos.slice(i, i + batchSize)
        await insertProdutos(batch)
        imported += batch.length
        console.log(`Progresso: ${imported}/${produtos.length}`)
      }
      
      const total = await countProdutos()
      
      return NextResponse.json({
        success: true,
        message: `${imported} produtos importados com sucesso`,
        totalNoBanco: total
      })
    } else {
      // Importar todos de uma vez
      await insertProdutos(produtos)
      const total = await countProdutos()
      
      return NextResponse.json({
        success: true,
        message: `${produtos.length} produtos importados com sucesso`,
        totalNoBanco: total
      })
    }
  } catch (error) {
    console.error('Erro ao importar produtos:', error)
    return NextResponse.json(
      { error: 'Erro ao importar produtos', details: error instanceof Error ? error.message : 'Erro desconhecido' },
      { status: 500 }
    )
  }
}

// Rota GET para verificar status
export async function GET() {
  try {
    const total = await countProdutos()
    return NextResponse.json({
      success: true,
      totalProdutos: total,
      status: 'ok'
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao verificar status', details: error instanceof Error ? error.message : 'Erro desconhecido' },
      { status: 500 }
    )
  }
}
