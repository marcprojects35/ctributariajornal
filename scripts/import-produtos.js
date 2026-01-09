// Script ATUALIZADO para importar produtos com TODOS os campos
// Execute com: node scripts/import-produtos.js

const fs = require('fs')
const path = require('path')

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Admin@2025Forte!'
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

async function importarProdutos() {
  try {
    console.log('🚀 Iniciando importação de produtos...\n')
    
    // Ler o arquivo JSON com os produtos
    const produtosPath = path.join(__dirname, '..', 'produtos_processados.json')
    
    if (!fs.existsSync(produtosPath)) {
      console.error('❌ Arquivo produtos_processados.json não encontrado!')
      console.log('Certifique-se de que o arquivo está na raiz do projeto')
      process.exit(1)
    }
    
    let produtos = JSON.parse(fs.readFileSync(produtosPath, 'utf8'))
    
    // Mapear os produtos para incluir os campos que faltam
    produtos = produtos.map(p => ({
      id: p.id,
      original_id: p.id,
      gtin: p.gtin,
      ncm: p.ncm,
      nome: p.nome,
      cest: p.cest || '',
      origem: p.origem || 'Nacional',
      unit_federation: p.origem || 'BR',
      categoria: p.categoria || '',
      icms: p.icms || 0,
      ipi: p.ipi || 0,
      pis: p.pis || 1.65,
      cofins: p.cofins || 7.6,
      ibs_estadual: p.ibs_estadual || 0,
      ibs_municipal: p.ibs_municipal || 0,
      cbs: p.cbs || 0
    }))
    
    console.log(`📊 Total de produtos a importar: ${produtos.length}\n`)
    
    // Importar em lotes de 1000
    const batchSize = 1000
    let imported = 0
    
    for (let i = 0; i < produtos.length; i += batchSize) {
      const batch = produtos.slice(i, i + batchSize)
      
      console.log(`⏳ Importando lote ${Math.floor(i / batchSize) + 1}/${Math.ceil(produtos.length / batchSize)}...`)
      
      const response = await fetch(`${API_URL}/api/produtos/import`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-password': ADMIN_PASSWORD
        },
        body: JSON.stringify({ produtos: batch })
      })
      
      if (!response.ok) {
        const error = await response.json()
        console.error(`❌ Erro no lote: ${error.error}`)
        throw new Error(error.details || error.error)
      }
      
      imported += batch.length
      console.log(`✅ Lote importado! Progresso: ${imported}/${produtos.length}`)
    }
    
    // Verificar total no banco
    const statusResponse = await fetch(`${API_URL}/api/produtos/import`)
    const status = await statusResponse.json()
    
    console.log('\n' + '='.repeat(60))
    console.log('🎉 IMPORTAÇÃO CONCLUÍDA!')
    console.log('='.repeat(60))
    console.log(`✅ Produtos importados: ${imported}`)
    console.log(`📊 Total no banco: ${status.totalProdutos}`)
    console.log('='.repeat(60))
    
  } catch (error) {
    console.error('\n❌ ERRO na importação:')
    console.error(error.message)
    process.exit(1)
  }
}

// Executar
importarProdutos()
