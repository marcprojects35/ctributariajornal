import Link from 'next/link'

export function Header() {
  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            CTributária News
          </Link>
          <div className="flex gap-6">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <Link href="/noticias" className="hover:text-blue-600">Notícias</Link>
            <Link href="/ferramentas" className="hover:text-blue-600">Ferramentas</Link>
            <Link href="/biblioteca" className="hover:text-blue-600">Biblioteca</Link>
            <Link href="/contato" className="hover:text-blue-600">Contato</Link>
          </div>
        </nav>
      </div>
    </header>
  )
}