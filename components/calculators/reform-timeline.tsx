'use client'

export function ReformTimeline() {
  return (
    <div className="border rounded-lg p-6">
      <h3 className="text-xl font-bold mb-4">Timeline da Reforma Tributária</h3>
      <div className="space-y-4">
        <div className="border-l-4 border-blue-600 pl-4">
          <h4 className="font-bold">2026</h4>
          <p className="text-sm text-gray-600">Início da implementação CBS e IBS</p>
        </div>
        <div className="border-l-4 border-blue-400 pl-4">
          <h4 className="font-bold">2027</h4>
          <p className="text-sm text-gray-600">Fase de transição</p>
        </div>
        <div className="border-l-4 border-blue-300 pl-4">
          <h4 className="font-bold">2033</h4>
          <p className="text-sm text-gray-600">Implementação completa</p>
        </div>
      </div>
    </div>
  )
}