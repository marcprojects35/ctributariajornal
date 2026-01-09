'use client'

export function RegimeSimulator() {
  return (
    <div className="border rounded-lg p-6">
      <h3 className="text-xl font-bold mb-4">Simulador de Regime Tributário</h3>
      <p className="text-gray-600">Compare Simples Nacional, Lucro Presumido e Lucro Real...</p>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-blue-50 rounded">
          <h4 className="font-bold">Simples Nacional</h4>
          <p className="text-sm text-gray-600">Até R$ 4,8 milhões/ano</p>
        </div>
        <div className="p-4 bg-green-50 rounded">
          <h4 className="font-bold">Lucro Presumido</h4>
          <p className="text-sm text-gray-600">Até R$ 78 milhões/ano</p>
        </div>
        <div className="p-4 bg-purple-50 rounded">
          <h4 className="font-bold">Lucro Real</h4>
          <p className="text-sm text-gray-600">Sem limite de faturamento</p>
        </div>
      </div>
    </div>
  )
}