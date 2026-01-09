-- Schema COMPLETO para a tabela de produtos tributários
-- Database: CTributária Jornal
-- Compatível com o código existente

CREATE TABLE IF NOT EXISTS produtos (
  id SERIAL PRIMARY KEY,
  original_id INTEGER,
  gtin VARCHAR(14) UNIQUE NOT NULL,
  ncm VARCHAR(10) NOT NULL,
  nome TEXT NOT NULL,
  cest VARCHAR(10) DEFAULT '',
  origem VARCHAR(50) DEFAULT 'Nacional',
  unit_federation VARCHAR(2) DEFAULT 'BR',
  categoria VARCHAR(100) DEFAULT '',
  
  -- Impostos atuais
  icms DECIMAL(5,2) DEFAULT 0,
  ipi DECIMAL(5,2) DEFAULT 0,
  pis DECIMAL(5,2) DEFAULT 1.65,
  cofins DECIMAL(5,2) DEFAULT 7.6,
  
  -- Reforma tributária (IBS e CBS)
  ibs_estadual DECIMAL(5,2) DEFAULT 0,
  ibs_municipal DECIMAL(5,2) DEFAULT 0,
  cbs DECIMAL(5,2) DEFAULT 0,
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices para melhorar performance nas buscas
CREATE INDEX IF NOT EXISTS idx_produtos_gtin ON produtos(gtin);
CREATE INDEX IF NOT EXISTS idx_produtos_ncm ON produtos(ncm);
CREATE INDEX IF NOT EXISTS idx_produtos_nome ON produtos USING gin(to_tsvector('portuguese', nome));
CREATE INDEX IF NOT EXISTS idx_produtos_categoria ON produtos(categoria);
CREATE INDEX IF NOT EXISTS idx_produtos_uf ON produtos(unit_federation);

-- Trigger para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_produtos_updated_at ON produtos;
CREATE TRIGGER update_produtos_updated_at BEFORE UPDATE ON produtos
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Comentários nas colunas
COMMENT ON TABLE produtos IS 'Tabela de produtos tributários com informações de ICMS, IBS, CBS e impostos federais';
COMMENT ON COLUMN produtos.id IS 'ID sequencial do banco de dados';
COMMENT ON COLUMN produtos.original_id IS 'ID original do produto na planilha fonte';
COMMENT ON COLUMN produtos.gtin IS 'Código GTIN/EAN do produto';
COMMENT ON COLUMN produtos.ncm IS 'Nomenclatura Comum do Mercosul';
COMMENT ON COLUMN produtos.nome IS 'Nome/Descrição do produto';
COMMENT ON COLUMN produtos.cest IS 'Código Especificador da Substituição Tributária';
COMMENT ON COLUMN produtos.origem IS 'Origem do produto (Nacional, Importado, etc)';
COMMENT ON COLUMN produtos.unit_federation IS 'Unidade da Federação (UF)';
COMMENT ON COLUMN produtos.categoria IS 'Categoria do produto';
COMMENT ON COLUMN produtos.icms IS 'Alíquota de ICMS (%)';
COMMENT ON COLUMN produtos.ipi IS 'Alíquota de IPI (%)';
COMMENT ON COLUMN produtos.pis IS 'Alíquota de PIS (%)';
COMMENT ON COLUMN produtos.cofins IS 'Alíquota de COFINS (%)';
COMMENT ON COLUMN produtos.cbs IS 'Alíquota de CBS - Contribuição sobre Bens e Serviços (%)';
COMMENT ON COLUMN produtos.ibs_estadual IS 'Alíquota de IBS Estadual (%)';
COMMENT ON COLUMN produtos.ibs_municipal IS 'Alíquota de IBS Municipal (%)';
