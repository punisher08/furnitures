import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const slides = [
  {
    id: 1,
    image:
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85',
    label: 'EDITORIAL',
    title: 'The Autumn Edit',
    description: 'Discover Now',
    thumbnail:
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 2,
    image:
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=85',
    label: 'NEW COLLECTION',
    title: 'Natural Living',
    description: 'Explore Collection',
    thumbnail:
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 3,
    image:
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1600&q=85',
    label: 'THE STUDIO',
    title: 'Quiet Luxury',
    description: 'Discover More',
    thumbnail:
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=300&q=80',
  },
]

function LuxuryBanner() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((current) =>
      current === slides.length - 1 ? 0 : current + 1
    )
  }

  const previousSlide = () => {
    setCurrentSlide((current) =>
      current === 0 ? slides.length - 1 : current - 1
    )
  }

  // Automatic slider
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 6000)

    return () => clearInterval(interval)
  }, [])

  const slide = slides[currentSlide]

  return (
    <section className="bg-[#f7f6f2] px-5 py-6 sm:px-8 lg:px-12 lg:py-12">

      <div className="mx-auto grid max-w-[1500px] gap-4 lg:grid-cols-[0.92fr_1.35fr]">

        {/* =====================================================
            LEFT COLUMN
        ====================================================== */}

        <div className="relative flex min-h-[580px] overflow-hidden rounded-[24px] bg-[#405f28] px-10 py-12 text-white sm:px-16 lg:min-h-[680px] lg:px-20 lg:py-20">

          {/* Decorative dots */}

          <div className="absolute left-7 top-1/2 flex -translate-y-1/2 flex-col gap-2">

            <span className="h-2 w-2 rounded-full bg-white/25" />

            <span className="relative flex h-3 w-3 items-center justify-center">
              <span className="absolute h-3 w-3 rounded-full border border-white/60" />
              <span className="h-1.5 w-1.5 rounded-full bg-white" />
            </span>

            <span className="h-2 w-2 rounded-full bg-white/25" />

          </div>


          <div className="my-auto max-w-[560px]">

            {/* Eyebrow */}

            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/75 sm:text-xs">
              Organic textures. Elevated form.
            </p>


            {/* Heading */}

            <h1 className="mt-10 font-serif text-5xl leading-[0.98] tracking-tight sm:text-6xl lg:text-[62px]">

              Tactile comfort.
              <br />

              Modern{' '}

              <em className="font-serif font-normal italic">
                living.
              </em>

            </h1>


            {/* Description */}

            <p className="mt-8 max-w-[470px] text-sm leading-7 text-white/85 sm:text-base">
              Immerse your space in the richness of raw timbers,
              certified organic cotton, and hand-finished premium
              hardware.
            </p>


            {/* Buttons */}

            <div className="mt-10 flex flex-wrap items-center gap-7">

              <Link
                to="/products"
                className="group inline-flex items-center gap-5 rounded-full bg-white px-7 py-4 text-xs font-semibold text-[#344a22] transition hover:bg-[#f0eee8]"
              >
                Explore Furniture

                <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>


              <Link
                to="/collections"
                className="border-b border-white/50 pb-1 text-xs font-semibold text-white transition hover:border-white"
              >
                Explore Collections
              </Link>

            </div>

          </div>

        </div>


        {/* =====================================================
            RIGHT COLUMN — SLIDER
        ====================================================== */}

        <div className="relative min-h-[580px] overflow-hidden rounded-[24px] bg-stone-200 lg:min-h-[680px]">

          {/* Slides */}

          {slides.map((item, index) => (

            <div
              key={item.id}
              className={`absolute inset-0 transition-opacity duration-700 ${
                index === currentSlide
                  ? 'z-10 opacity-100'
                  : 'z-0 opacity-0'
              }`}
            >

              <img
                src={item.image}
                alt={item.title}
                className="h-full w-full object-cover"
              />

              {/* Image overlay */}

              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/5" />

            </div>

          ))}


          {/* =================================================
              CRAFTED BADGE
          ================================================== */}

          <div className="absolute right-5 top-5 z-20 flex h-28 w-28 rotate-6 items-center justify-center rounded-full bg-[#f7f6f2] shadow-lg sm:right-7 sm:top-7">

            <div className="absolute inset-3 rounded-full border border-[#6d7e5b]/40" />

            <div className="relative text-center">

              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="#405f28"
                strokeWidth="1.4"
                className="mx-auto h-6 w-6"
              >
                <path d="M12 20V8" />
                <path d="M12 8C8 8 6 5 6 3c4 0 6 2 6 5" />
                <path d="M12 10c4 0 6-3 6-6-4 0-6 2-6 6" />
              </svg>

              <span className="mt-1 block text-[7px] font-semibold uppercase tracking-[0.18em] text-[#647452]">
                Natural
              </span>

            </div>

          </div>


          {/* =================================================
              EDITORIAL CARD
          ================================================== */}

          <div className="absolute bottom-8 left-8 z-20 w-[275px] rounded-2xl bg-white p-5 shadow-xl sm:bottom-8 sm:left-8 sm:w-[300px]">

            <div className="flex items-center justify-between gap-5">

              <div>

                <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#d36b48]">
                  {slide.label}
                </p>

                <h2 className="mt-2 font-serif text-lg leading-tight text-stone-900">
                  {slide.title}
                </h2>

                <Link
                  to="/collections"
                  className="mt-3 inline-flex items-center gap-2 text-[11px] font-medium text-[#344a22]"
                >
                  {slide.description}
                  <span>→</span>
                </Link>

              </div>


              {/* Thumbnail */}

              <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-stone-100">

                <img
                  src={slide.thumbnail}
                  alt=""
                  className="h-full w-full object-cover"
                />

              </div>

            </div>

          </div>


          {/* =================================================
              SLIDER ARROWS
          ================================================== */}

          <div className="absolute bottom-8 right-8 z-20 flex gap-2">

            <button
              type="button"
              onClick={previousSlide}
              aria-label="Previous slide"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition hover:bg-black/50"
            >
              ←
            </button>

            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next slide"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition hover:bg-black/50"
            >
              →
            </button>

          </div>


          {/* =================================================
              SLIDE INDICATORS
          ================================================== */}

          <div className="absolute bottom-9 left-1/2 z-20 flex -translate-x-1/2 gap-2">

            {slides.map((_, index) => (

              <button
                key={index}
                type="button"
                onClick={() => setCurrentSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'w-6 bg-white'
                    : 'w-1.5 bg-white/50'
                }`}
              />

            ))}

          </div>

        </div>

      </div>

    </section>
  )
}

export default LuxuryBanner