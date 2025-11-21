"use client"

import { useEffect, useState } from "react"
import { Loader2, Package, Star, Trash2, Home, Heart } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface ProductMock {
  id: number
  title: string
  price_brl: number
  reviews_count: number
  rating: number
  category: string
}

interface Favorite {
  id: number
  product_id: number
  created_at: string
  products_mock: ProductMock
}

export default function FavoritosPage() {
  const pathname = usePathname()
  const [favorites, setFavorites] = useState<Favorite[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [removingId, setRemovingId] = useState<number | null>(null)

  useEffect(() => {
    fetchFavorites()
  }, [])

  const fetchFavorites = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch(
        "https://itxipifguvzltiamsdmh.supabase.co/rest/v1/favorites?select=id,product_id,created_at,products_mock(*)&user_key=eq.user123",
        {
          method: "GET",
          headers: {
            apikey:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml0eGlwaWZndXZ6bHRpYW1zZG1oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2OTY2MzQsImV4cCI6MjA3OTI3MjYzNH0.nZfEnv1hSYTmRYnHB8rDLZwUk2SJ6SCQCPcNwcYwt3M",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml0eGlwaWZndXZ6bHRpYW1zZG1oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2OTY2MzQsImV4cCI6MjA3OTI3MjYzNH0.nZfEnv1hSYTmRYnHB8rDLZwUk2SJ6SCQCPcNwcYwt3M",
            "Content-Type": "application/json",
          },
        }
      )

      if (!response.ok) {
        throw new Error(`Erro ao buscar favoritos: ${response.status}`)
      }

      const data = await response.json()
      setFavorites(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido")
      console.error("Erro ao buscar favoritos:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleRemoveFavorite = async (favoriteId: number) => {
    try {
      setRemovingId(favoriteId)

      const response = await fetch(
        `https://itxipifguvzltiamsdmh.supabase.co/rest/v1/favorites?id=eq.${favoriteId}`,
        {
          method: "DELETE",
          headers: {
            apikey:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml0eGlwaWZndXZ6bHRpYW1zZG1oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2OTY2MzQsImV4cCI6MjA3OTI3MjYzNH0.nZfEnv1hSYTmRYnHB8rDLZwUk2SJ6SCQCPcNwcYwt3M",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml0eGlwaWZndXZ6bHRpYW1zZG1oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2OTY2MzQsImV4cCI6MjA3OTI3MjYzNH0.nZfEnv1hSYTmRYnHB8rDLZwUk2SJ6SCQCPcNwcYwt3M",
            "Content-Type": "application/json",
          },
        }
      )

      if (!response.ok) {
        alert("Erro ao remover favorito")
        return
      }

      // Atualizar a lista removendo o item
      setFavorites((prev) => prev.filter((fav) => fav.id !== favoriteId))
      alert("Produto removido dos favoritos!")
    } catch (error) {
      console.error("Erro ao remover favorito:", error)
      alert("Erro inesperado ao remover favorito")
    } finally {
      setRemovingId(null)
    }
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
              Seus Produtos Favoritos
            </h2>
            <p className="text-white/90 text-sm mt-1">
              {!loading && !error && `${favorites.length} produtos favoritados`}
            </p>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-24">
              <Loader2 className="w-14 h-14 text-[#FF6B00] animate-spin mb-4" />
              <p className="text-gray-600 font-medium">Carregando favoritos...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="p-8 text-center">
              <div className="bg-red-50 border border-red-200 rounded-xl p-8 max-w-md mx-auto shadow-sm">
                <p className="text-red-800 font-semibold mb-2">
                  Erro ao carregar favoritos
                </p>
                <p className="text-red-600 text-sm mb-4">{error}</p>
                <button
                  onClick={fetchFavorites}
                  className="px-6 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                >
                  Tentar novamente
                </button>
              </div>
            </div>
          )}

          {/* Favorites Table */}
          {!loading && !error && favorites.length > 0 && (
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
                  {favorites.map((favorite) => (
                    <tr
                      key={favorite.id}
                      className="hover:bg-orange-50/50 transition-colors"
                    >
                      <td className="px-8 py-5">
                        <p className="text-sm font-medium text-gray-900 line-clamp-2">
                          {favorite.products_mock.title}
                        </p>
                      </td>
                      <td className="px-8 py-5">
                        <p className="text-base font-bold text-[#22bb33]">
                          R$ {favorite.products_mock.price_brl.toFixed(2).replace('.', ',')}
                        </p>
                      </td>
                      <td className="px-8 py-5">
                        <p className="text-sm text-gray-700 font-medium">
                          {favorite.products_mock.reviews_count.toLocaleString()}
                        </p>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-1.5">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          <span className="text-sm font-semibold text-gray-900">
                            {favorite.products_mock.rating.toFixed(1)}
                          </span>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-[#3b82f6]/10 text-[#3b82f6]">
                          {favorite.products_mock.category}
                        </span>
                      </td>
                      <td className="px-8 py-5">
                        <button
                          onClick={() => handleRemoveFavorite(favorite.id)}
                          disabled={removingId === favorite.id}
                          className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm font-semibold shadow-sm"
                        >
                          {removingId === favorite.id ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              Removendo...
                            </>
                          ) : (
                            <>
                              <Trash2 className="w-4 h-4" />
                              Remover
                            </>
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Mobile Cards */}
              <div className="md:hidden divide-y divide-gray-200">
                {favorites.map((favorite) => (
                  <div
                    key={favorite.id}
                    className="p-6 hover:bg-orange-50/50 transition-colors"
                  >
                    <h3 className="font-semibold text-gray-900 mb-4 line-clamp-2 text-base">
                      {favorite.products_mock.title}
                    </h3>
                    <div className="grid grid-cols-2 gap-4 text-sm mb-5">
                      <div>
                        <p className="text-gray-600 text-xs mb-1 font-medium">Preço (R$)</p>
                        <p className="font-bold text-[#22bb33] text-base">
                          R$ {favorite.products_mock.price_brl.toFixed(2).replace('.', ',')}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600 text-xs mb-1 font-medium">Reviews</p>
                        <p className="text-gray-900 font-medium">
                          {favorite.products_mock.reviews_count.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600 text-xs mb-1 font-medium">Avaliação</p>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          <span className="font-semibold text-gray-900">
                            {favorite.products_mock.rating.toFixed(1)}
                          </span>
                        </div>
                      </div>
                      <div>
                        <p className="text-gray-600 text-xs mb-1 font-medium">Categoria</p>
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-[#3b82f6]/10 text-[#3b82f6]">
                          {favorite.products_mock.category}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveFavorite(favorite.id)}
                      disabled={removingId === favorite.id}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm font-semibold shadow-sm"
                    >
                      {removingId === favorite.id ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Removendo...
                        </>
                      ) : (
                        <>
                          <Trash2 className="w-4 h-4" />
                          Remover dos Favoritos
                        </>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && favorites.length === 0 && (
            <div className="py-24 text-center">
              <Package className="w-20 h-20 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 font-semibold text-lg">
                Você ainda não tem favoritos
              </p>
              <p className="text-gray-500 text-sm mt-2 mb-6">
                Adicione produtos aos favoritos na página principal
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF6B00] text-white rounded-xl hover:bg-[#e56000] transition-all text-sm font-semibold shadow-md hover:shadow-lg"
              >
                <Home className="w-4 h-4" />
                Ir para Produtos
              </Link>
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
