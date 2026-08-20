import { useEffect, useState } from 'react'

const stats = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M12 3 5 6v5c0 4.5 2.8 7.8 7 10 4.2-2.2 7-5.5 7-10V6l-7-3Z" />
        <path d="m9.5 12 1.7 1.7 3.5-3.5" />
      </svg>
    ),
    title: 'QUALITY CRAFTSMANSHIP',
    text: 'Furniture built with care and attention to detail',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M5 10.5 12 4l7 6.5v8a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-8Z" />
        <path d="M9 20v-5h6v5" />
      </svg>
    ),
    title: 'LOCAL CRAFTSMANSHIP',
    text: 'Proudly serving homes in Tarlac City',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="12" cy="12" r="8" />
        <path d="M8 12h8M12 8v8" />
      </svg>
    ),
    title: 'BUILT FOR YOUR HOME',
    text: 'Furniture designed for everyday living',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M4 12h16" />
        <path d="M12 4v16" />
        <circle cx="12" cy="12" r="8" />
      </svg>
    ),
    title: 'ESTABLISHED 2024',
    text: 'A growing local furniture brand',
  },
]

function AboutUs() {
  const [products, setProducts] = useState([])
  const [loadingProducts, setLoadingProducts] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products')

        if (!response.ok) {
          throw new Error('Failed to fetch products')
        }

        const data = await response.json()

        // Supports either:
        // { products: [...] }
        // or directly [...]
        const productList = Array.isArray(data)
          ? data
          : data.products || data.data || []

        setProducts(productList.slice(0, 2))
      } catch (error) {
        console.error('Error loading products:', error)
      } finally {
        setLoadingProducts(false)
      }
    }

    fetchProducts()
  }, [])

  return (
    <section className="bg-[#faf9f7] px-6 py-20 sm:px-8 lg:px-12 lg:py-28">

      <div className="mx-auto max-w-[1350px]">

        <div className="grid items-center gap-10 lg:grid-cols-[310px_minmax(380px,400px)_1fr] lg:gap-7 xl:grid-cols-[310px_405px_1fr]">

          {/* =====================================================
              IMAGE
          ====================================================== */}

          <div className="relative mx-auto w-full max-w-[310px]">

            <div className="relative aspect-[0.72] overflow-hidden rounded-[24px]">

              <img
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=90"
                alt="Ignacio Furnitures interior"
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-black/[0.03]" />

              {/* Established Badge */}

              <div className="absolute bottom-6 left-6 rounded-full bg-[#344f21] px-6 py-3 shadow-lg">

                <span className="font-serif text-sm font-semibold italic text-white">
                  Est. 2024
                </span>

              </div>

            </div>

          </div>


          {/* =====================================================
              COMPANY CONTENT
          ====================================================== */}

          <div>

            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#344f21]">
              About Ignacio Furnitures
            </p>

            <h2 className="mt-6 font-serif text-[43px] leading-[1.02] tracking-[-0.025em] text-[#10263b] sm:text-[50px]">

              Furniture made
              <br />

              for your

              <br />

              <em className="font-serif font-normal italic text-[#46612f]">
                home.
              </em>

            </h2>

            <p className="mt-7 max-w-[390px] text-[16px] leading-[1.65] text-[#718093]">
              Ignacio Furnitures creates practical, beautiful and dependable
              furniture for modern Filipino homes. Founded in 2024, we are
              committed to bringing quality craftsmanship and timeless designs
              to families in Tarlac City and beyond.
            </p>

            <p className="mt-4 max-w-[390px] text-[15px] leading-[1.65] text-[#718093]">
              Led by CEO Jhomel Ignacio, our goal is simple — to create
              furniture that looks beautiful, feels right at home, and is
              made to be enjoyed for years to come.
            </p>


            {/* Company Details */}

            <div className="mt-7 space-y-2 text-sm text-[#718093]">

              <div>
                <span className="font-semibold text-[#10263b]">
                  Founded:
                </span>{' '}
                2024
              </div>

              <div>
                <span className="font-semibold text-[#10263b]">
                  CEO:
                </span>{' '}
                Jhomel Ignacio
              </div>

              <div>
                <span className="font-semibold text-[#10263b]">
                  Location:
                </span>{' '}
                Barangay Care, Tarlac City
              </div>

            </div>


            {/* CTA */}

            <a
              href="/about"
              className="mt-8 inline-flex items-center gap-5 rounded-full bg-[#344f21] px-6 py-4 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#293e1a] hover:shadow-lg"
            >
              Our Story

              <span className="text-lg leading-none">
                →
              </span>

            </a>

          </div>


          {/* =====================================================
              RIGHT SIDE
          ====================================================== */}

          <div className="space-y-5">

            {/* =====================================================
                COMPANY STATS
            ====================================================== */}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

              {stats.map((stat) => (

                <div
                  key={stat.title}
                  className="
                    group
                    flex
                    min-h-[105px]
                    items-center
                    gap-4
                    rounded-[24px]
                    bg-[#344f21]
                    px-5
                    py-5
                    text-white
                    shadow-[0_10px_25px_rgba(43,64,29,0.10)]
                    transition
                    duration-300
                    hover:-translate-y-1
                    hover:shadow-[0_15px_30px_rgba(43,64,29,0.16)]
                  "
                >

                  <div className="flex h-9 w-9 shrink-0 items-center justify-center">

                    <div className="h-6 w-6 text-white">
                      {stat.icon}
                    </div>

                  </div>

                  <div>

                    <h3 className="text-[13px] font-bold tracking-tight">
                      {stat.title}
                    </h3>

                    <p className="mt-1 text-[11px] leading-5 text-white/70">
                      {stat.text}
                    </p>

                  </div>

                </div>

              ))}

            </div>


            {/* =====================================================
                FEATURED PRODUCTS
            ====================================================== */}

            <div className="rounded-[28px] bg-white p-5 shadow-[0_10px_30px_rgba(0,0,0,0.06)]">

              <div className="mb-4 flex items-center justify-between">

                <div>

                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#344f21]">
                    From Our Collection
                  </p>

                  <h3 className="mt-1 font-serif text-xl text-[#10263b]">
                    Featured Furniture
                  </h3>

                </div>

                <a
                  href="/products"
                  className="text-xs font-semibold text-[#344f21] transition hover:underline"
                >
                  View All →
                </a>

              </div>


              {loadingProducts ? (

                <div className="grid grid-cols-2 gap-3">

                  {[1, 2].map((item) => (

                    <div
                      key={item}
                      className="animate-pulse overflow-hidden rounded-[18px] bg-[#f3f3f0]"
                    >
                      <div className="aspect-[1.15] bg-[#e8e8e3]" />

                      <div className="space-y-2 p-3">

                        <div className="h-3 w-3/4 rounded bg-[#deded8]" />

                        <div className="h-2 w-1/2 rounded bg-[#deded8]" />

                      </div>

                    </div>

                  ))}

                </div>

              ) : products.length > 0 ? (

                <div className="grid grid-cols-2 gap-3">

                  {products.map((product) => {

                    const image =
                      product.image ||
                      product.image_url ||
                      product.thumbnail ||
                      product.featured_image ||
                      product.images?.[0] ||
                      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80'

                    const name =
                      product.name ||
                      product.title ||
                      'Furniture'

                    const price =
                      product.price ||
                      product.sale_price ||
                      product.regular_price

                    const slug =
                      product.slug ||
                      product.id

                    return (

                      <a
                        key={product.id || slug || name}
                        href={`/products/${product.id}`}
                        className="
                          group
                          overflow-hidden
                          rounded-[18px]
                          bg-[#f5f4f0]
                          transition
                          duration-300
                          hover:-translate-y-1
                          hover:shadow-md
                        "
                      >

                        <div className="aspect-[1.15] overflow-hidden">

                          <img
                            src={image}
                            alt={name}
                            className="
                              h-full
                              w-full
                              object-cover
                              transition
                              duration-500
                              group-hover:scale-105
                            "
                          />

                        </div>

                        <div className="p-3">

                          <h4 className="truncate text-[13px] font-semibold text-[#10263b]">
                            {name}
                          </h4>

                          {price && (
                            <p className="mt-1 text-[12px] font-medium text-[#344f21]">
                              ₱{Number(price).toLocaleString('en-PH')}
                            </p>
                          )}

                        </div>

                      </a>

                    )

                  })}

                </div>

              ) : (

                <div className="rounded-[18px] bg-[#f5f4f0] px-5 py-8 text-center">

                  <p className="text-sm text-[#718093]">
                    Explore our furniture collection.
                  </p>

                  <a
                    href="/products"
                    className="mt-3 inline-block text-sm font-semibold text-[#344f21]"
                  >
                    Browse Products →
                  </a>

                </div>

              )}

            </div>

          </div>

        </div>

      </div>

    </section>
  )
}

export default AboutUs