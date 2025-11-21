"use client"

import { useEffect, useState } from "react"
import { Package, Star, Loader2, Home, Heart, ChevronLeft } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface Product {
  id: number
  title: string
  price_brl: number
  reviews_count: number
  rating: number
  category: string
}

interface FavoriteRow {
  product_id: number
}

const SUPABASE_URL = "https://itxipifguvzltiamsdmh.supabase.co"
const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml0eGlwaWZndXZ6bHRpYW1zZG1oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2OTY2MzQsImV4cCI6MjA3OTI3MjYzNH0.nZfEnv1hSYTmRYnHB8rDLZwUk2SJ6SCQCPcNwcYwt3M"

export default function FavoritosPage() {
  const pathname = usePathname()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // user_key fixo por enquanto
  const USER_KEY = "user123"

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        setLoading(true)
        setError(null)

        // 1) Buscar ids dos favoritos
        const favUrl = `${SUPABASE_URL}/rest/v1/favorites?user_key=eq.${USER_KEY}&select=product_id`

        const favRes = await fetch(favUrl, {
          method: "GET",
          headers: {
            apikey: API_KEY,
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
          },
        })

        if (!favRes.ok) {
          throw new Error(`Erro ao buscar favoritos: ${favRes.status}`)
        }

        const favData: FavoriteRow[] = await favRes.json()
        const ids = favData.map((f) => f.product_id)

        if (ids.length === 0) {
          setProducts([])
          return
        }

        // 2) Buscar dados dos produtos favoritados
        const idsList = ids.join(",")
        const prodUrl = `${SUPABASE_URL}/rest/v1/products_mock?select=*&id=in.(${idsList})`

        const prodRes = await fetch(prodUrl, {
          method: "GET",
          headers: {
            apikey: API_KEY,
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
          },
        })

        if (!prodRes.ok) {
          throw new Error(`Erro ao buscar produtos: ${prodRes.status}`)
        }

        const prodData: Product[] = await prodRes.json()
        setProducts(prodData)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro desconhecido")
        console.error("Erro ao carregar favoritos:", err)
      } finally {
        setLoading(false)
      }
    }

    loadFavorites()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header Fixo (igual Home) */}
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

      {/* espaçador header */}
      <div className="h-[140px]" />

      <main className="container mx-auto px-4 py-8 flex-1">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="bg-[#FF6B00] px-8 py-5 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white">
                Meus Favoritos
              </h2>
              <p className="text-white/90 text-sm mt-1">
                {!loading && !error && `${products.length} produtos salvos`}
              </p>
            </div>
            <Link
              href="/"
              className="flex items-center gap-2 text-white/90 hover:text-white text-sm font-medium"
            >
              <ChevronLeft className="w-4 h-4" />
              Voltar para Home
            </Link>
          </div>

          {/* estados */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-24">
              <Loader2 className="w-14 h-14 text-[#FF6B00] animate-spin mb-4" />
              <p className="text-gray-600 font-medium">
                Carregando favoritos...
              </p>
            </div>
          )}

          {error && (
            <div className="p-8 text-center">
              <div className="bg-red-50 border border-red-200 rounded-xl p-8 max-w-md mx-auto shadow-sm">
                <p className="text-red-800 font-semibold mb-2">
                  Erro ao carregar favoritos
                </p>
                <p className="text-red-600 text-sm mb-4">{error}</p>
              </div>
            </div>
          )}

          {!loading && !error && products.length === 0 && (
            <div className="py-24 text-center">
              <Package className="w-20 h-20 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-700 font-semibold text-lg mb-2">
                Você ainda não favoritou nenhum produto
              </p>
              <p className="text-gray-500 text-sm">
                Volte para a Home e clique em &quot;Favoritar&quot; em algum
                produto para ele aparecer aqui.
              </p>
            </div>
          )}

          {!loading && !error && products.length > 0 && (
            <div className="divide-y divide-gray-200">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 hover:bg-orange-50/50 transition-colors"
                >
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
                      {product.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                      <span className="font-bold text-[#22bb33] text-base">
                        R$ {product.price_brl.toFixed(2).replace(".", ",")}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="font-semibold text-gray-900">
                          {product.rating.toFixed(1)}
                        </span>
                        <span className="text-gray-500 text-xs">
                          ({product.reviews_count.toLocaleString()} reviews)
                        </span>
                      </span>
                      <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-[#3b82f6]/10 text-[#3b82f6]">
                        {product.category}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Link
                      href={`/produto/${product.id}`}
                      className="flex items-center gap-1.5 px-4 py-2 bg-[#3b82f6] text-white rounded-lg hover:bg-[#2563eb] transition-all text-sm font-semibold shadow-sm hover:shadow-md"
                    >
                      Ver detalhes
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <footer className="bg-gray-100 border-t border-gray-200 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-gray-700 font-medium">
              BuscAmazon — Ferramenta experimental para estudo de mercado. Não
              afiliado à Amazon.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
