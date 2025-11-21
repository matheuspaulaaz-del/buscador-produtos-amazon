"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Loader2, Package, Star, Heart, ArrowLeft, Calendar, CheckCircle, AlertCircle, TrendingUp, Home } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

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

export default function ProductDetails() {
  const pathname = usePathname()
  const params = useParams()
  const router = useRouter()
  const productId = params.id as string

  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [favoriting, setFavoriting] = useState(false)
  const [favorited, setFavorited] = useState(false)

  useEffect(() => {
    if (productId) {
      fetchProduct()
    }
  }, [productId])

  const fetchProduct = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch(
        `https://itxipifguvzltiamsdmh.supabase.co/rest/v1/products_mock?select=*&id=eq.${productId}`,
        {
          method: "GET",
          headers: {
            apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml0eGlwaWZndXZ6bHRpYW1zZG1oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2OTY2MzQsImV4cCI6MjA3OTI3MjYzNH0.nZfEnv1hSYTmRYnHB8rDLZwUk2SJ6SCQCPcNwcYwt3M",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml0eGlwaWZndXZ6bHRpYW1zZG1oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2OTY2MzQsImV4cCI6MjA3OTI3MjYzNH0.nZfEnv1hSYTmRYnHB8rDLZwUk2SJ6SCQCPcNwcYwt3M",
            "Content-Type": "application/json",
          },
        }
      )

      if (!response.ok) {
        throw new Error(`Erro ao buscar produto: ${response.status}`)
      }

      const data = await response.json()
      
      if (data.length === 0) {
        throw new Error("Produto não encontrado")
      }

      setProduct(data[0])
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido")
      console.error("Erro ao buscar produto:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleFavorite = async () => {
    if (!product) return

    try {
      setFavoriting(true)

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
            product_id: product.id,
          }),
        }
      )

      if (!response.ok) {
        alert("Erro ao favoritar produto")
        return
      }

      alert("Produto favoritado com sucesso!")
      setFavorited(true)
    } catch (error) {
      console.error("Erro na requisição de favorito:", error)
      alert("Erro inesperado ao favoritar produto")
    } finally {
      setFavoriting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-14 h-14 text-[#FF6B00] animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Carregando detalhes do produto...</p>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="bg-red-50 border border-red-200 rounded-xl p-8 shadow-sm">
            <p className="text-red-800 font-semibold mb-2">Erro ao carregar produto</p>
            <p className="text-red-600 text-sm mb-4">{error}</p>
            <button
              onClick={() => router.push("/")}
              className="px-6 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
            >
              Voltar para a página inicial
            </button>
          </div>
        </div>
      </div>
    )
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
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[#FF6B00] hover:text-[#e56000] font-semibold mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar para produtos
        </Link>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          {/* Product Header */}
          <div className="bg-[#FF6B00] px-8 py-5">
            <h2 className="text-xl font-semibold text-white">Detalhes do Produto</h2>
          </div>

          {/* Product Details */}
          <div className="p-8 md:p-10">
            <div className="grid md:grid-cols-2 gap-10">
              {/* Left Column - Image */}
              <div className="flex items-center justify-center bg-gray-50 rounded-2xl p-10 shadow-inner">
                {product.image_url ? (
                  <img
                    src={product.image_url}
                    alt={product.title}
                    className="w-full h-auto rounded-lg"
                  />
                ) : (
                  <div className="flex items-center justify-center w-full aspect-square max-w-md bg-gray-200 rounded-xl">
                    <Package className="w-24 h-24 text-gray-400" />
                  </div>
                )}
              </div>

              {/* Right Column - Details */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 leading-tight">
                    {product.title}
                  </h3>
                  
                  <div className="flex items-baseline gap-2 mb-6">
                    <span className="text-5xl font-bold text-[#22bb33]">
                      R$ {product.price_brl.toFixed(2).replace('.', ',')}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-4 mb-8">
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                      <span className="text-lg font-bold text-gray-900">
                        {product.rating.toFixed(1)}
                      </span>
                      <span className="text-gray-600 font-medium">
                        ({product.reviews_count.toLocaleString()} avaliações)
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-center gap-3">
                      <span className="text-gray-600 font-semibold">Categoria:</span>
                      <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-[#3b82f6]/10 text-[#3b82f6]">
                        {product.category}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-gray-500" />
                      <span className="text-gray-600 font-medium">
                        Adicionado em: {new Date(product.created_at).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleFavorite}
                    disabled={favoriting || favorited}
                    className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-[#FF6B00] text-white font-bold rounded-xl hover:bg-[#e56000] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl text-lg"
                  >
                    {favoriting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Favoritando...
                      </>
                    ) : favorited ? (
                      <>
                        <Heart className="w-5 h-5 fill-current" />
                        Produto Favoritado
                      </>
                    ) : (
                      <>
                        <Heart className="w-5 h-5" />
                        Favoritar Produto
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Analysis Sections */}
            <div className="mt-12 grid md:grid-cols-2 gap-8">
              {/* Pontos Positivos */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-8 shadow-md">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-green-500 p-2 rounded-lg">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-green-900">
                    Pontos Positivos
                  </h4>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 text-xl font-bold mt-0.5">•</span>
                    <span className="text-green-900 font-medium leading-relaxed">
                      Alta avaliação dos clientes com {product.rating.toFixed(1)} estrelas
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 text-xl font-bold mt-0.5">•</span>
                    <span className="text-green-900 font-medium leading-relaxed">
                      Grande volume de avaliações ({product.reviews_count.toLocaleString()}) indica popularidade
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 text-xl font-bold mt-0.5">•</span>
                    <span className="text-green-900 font-medium leading-relaxed">
                      Preço competitivo na categoria {product.category}
                    </span>
                  </li>
                </ul>
              </div>

              {/* Pontos de Atenção */}
              <div className="bg-gradient-to-br from-yellow-50 to-amber-50 border-2 border-yellow-200 rounded-2xl p-8 shadow-md">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-yellow-500 p-2 rounded-lg">
                    <AlertCircle className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-yellow-900">
                    Pontos de Atenção
                  </h4>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-600 text-xl font-bold mt-0.5">•</span>
                    <span className="text-yellow-900 font-medium leading-relaxed">
                      Verifique a disponibilidade de estoque antes de comprar
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-600 text-xl font-bold mt-0.5">•</span>
                    <span className="text-yellow-900 font-medium leading-relaxed">
                      Compare preços com outros vendedores para melhor negócio
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-600 text-xl font-bold mt-0.5">•</span>
                    <span className="text-yellow-900 font-medium leading-relaxed">
                      Leia avaliações recentes para informações atualizadas
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Resumo da Oportunidade */}
            <div className="mt-8 bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-2xl p-8 shadow-md">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-[#3b82f6] p-2 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-xl font-bold text-blue-900">
                  Resumo da Oportunidade
                </h4>
              </div>
              <p className="text-blue-900 font-medium leading-relaxed text-base">
                Este produto apresenta excelente potencial de venda com base em sua alta avaliação 
                ({product.rating.toFixed(1)} estrelas) e grande volume de reviews ({product.reviews_count.toLocaleString()}). 
                O preço de R$ {product.price_brl.toFixed(2).replace('.', ',')} está bem posicionado no mercado da categoria {product.category}, 
                tornando-o uma opção atrativa para revendedores. A popularidade demonstrada pelo número de 
                avaliações indica demanda consistente e satisfação dos clientes.
              </p>
            </div>
          </div>
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
