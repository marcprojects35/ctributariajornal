import Link from 'next/link'

export function FloatingCalculatorButton() {
  return (
    <Link href="/ferramentas" className="fixed bottom-20 right-4 bg-green-600 text-white p-4 rounded-full cursor-pointer hover:bg-green-700 shadow-lg">
      🧮
    </Link>
  )
}