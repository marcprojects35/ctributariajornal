// Script para criar a tabela produtos no Railway
// Execute com: node criar-tabela.js

const { Pool } = require('pg')
const fs = require('fs')
const path = require('path')

// Carregar variáveis de ambiente
require('dotenv').config({ path: '.env.local' })

async function criarTabela() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  })

  try {
    console.log('🔗 Conectando ao Railway PostgreSQL...\n')
    
    // Ler o arquivo schema.sql
    const schemaPath = path.join(__dirname, 'schema.sql')
    const schema = fs.readFileSync(schemaPath, 'utf8')
    
    console.log('📝 Executando schema.sql...\n')
    
    // Executar o schema
    await pool.query(schema)
    
    console.log('✅ TABELA CRIADA COM SUCESSO!\n')
    console.log('📊 Estrutura criada:')
    console.log('   - Tabela: produtos')
    console.log('   - Campos: 17 colunas')
    console.log('   - Índices: 5 índices para performance')
    console.log('   - Trigger: atualização automática de updated_at')
    console.log('\n' + '='.repeat(60))
    console.log('🎉 PRONTO! Agora você pode importar os produtos!')
    console.log('='.repeat(60))
    
  } catch (error) {
    console.error('❌ ERRO ao criar tabela:')
    console.error(error.message)
    
    if (error.message.includes('already exists')) {
      console.log('\n⚠️  A tabela já existe! Tudo certo!')
    }
  } finally {
    await pool.end()
  }
}

criarTabela()
