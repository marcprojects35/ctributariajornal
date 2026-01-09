'use client'

import { useState } from 'react'

export function NewsletterDownload() {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Inscrição realizada com sucesso!')
    setEmail('')
  }

  return (
    <div className="bg-blue-50 p-8 rounded-lg my-8">
      <h3 className="text-2xl font-bold mb-4">Newsletter CTributária</h3>
      <p className="mb-4 text-gray-700">Receba as principais notícias tributárias diretamente no seu email!</p>
      
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          placeholder="Seu melhor e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Inscrever
        </button>
      </form>
      
      <div className="mt-4">
        <a 
          href="#" 
          className="text-blue-600 hover:underline"
        >
          📥 Baixar Newsletter em PDF
        </a>
      </div>
    </div>
  )
}