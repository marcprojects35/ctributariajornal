import { Pool } from 'pg'

// Configuração da conexão com PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? {
    rejectUnauthorized: false
  } : false,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})

pool.on('error', (err) => {
  console.error('Erro inesperado no pool de conexões:', err)
})

export async function query(text: string, params?: any[]) {
  const start = Date.now()
  try {
    const res = await pool.query(text, params)
    const duration = Date.now() - start
    console.log('Query executada', { text, duration, rows: res.rowCount })
    return res
  } catch (error) {
    console.error('Erro na query:', error)
    throw error
  }
}

export async function searchProdutos(searchTerm: string, limit: number = 50) {
  const text = `
    SELECT 
      id, original_id, gtin, ncm, nome, cest, origem, unit_federation, categoria,
      icms, ipi, pis, cofins, ibs_estadual, ibs_municipal, cbs
    FROM produtos
    WHERE 
      nome ILIKE $1 
      OR gtin ILIKE $1 
      OR ncm ILIKE $1
    ORDER BY nome
    LIMIT $2
  `
  const values = [`%${searchTerm}%`, limit]
  const result = await query(text, values)
  return result.rows
}

export async function getProdutoByGtin(gtin: string) {
  const text = `
    SELECT 
      id, original_id, gtin, ncm, nome, cest, origem, unit_federation, categoria,
      icms, ipi, pis, cofins, ibs_estadual, ibs_municipal, cbs
    FROM produtos
    WHERE gtin = $1
  `
  const result = await query(text, [gtin])
  return result.rows[0]
}

export async function getProdutosByNcm(ncm: string) {
  const text = `
    SELECT 
      id, original_id, gtin, ncm, nome, cest, origem, unit_federation, categoria,
      icms, ipi, pis, cofins, ibs_estadual, ibs_municipal, cbs
    FROM produtos
    WHERE ncm = $1
    ORDER BY nome
  `
  const result = await query(text, [ncm])
  return result.rows
}

export async function insertProdutos(produtos: any[]) {
  const client = await pool.connect()
  try {
    await client.query('BEGIN')
    
    const insertText = `
      INSERT INTO produtos (
        id, original_id, gtin, ncm, nome, cest, origem, unit_federation, categoria,
        icms, ipi, pis, cofins, ibs_estadual, ibs_municipal, cbs
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
      ON CONFLICT (gtin) DO UPDATE SET
        original_id = EXCLUDED.original_id,
        ncm = EXCLUDED.ncm,
        nome = EXCLUDED.nome,
        cest = EXCLUDED.cest,
        origem = EXCLUDED.origem,
        unit_federation = EXCLUDED.unit_federation,
        categoria = EXCLUDED.categoria,
        icms = EXCLUDED.icms,
        ipi = EXCLUDED.ipi,
        pis = EXCLUDED.pis,
        cofins = EXCLUDED.cofins,
        ibs_estadual = EXCLUDED.ibs_estadual,
        ibs_municipal = EXCLUDED.ibs_municipal,
        cbs = EXCLUDED.cbs,
        updated_at = CURRENT_TIMESTAMP
    `
    
    for (const produto of produtos) {
      await client.query(insertText, [
        produto.id,
        produto.original_id || produto.id,
        produto.gtin,
        produto.ncm,
        produto.nome,
        produto.cest || '',
        produto.origem || 'Nacional',
        produto.unit_federation || 'BR',
        produto.categoria || '',
        produto.icms || 0,
        produto.ipi || 0,
        produto.pis || 1.65,
        produto.cofins || 7.6,
        produto.ibs_estadual || 0,
        produto.ibs_municipal || 0,
        produto.cbs || 0
      ])
    }
    
    await client.query('COMMIT')
    console.log(`✅ ${produtos.length} produtos inseridos/atualizados com sucesso`)
  } catch (error) {
    await client.query('ROLLBACK')
    console.error('❌ Erro ao inserir produtos:', error)
    throw error
  } finally {
    client.release()
  }
}

export async function countProdutos() {
  const result = await query('SELECT COUNT(*) as total FROM produtos')
  return parseInt(result.rows[0].total)
}

export default pool
