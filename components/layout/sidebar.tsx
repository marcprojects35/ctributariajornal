export function Sidebar() {
  return (
    <aside className="w-64 border-r p-4 bg-white">
      <h3 className="font-bold mb-4">Menu Lateral</h3>
      <nav className="flex flex-col gap-2">
        <a href="/" className="hover:text-blue-600 py-2 px-4 rounded hover:bg-gray-50 transition">Home</a>
        <a href="/noticias" className="hover:text-blue-600 py-2 px-4 rounded hover:bg-gray-50 transition">Notícias</a>
        <a href="/ferramentas" className="hover:text-blue-600 py-2 px-4 rounded hover:bg-gray-50 transition">Ferramentas</a>
        <a href="/biblioteca" className="hover:text-blue-600 py-2 px-4 rounded hover:bg-gray-50 transition">Biblioteca</a>
        <a href="/contato" className="hover:text-blue-600 py-2 px-4 rounded hover:bg-gray-50 transition">Contato</a>
      </nav>
    </aside>
  )
}