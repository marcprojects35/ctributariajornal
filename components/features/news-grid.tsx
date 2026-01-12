export function NewsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
      <div className="border rounded-lg p-6 bg-white shadow-sm hover:shadow-md transition">
        <h3 className="font-bold mb-2 text-lg">Reforma Tributária Avança</h3>
        <p className="text-sm text-gray-600 mb-4">Conheça as principais mudanças que entram em vigor em 2026...</p>
        <a href="/noticias" className="text-blue-600 text-sm hover:underline">Ler mais →</a>
      </div>
      
      <div className="border rounded-lg p-6 bg-white shadow-sm hover:shadow-md transition">
        <h3 className="font-bold mb-2 text-lg">CBS e IBS: Entenda a Diferença</h3>
        <p className="text-sm text-gray-600 mb-4">Saiba como calcular os novos tributos da reforma...</p>
        <a href="/noticias" className="text-blue-600 text-sm hover:underline">Ler mais →</a>
      </div>
      
      <div className="border rounded-lg p-6 bg-white shadow-sm hover:shadow-md transition">
        <h3 className="font-bold mb-2 text-lg">Split Payment: Nova Regra</h3>
        <p className="text-sm text-gray-600 mb-4">Entenda como funcionará o novo sistema de pagamento de impostos...</p>
        <a href="/noticias" className="text-blue-600 text-sm hover:underline">Ler mais →</a>
      </div>
    </div>
  )
}