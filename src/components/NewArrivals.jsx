import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const products = [
  {
    id: 1,
    category: 'Lighting',
    name: 'Japandi Pendant Light',
    description:
      'A harmonious blend of Japanese minimalism and Scandinavian warmth.',
    price: '$189',
    image:
      'https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 2,
    category: 'Furniture',
    name: 'Minimalist Sideboard',
    description:
      'Clean lines, functional storage, timeless appeal.',
    price: '$1,250',
    image:
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 3,
    category: 'Lighting',
    name: 'Ceramic Table Lamp',
    description:
      'Handcrafted ceramic with a soft, natural finish.',
    price: '$129',
    image:
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 4,
    category: 'Furniture',
    name: 'Oak Lounge Chair',
    description:
      'Warm oak craftsmanship paired with natural upholstery.',
    price: '$890',
    image:
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 5,
    category: 'Decor',
    name: 'Organic Ceramic Vase',
    description:
      'A sculptural accent inspired by natural forms.',
    price: '$95',
    image:
      'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 6,
    category: 'Furniture',
    name: 'Natural Oak Console',
    description:
      'Refined storage with beautifully finished natural oak.',
    price: '$1,450',
    image:
      'https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&w=900&q=85',
  },
]

function NewArrivals() {
  const sliderRef = useRef(null)

  const [activePage, setActivePage] = useState(0)
  const [favorites, setFavorites] = useState([])

  const itemsPerPage = 3
  const totalPages = Math.ceil(products.length / itemsPerPage)

  const toggleFavorite = (id) => {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    )
  }

  const scrollToPage = (page) => {
    const slider = sliderRef.current

    if (!slider) return

    const card = slider.querySelector('[data-product-card]')

    if (!card) return

    const cardWidth = card.offsetWidth
    const gap = 24

    slider.scrollTo({
      left: page * ((cardWidth + gap) * itemsPerPage),
      behavior: 'smooth',
    })

    setActivePage(page)
  }

  const nextPage = () => {
    const next =
      activePage >= totalPages - 1
        ? 0
        : activePage + 1

    scrollToPage(next)
  }

  const previousPage = () => {
    const previous =
      activePage <= 0
        ? totalPages - 1
        : activePage - 1

    scrollToPage(previous)
  }

  useEffect(() => {
    const slider = sliderRef.current

    if (!slider) return

    const handleScroll = () => {
      const card = slider.querySelector('[data-product-card]')

      if (!card) return

      const cardWidth = card.offsetWidth
      const gap = 24

      const pageWidth = (cardWidth + gap) * itemsPerPage

      const page = Math.round(slider.scrollLeft / pageWidth)

      setActivePage(
        Math.min(Math.max(page, 0), totalPages - 1)
      )
    }

    slider.addEventListener('scroll', handleScroll, {
      passive: true,
    })

    return () => {
      slider.removeEventListener('scroll', handleScroll)
    }
  }, [totalPages])

  return (
    <section className="overflow-hidden bg-[#f7f5f1] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">

      <div className="mx-auto max-w-[1400px]">

        <div className="grid gap-10 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-14 xl:grid-cols-[320px_minmax(0,1fr)]">


          {/* =====================================================
              LEFT INTRO
          ====================================================== */}

          <div className="flex flex-col justify-center">

            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#344a22]">
              Fresh finds, timeless appeal
            </p>


            <h2 className="mt-8 font-serif text-[52px] leading-[0.9] tracking-tight text-[#242420] sm:text-[60px]">

              New

              <br />

              <em className="font-serif font-normal italic text-[#405f28]">
                Arrivals
              </em>

            </h2>


            <p className="mt-9 max-w-[290px] text-sm leading-6 text-[#777873]">
              Thoughtfully selected pieces to bring beauty, comfort,
              and balance into your everyday living.
            </p>


            <Link
              to="/products"
              className="group mt-9 flex w-fit items-center gap-5 rounded-full bg-[#344f21] px-7 py-4 text-xs font-semibold text-white transition duration-300 hover:bg-[#293e1a]"
            >

              <span>
                Explore All New Arrivals
              </span>

              <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>

            </Link>

          </div>


          {/* =====================================================
              PRODUCT SLIDER
          ====================================================== */}

          <div className="relative min-w-0">

            {/* Slider */}

            <div
              ref={sliderRef}
              className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >

              {products.map((product) => (

                <article
                  key={product.id}
                  data-product-card
                  className="group w-[calc(100%-35px)] shrink-0 snap-start overflow-hidden rounded-[22px] border border-[#e2dfd8] bg-[#fbfaf8] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
                >

                  {/* Product Image */}

                  <div className="relative aspect-[0.96] overflow-hidden">

                    <Link to={`/products/${product.id}`}>

                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
                      />

                    </Link>


                    {/* Image overlay */}

                    <div className="absolute inset-0 bg-black/5" />


                    {/* Wishlist */}

                    <button
                      type="button"
                      onClick={() =>
                        toggleFavorite(product.id)
                      }
                      aria-label="Add to favorites"
                      className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#20231d] shadow-sm transition hover:scale-105"
                    >

                      <svg
                        viewBox="0 0 24 24"
                        fill={
                          favorites.includes(product.id)
                            ? 'currentColor'
                            : 'none'
                        }
                        stroke="currentColor"
                        strokeWidth="1.6"
                        className="h-5 w-5"
                      >
                        <path d="M20.8 8.8c0 5.5-8.8 10.4-8.8 10.4S3.2 14.3 3.2 8.8A4.8 4.8 0 0 1 8 4c1.7 0 3.2.9 4 2.2C12.8 4.9 14.3 4 16 4a4.8 4.8 0 0 1 4.8 4.8Z" />
                      </svg>

                    </button>

                  </div>


                  {/* Product Content */}

                  <div className="flex min-h-[210px] flex-col p-6">

                    <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#888984]">
                      {product.category}
                    </p>


                    <Link
                      to={`/products/${product.id}`}
                      className="mt-3 font-serif text-[19px] leading-tight text-[#302f2b] transition hover:text-[#405f28]"
                    >
                      {product.name}
                    </Link>


                    <p className="mt-2 line-clamp-2 text-xs leading-5 text-[#85847f]">
                      {product.description}
                    </p>


                    {/* Price + Add */}

                    <div className="mt-auto flex items-center justify-between pt-6">

                      <span className="text-base font-semibold text-[#22231f]">
                        {product.price}
                      </span>


                      <button
                        type="button"
                        aria-label={`Add ${product.name} to cart`}
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-[#344f21] text-white transition duration-300 hover:scale-105 hover:bg-[#293e1a]"
                      >

                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.7"
                          className="h-4 w-4"
                        >
                          <path d="M12 5v14M5 12h14" />
                        </svg>

                      </button>

                    </div>

                  </div>

                </article>

              ))}

            </div>


            {/* =================================================
                NEXT ARROW
            ================================================== */}

            <button
              type="button"
              onClick={nextPage}
              aria-label="Next products"
              className="absolute -right-3 top-[36%] z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#242720] shadow-[0_5px_20px_rgba(0,0,0,0.12)] transition hover:scale-105 sm:-right-5"
            >

              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="h-5 w-5"
              >
                <path d="M5 12h13" />
                <path d="m13 6 6 6-6 6" />
              </svg>

            </button>


            {/* =================================================
                PAGINATION
            ================================================== */}

            <div className="mt-8 flex items-center gap-2">

              {Array.from({
                length: totalPages,
              }).map((_, index) => (

                <button
                  key={index}
                  type="button"
                  onClick={() => scrollToPage(index)}
                  aria-label={`Go to page ${index + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    activePage === index
                      ? 'w-8 bg-[#405f28]'
                      : 'w-2 bg-[#d4d1c9]'
                  }`}
                />

              ))}

            </div>

          </div>

        </div>

      </div>

    </section>
  )
}

export default NewArrivals