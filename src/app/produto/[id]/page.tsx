"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import {
  Loader2,
  Star,
  ArrowLeft,
  Calendar,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Home,
  Heart,
  Package,
} from "lucide-react"

interface Product {
  id: number
  title: string
  price_brl: number
  reviews_count: number
  rating: number
  category: string
  image_url: string
  created_at: string
}

const SUPABASE_URL = "https://itxipifguvzltiamsdmh.supabase.co"
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml0eGlwaWZndXZ6bHRpYW1zZG1oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2OTY2MzQsImV4cCI6MjA3OTI3MjYzNH0.nZfEnv1hSYTmRYnHB8rDLZwUk2SJ6SCQCPcNwcYwt3M"

export default function ProductDetails() {
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const pathname = usePathname()

  const productId = Number(params?.id)

  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [favoriting, setFavoriting] = useState(false)
  const [favorited, setFavorited] = useState(false)

  useEffect(() => {
    if (!productId || Number.isNaN(productId)) {
      setError("ID de produto inválido")
      setLoading(false)
      return
    }

    const fetchProduct = async () => {
      try {
        setLoading(true)
        setError(null)

        const url = `${SUPABASE_URL}/rest/v1/products_mock?id=eq.${productId}&select=*`

        const res = await fetch(url, {
          headers: {
            apikey: SUPABASE_ANON_KEY,
            Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          },
        })

        if (!res.ok) {
          throw new Error(`Erro ao buscar produto: ${res.status}`)
        }

        const data: Product[] = await res.json()

        if (!data || data.length === 0) {
          setError("Produto não encontrado")
          setProduct(null)
        } else {
          setProduct(data[0])
        }
      } catch (err) {
        console.error(err)
        setError(
          err instanceof Error ? err.message : "Erro desconhecido ao carregar o produto"
        )
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [productId])

  const handleFavorite = async () => {
    if (!product) return

    try {
      setFavoriting(true)

      const res = await fetch(`${SUPABASE_URL}/rest/v1/favorites`, {
        method: "POST",
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_key: "user123",
          product_id: product.id,
        }),
      })

      if (!res.ok) {
        console.error("Erro ao favoritar:", await res.text())
        alert("Erro ao favoritar produto")
        return
      }

      setFavorited(true)
      alert("Produto favoritado com sucesso!")
    } catch (err) {
      console.error("Erro ao favoritar produto:", err)
      alert("Erro inesperado ao favoritar produto")
    } finally {
      setFavoriting(false)
    }
  }

  const priceFormatted =
    product?.price_brl != null
      ? `R$ ${product.price_brl.toFixed(2).replace(".", ",")}`
      : "--"

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header fixo (igual à Home) */}
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

      {/* Espaço para o header fixo */}
      <div className="h-[140px]" />

      <main className="container mx-auto px-4 py-8 flex-1">
        {/* Voltar */}
        <button
          onClick={() => router.push("/")}
          className="inline-flex items-center gap-2 text-sm font-medium text-[#FF6B00] mb-4 hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar para produtos
        </button>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          {/* Loading */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-12 h-12 text-[#FF6B00] animate-spin mb-4" />
              <p className="text-gray-600 font-medium">Carregando produto...</p>
            </div>
          )}

          {/* Erro */}
          {!loading && error && (
            <div className="p-10 flex flex-col items-center text-center">
              <AlertCircle className="w-12 h-12 text-red-500 mb-3" />
              <p className="text-lg font-semibold text-red-700 mb-2">
                Erro ao carregar o produto
              </p>
              <p className="text-sm text-red-600 mb-6">{error}</p>
              <button
                onClick={() => router.push("/")}
                className="px-6 py-2.5 bg-[#FF6B00] text-white rounded-lg font-semibold hover:bg-[#e56000] transition-all"
              >
                Voltar para a lista
              </button>
            </div>
          )}

          {/* Produto */}
          {!loading && !error && product && (
            <>
              {/* Header do produto */}
              <div className="px-8 py-6 bg-[#FF6B00] text-white flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] font-semibold text-white/80 mb-1">
                    Detalhes do Produto
                  </p>
                  <h2 className="text-2xl md:text-3xl font-bold">
                    {product.title}
                  </h2>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm text-white/90">Preço estimado</p>
                    <p className="text-2xl md:text-3xl font-black text-[#22bb33] drop-shadow-sm">
                      {priceFormatted}
                    </p>
                  </div>
                </div>
              </div>

              {/* Conteúdo principal */}
              <div className="p-8 grid grid-cols-1 lg:grid-cols-[1.2fr,1.1fr] gap-8">
                {/* Imagem */}
                <div className="bg-gray-50 rounded-2xl border border-dashed border-gray-200 flex items-center justify-center min-h-[260px]">
                  {product.image_url ? (
                    // usando <img> simples para evitar config extra do next/image
                    <img
                      src={product.image_url}
                      alt={product.title}
                      className="max-h-64 object-contain"
                    />
                  ) : (
                    <div className="flex flex-col items-center text-gray-400">
                      <Package className="w-16 h-16 mb-2" />
                      <p className="text-sm">Imagem não disponível</p>
                    </div>
                  )}
                </div>

                {/* Infos do produto */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 flex-wrap">
                    <div className="flex items-center gap-1.5 bg-yellow-50 text-yellow-800 px-3 py-1.5 rounded-full text-sm font-semibold">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{product.rating.toFixed(1)}</span>
                      <span className="text-xs text-yellow-700/80">
                        ({product.reviews_count.toLocaleString()} avaliações)
                      </span>
                    </div>
                    <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700">
                      {product.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>
                      Adicionado em:{" "}
                      {new Date(product.created_at).toLocaleDateString("pt-BR")}
                    </span>
                  </div>

                  <button
                    onClick={handleFavorite}
                    disabled={favoriting || favorited}
                    className="mt-4 inline-flex items-center justify-center gap-2 w-full md:w-auto px-6 py-3 rounded-xl font-semibold text-white bg-[#FF6B00] hover:bg-[#e56000] transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
                  >
                    {favoriting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Favoritando...
                      </>
                    ) : favorited ? (
                      <>
                        <Heart className="w-4 h-4 fill-current" />
                        Produto favoritado
                      </>
                    ) : (
                      <>
                        <Heart className="w-4 h-4" />
                        Favoritar Produto
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Blocos de análise rápida */}
              <div className="px-8 pb-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-green-50 border border-green-100 rounded-2xl p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <h3 className="font-semibold text-green-800">
                      Pontos Positivos
                    </h3>
                  </div>
                  <ul className="text-sm text-green-900 space-y-1.5 list-disc list-inside">
                    <li>
                      Boa avaliação média ({product.rating.toFixed(1)} estrelas)
                    </li>
                    <li>
                      Volume interessante de reviews (
                      {product.reviews_count.toLocaleString()} avaliações)
                    </li>
                    <li>Categoria popular na Amazon Brasil ({product.category})</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 border border-yellow-100 rounded-2xl p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp className="w-5 h-5 text-yellow-700" />
                    <h3 className="font-semibold text-yellow-800">
                      Pontos de Atenção
                    </h3>
                  </div>
                  <ul className="text-sm text-yellow-900 space-y-1.5 list-disc list-inside">
                    <li>Verifique estoque e prazo de entrega no anúncio real</li>
                    <li>Compare com concorrentes na mesma faixa de preço</li>
                    <li>
                      Leia reviews recentes para entender reclamações atuais
                    </li>
                  </ul>
                </div>
              </div>
            </>
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
