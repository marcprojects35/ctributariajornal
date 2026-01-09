'use client'

import { useState } from 'react'

export function SearchBar() {
  const [query, setQuery] = useState('')

  return (
    <div className="max-w-2xl mx-auto my-8">
      <input
        type="text"
        placeholder="Buscar notícias..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
    </div>
  )
}