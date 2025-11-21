"use client"

import { useEffect, useState } from "react"
import { Loader2, Package, Star, Search, Heart, Eye, Home, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { createClient } from '@supabase/supabase-js'

const supabase = createClient('https://itxipifguvzltiamsdmh.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml0eGlwaWZndXZ6bHRpYW1zZG1oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2OTY2MzQsImV4cCI6MjA3OTI3MjYzNH0.nZfEnv1hSYTmRYnHB8rDLZwUk2SJ6SCQCPcNwcYwt3M')

interface Product {
  id: number
  title: string
  price_brl: number
  reviews_count: number
  rating: number
  category: string
}

export default function HomePage() {
  const pathname = usePathname()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [favoritedIds, setFavoritedIds] = useState<Set<number>>(new Set())
  const [favoritingId, setFavoritingId] = useState<number | null>(null)
  const [offset, setOffset] = useState(0)
  const limit = 10
  const [minPrice, setMinPrice] = useState<string>("")
  const [maxPrice, setMaxPrice] = useState<string>("")
  const [minRating, setMinRating] = useState<number | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  useEffect(() => {
    fetchProducts(searchTerm, minPrice, maxPrice, minRating)
  }, [offset])

  const fetchProducts = async (term?: string, min?: string, max?: string, rating?: number | null) => {
    try {
      setLoading(true)
      setError(null)

      // Sempre buscar 10 produtos por vez com offset
      let url = `https://itxipifguvzltiamsdmh.supabase.co/rest/v1/products_mock?select=*&limit=${limit}&offset=${offset}`
      
      // Se tem termo de busca, adiciona o filtro na URL
      if (term && term.trim() !== "") {
        url += `&title=ilike.*${encodeURIComponent(term)}*`
      }

      // Adicionar filtros de preço se fornecidos
      if (min && min.trim() !== "") {
        url += `&price_brl=gte.${min}`
      }
      if (max && max.trim() !== "") {
        url += `&price_brl=lte.${max}`
      }

      // Adicionar filtro de rating se fornecido
      if (rating !== null) {
        url += `&rating=gte.${rating}`
      }
      if (selectedCategory) {
        url += `&category=eq.${selectedCategory}`
      }
      if (selectedCategory) {
        url += `&category=eq.${selectedCategory}`
      }
      if (selectedCategory) {
        url += `&category=eq.${selectedCategory}`
      }
      if (selectedCategory) {
        url += `&category=eq.${selectedCategory}`
      }
      if (selectedCategory) {
        url += `&category=eq.${selectedCategory}`
      }
      if (selectedCategory) {
        url += `&category=eq.${selectedCategory}`
      }
      if (selectedCategory) {
        url += `&category=eq.${selectedCategory}`
      }
      if (selectedCategory) {
        url += `&category=eq.${selectedCategory}`
      }

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml0eGlwaWZndXZ6bHRpYW1zZG1oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2OTY2MzQsImV4cCI6MjA3OTI3MjYzNH0.nZfEnv1hSYTmRYnHB8rDLZwUk2SJ6SCQCPcNwcYwt3M",
          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml0eGlwaWZndXZ6bHRpYW1zZG1oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2OTY2MzQsImV4cCI6MjA3OTI3MjYzNH0.nZfEnv1hSYTmRYnHB8rDLZwUk2SJ6SCQCPcNwcYwt3M",
          "Content-Type": "application/json"
        },
      })

      if (!response.ok) {
        throw new Error(`Erro ao buscar produtos: ${response.status}`)
      }

      const data = await response.json()
      setProducts(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido")
      console.error("Erro ao buscar produtos:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async () => {
    // Resetar offset ao fazer nova busca
    setOffset(0)
    
    // Registrar busca no Supabase antes de buscar produtos
    if (searchTerm.trim() !== "") {
      try {
        await fetch("https://itxipifguvzltiamsdmh.supabase.co/rest/v1/search_logs", {
          method: "POST",
          headers: {
            "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml0eGlwaWZndXZ6bHRpYW1zZG1oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2OTY2MzQsImV4cCI6MjA3OTI3MjYzNH0.nZfEnv1hSYTmRYnHB8rDLZwUk2SJ6SCQCPcNwcYwt3M",
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml0eGlwaWZndXZ6bHRpYW1zZG1oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2OTY2MzQsImV4cCI6MjA3OTI3MjYzNH0.nZfEnv1hSYTmRYnHB8rDLZwUk2SJ6SCQCPcNwcYwt3M",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            user_key: "user123",
            keyword: searchTerm
          })
        })
      } catch (error) {
        console.error("Erro ao registrar busca:", error)
      }
    }

    // Buscar produtos com filtros
    fetchProducts(searchTerm, minPrice, maxPrice, minRating)
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  const handleRatingChange = (value: number) => {
    const newRating = minRating === value ? null : value
    setMinRating(newRating)
    setOffset(0)
    fetchProducts(searchTerm, minPrice, maxPrice, newRating)
  }

  const handleCategoryChange = (category: string) => {
    const newCategory = selectedCategory === category ? null : category
    setSelectedCategory(newCategory)
    setOffset(0)
    fetchProducts(searchTerm, minPrice, maxPrice, minRating)
  }

  const handleFavorite = async (productId: number) => {
    try {
      setFavoritingId(productId)

      const response = await fetch(
        "https://itxipifguvzltiamsdmh.supabase.co/rest/v1/favorites",
        {
          method: "POST",
          headers: {
            apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml0eGlwaWZndXZ6bHRpYW1zZG1oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2OTY2MzQsImV4cCI6MjA3OTI3MjYzNH0.nZfEnv1hSYTmRYnHB8rDLZwUk2SJ6SCQCPcNwcYwt3M",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml0eGlwaWZndXZ6bHRpYW1zZG1oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2OTY2MzQsImV4cCI6MjA3OTI3MjYzNH0.nZfEnv1hSYTmRYnHB8rDLZwUk2SJ6SCQCPcNwcYwt3M",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_key: "user123",
            product_id: productId,
          }),
        }
      )

      console.log("Resposta favoritos:", await response.text())

      if (!response.ok) {
        alert("Erro ao favoritar produto")
        return
      }

      alert("Produto favoritado com sucesso!")
      setFavoritedIds(prev => new Set(prev).add(productId))
    } catch (error) {
      console.error("Erro na requisição de favorito:", error)
      alert("Erro inesperado ao favoritar produto")
    } finally {
      setFavoritingId(null)
    }
  }

  const handlePreviousPage = () => {
    setOffset(Math.max(offset - limit, 0))
  }

  const handleNextPage = () => {
    setOffset(offset + limit)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header Fixo */}
      <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-[#FF6B00] p-2.5 rounded-xl shadow-md">
                <Package className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  BuscAmazon
                </h1>
                <p className="text-sm text-gray-600">
                  Pesquise produtos da Amazon
                </p>
              </div>
            </div>
          </div>

          {/* Menu Horizontal */}
          <nav className="flex items-center gap-1 border-b border-gray-200">
            <Link
              href="/"
              className={`flex items-center gap-2 px-4 py-3 font-medium transition-all relative ${
                pathname === "/"
                  ? "text-[#FF6B00] border-b-2 border-[#FF6B00]"
                  : "text-gray-600 hover:text-[#FF6B00] hover:bg-gray-50"
              }`}
            >
              <Home className="w-4 h-4" />
              Home
            </Link>
            <Link
              href="/favoritos"
              className={`flex items-center gap-2 px-4 py-3 font-medium transition-all relative ${
                pathname === "/favoritos"
                  ? "text-[#FF6B00] border-b-2 border-[#FF6B00]"
                  : "text-gray-600 hover:text-[#FF6B00] hover:bg-gray-50"
              }`}
            >
              <Heart className="w-4 h-4" />
              Meus Favoritos
            </Link>
          </nav>
        </div>
      </header>

      {/* Espaçador para header fixo */}
      <div className="h-[140px]"></div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 flex-1">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          {/* Table Header */}
          <div className="bg-[#FF6B00] px-8 py-5">
            <h2 className="text-xl font-semibold text-white">
              Produtos Disponíveis
            </h2>
            <p className="text-white/90 text-sm mt-1">
              {!loading && !error && `${products.length} produtos encontrados`}
            </p>
          </div>

          {/* Search Bar */}
          <div className="p-8 border-b border-gray-200 bg-gray-50">
            <div className="flex gap-3 max-w-3xl">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Pesquisar produto..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent text-base"
                />
              </div>
              <button
                onClick={handleSearch}
                disabled={loading}
                className="px-8 py-3 bg-[#FF6B00] text-white font-semibold rounded-xl hover:bg-[#e56000] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-md hover:shadow-lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Buscando...
                  </>
                ) : (
                  "Buscar"
                )}
              </button>
            </div>
          </div>

          {/* Price Filters */}
          <div className="p-8 border-b border-gray-200 bg-gray-50">
            <div className="flex gap-4 items-end max-w-3xl">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preço mínimo (R$)
                </label>
                <input
                  type="number"
                  placeholder="0.00"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent text-base"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preço máximo (R$)
                </label>
                <input
                  type="number"
                  placeholder="0.00"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent text-base"
                />
              </div>
              <button
                onClick={handleSearch}
                disabled={loading}
                className="px-6 py-3 bg-[#FF6B00] text-white font-semibold rounded-xl hover:bg-[#e56000] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
              >
                Aplicar filtros
              </button>
            </div>
          </div>

          {/* Rating Filters */}
          <div className="p-8 border-b border-gray-200 bg-gray-50">
            <div className="max-w-3xl">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Avaliação mínima
              </label>
              <div className="flex gap-3">
                <button
                  onClick={() => handleRatingChange(4.0)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    minRating === 4.0
                      ? "bg-blue-500 text-white shadow-md"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  4.0+
                </button>
                <button
                  onClick={() => handleRatingChange(4.5)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    minRating === 4.5
                      ? "bg-blue-500 text-white shadow-md"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  4.5+
                </button>
                <button
                  onClick={() => handleRatingChange(5.0)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    minRating === 5.0
                      ? "bg-blue-500 text-white shadow-md"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  5.0
                </button>
              </div>
            </div>
          </div>

          {/* Category Filters */}
          <div className="p-8 border-b border-gray-200 bg-gray-50">
            <div className="max-w-3xl">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Categoria
              </label>
              <div className="flex flex-wrap gap-3">
                {["Cozinha", "Esportes", "Eletrônicos", "Escritório", "Casa", "Viagem", "Acessórios"].map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                      selectedCategory === category
                        ? "bg-blue-500 text-white shadow-md"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-24">
              <Loader2 className="w-14 h-14 text-[#FF6B00] animate-spin mb-4" />
              <p className="text-gray-600 font-medium">Carregando produtos...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="p-8 text-center">
              <div className="bg-red-50 border border-red-200 rounded-xl p-8 max-w-md mx-auto shadow-sm">
                <p className="text-red-800 font-semibold mb-2">
                  Erro ao carregar produtos
                </p>
                <p className="text-red-600 text-sm mb-4">{error}</p>
                <button
                  onClick={() => fetchProducts(searchTerm, minPrice, maxPrice, minRating)}
                  className="px-6 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                >
                  Tentar novamente
                </button>
              </div>
            </div>
          )}

          {/* Products Table */}
          {!loading && !error && products.length > 0 && (
            <div className="overflow-x-auto">
              {/* Desktop Table */}
              <table className="w-full hidden md:table">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-8 py-5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Título
                    </th>
                    <th className="px-8 py-5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Preço (R$)
                    </th>
                    <th className="px-8 py-5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Reviews
                    </th>
                    <th className="px-8 py-5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Avaliação
                    </th>
                    <th className="px-8 py-5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Categoria
                    </th>
                    <th className="px-8 py-5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {products.map((product) => (
                    <tr
                      key={product.id}
                      className="hover:bg-orange-50/50 transition-colors"
                    >
                      <td className="px-8 py-5">
                        <p className="text-sm font-medium text-gray-900 line-clamp-2">
                          {product.title}
                        </p>
                      </td>
                      <td className="px-8 py-5">
                        <p className="text-base font-bold text-[#22bb33]">
                          R$ {product.price_brl.toFixed(2).replace('.', ',')}
                        </p>
                      </td>
                      <td className="px-8 py-5">
                        <p className="text-sm text-gray-700 font-medium">
                          {product.reviews_count.toLocaleString()}
                        </p>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-1.5">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          <span className="text-sm font-semibold text-gray-900">
                            {product.rating.toFixed(1)}
                          </span>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-[#3b82f6]/10 text-[#3b82f6]">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/produto/${product.id}`}
                            className="flex items-center gap-1.5 px-4 py-2 bg-[#3b82f6] text-white rounded-lg hover:bg-[#2563eb] transition-all text-sm font-semibold shadow-sm hover:shadow-md"
                          >
                            <Eye className="w-4 h-4" />
                            Ver detalhes
                          </Link>
                          <button
                            onClick={() => handleFavorite(product.id)}
                            disabled={favoritingId === product.id}
                            className="flex items-center gap-2 px-4 py-2 bg-[#FF6B00]/10 text-[#FF6B00] rounded-lg hover:bg-[#FF6B00]/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm font-semibold"
                          >
                            {favoritingId === product.id ? (
                              <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Favoritando...
                              </>
                            ) : favoritedIds.has(product.id) ? (
                              <>
                                <Heart className="w-4 h-4 fill-current" />
                                <span>Favoritado</span>
                              </>
                            ) : (
                              <>
                                <Heart className="w-4 h-4" />
                                <span>Favoritar</span>
                              </>
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Mobile Cards */}
              <div className="md:hidden divide-y divide-gray-200">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="p-6 hover:bg-orange-50/50 transition-colors"
                  >
                    <h3 className="font-semibold text-gray-900 mb-4 line-clamp-2 text-base">
                      {product.title}
                    </h3>
                    <div className="grid grid-cols-2 gap-4 text-sm mb-5">
                      <div>
                        <p className="text-gray-600 text-xs mb-1 font-medium">Preço (R$)</p>
                        <p className="font-bold text-[#22bb33] text-base">
                          R$ {product.price_brl.toFixed(2).replace('.', ',')}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600 text-xs mb-1 font-medium">Reviews</p>
                        <p className="text-gray-900 font-medium">
                          {product.reviews_count.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600 text-xs mb-1 font-medium">Avaliação</p>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          <span className="font-semibold text-gray-900">
                            {product.rating.toFixed(1)}
                          </span>
                        </div>
                      </div>
                      <div>
                        <p className="text-gray-600 text-xs mb-1 font-medium">Categoria</p>
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-[#3b82f6]/10 text-[#3b82f6]">
                          {product.category}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2.5">
                      <Link
                        href={`/produto/${product.id}`}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#3b82f6] text-white rounded-lg hover:bg-[#2563eb] transition-all text-sm font-semibold shadow-sm"
                      >
                        <Eye className="w-4 h-4" />
                        Ver detalhes
                      </Link>
                      <button
                        onClick={() => handleFavorite(product.id)}
                        disabled={favoritingId === product.id}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#FF6B00]/10 text-[#FF6B00] rounded-lg hover:bg-[#FF6B00]/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm font-semibold"
                      >
                        {favoritingId === product.id ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Favoritando...
                          </>
                        ) : favoritedIds.has(product.id) ? (
                          <>
                            <Heart className="w-4 h-4 fill-current" />
                            <span>Favoritado</span>
                          </>
                        ) : (
                          <>
                            <Heart className="w-4 h-4" />
                            <span>Favoritar</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && products.length === 0 && (
            <div className="py-24 text-center">
              <Package className="w-20 h-20 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 font-semibold text-lg">
                Nenhum produto encontrado
              </p>
            </div>
          )}

          {/* Botões de Paginação - SEMPRE RENDERIZADOS */}
          {!loading && !error && (
            <div className="px-8 py-6 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={handlePreviousPage}
                  disabled={offset === 0}
                  className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-200"
                >
                  <ChevronLeft className="w-5 h-5" />
                  Anterior
                </button>
                <span className="text-sm text-gray-600 font-medium">
                  Página {Math.floor(offset / limit) + 1}
                </span>
                <button
                  onClick={handleNextPage}
                  disabled={products.length < limit}
                  className="flex items-center gap-2 px-6 py-3 bg-[#3b82f6] text-white font-semibold rounded-xl hover:bg-[#2563eb] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#3b82f6] shadow-sm hover:shadow-md"
                >
                  Próximo
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 border-t border-gray-200 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-gray-700 font-medium">
              BuscAmazon — Ferramenta experimental para estudo de mercado. Não afiliado à Amazon.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}