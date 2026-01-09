'use client'

export function AgendaTributaria() {
  return (
    <div className="border rounded-lg p-6">
      <h3 className="text-xl font-bold mb-4">Agenda Tributária</h3>
      <div className="space-y-2">
        <div className="border-b pb-2">
          <p className="font-semibold">10/01 - DCTF</p>
          <p className="text-sm text-gray-600">Declaração de Débitos e Créditos Tributários Federais</p>
        </div>
        <div className="border-b pb-2">
          <p className="font-semibold">20/01 - DARF</p>
          <p className="text-sm text-gray-600">Vencimento DARF mensal</p>
        </div>
        <div className="border-b pb-2">
          <p className="font-semibold">31/01 - SPED</p>
          <p className="text-sm text-gray-600">Entrega SPED Fiscal</p>
        </div>
      </div>
    </div>
  )
}