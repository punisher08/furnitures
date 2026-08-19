import { useEffect, useRef, useState } from 'react'

const fallbackTransformations = [
  {
    title: 'Modern Living Room',
    description:
      'Transform your living space with thoughtfully designed furniture made for everyday comfort.',
    before:
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1800&q=90',
    after:
      'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1800&q=90',
  },
  {
    title: 'Elegant Home Interior',
    description:
      'Bring warmth and character into your home with furniture crafted to complement your space.',
    before:
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1800&q=90',
    after:
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=90',
  },
]

function BeforeAfterSection() {
  const [transformations, setTransformations] = useState(
    fallbackTransformations
  )

  const [position, setPosition] = useState(50)
  const [activeSlide, setActiveSlide] = useState(0)
  const [loading, setLoading] = useState(true)

  const containerRef = useRef(null)
  const isDragging = useRef(false)

  /*
   * ==========================================================
   * LOAD PRODUCTS
   * ==========================================================
   */

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products')

        if (!response.ok) {
          throw new Error('Failed to fetch products')
        }

        const data = await response.json()

        const products = Array.isArray(data)
          ? data
          : data.products || data.data || []

        /*
         * Only use products that have usable images.
         */

        const productsWithImages = products
          .map((product) => {
            const images = Array.isArray(product.images)
              ? product.images
              : []

            const image =
              product.image ||
              product.image_url ||
              product.thumbnail ||
              product.featured_image ||
              images[0]

            return {
              ...product,
              resolvedImage: image,
            }
          })
          .filter((product) => product.resolvedImage)

        /*
         * If the API contains explicit before/after fields,
         * use those.
         */

        const apiTransformations = productsWithImages
          .map((product) => {
            const before =
              product.before_image ||
              product.before ||
              product.beforeImage

            const after =
              product.after_image ||
              product.after ||
              product.afterImage

            if (!before || !after) {
              return null
            }

            return {
              title:
                product.name ||
                product.title ||
                'Furniture Transformation',

              description:
                product.description ||
                'See how Ignacio Furnitures can transform your space.',

              before,
              after,
            }
          })
          .filter(Boolean)

        /*
         * If products have before/after images,
         * use them directly.
         */

        if (apiTransformations.length > 0) {
          setTransformations(apiTransformations.slice(0, 5))
          return
        }

        /*
         * Otherwise create a showcase using product images.
         *
         * This allows the section to work with your current
         * /api/products endpoint even if it only returns
         * normal product images.
         */

        if (productsWithImages.length >= 2) {
          const generatedTransformations = []

          for (
            let index = 0;
            index < productsWithImages.length - 1;
            index += 2
          ) {
            const first = productsWithImages[index]
            const second = productsWithImages[index + 1]

            generatedTransformations.push({
              title:
                first.name ||
                first.title ||
                'Ignacio Furnitures Collection',

              description:
                first.description ||
                'Discover furniture designed to bring comfort, style and character into your home.',

              before: first.resolvedImage,
              after: second.resolvedImage,
            })
          }

          if (generatedTransformations.length > 0) {
            setTransformations(generatedTransformations.slice(0, 5))
          }
        }
      } catch (error) {
        console.error(
          'Unable to load furniture products:',
          error
        )
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const transformation =
    transformations[activeSlide] || fallbackTransformations[0]

  /*
   * ==========================================================
   * SLIDER POSITION
   * ==========================================================
   */

  const updatePosition = (clientX) => {
    if (!containerRef.current) return

    const rect =
      containerRef.current.getBoundingClientRect()

    let percentage =
      ((clientX - rect.left) / rect.width) * 100

    percentage = Math.min(
      Math.max(percentage, 0),
      100
    )

    setPosition(percentage)
  }

  /*
   * ==========================================================
   * POINTER EVENTS
   * ==========================================================
   */

  const handlePointerDown = (event) => {
    isDragging.current = true

    event.currentTarget.setPointerCapture?.(
      event.pointerId
    )

    updatePosition(event.clientX)
  }

  const handlePointerMove = (event) => {
    if (!isDragging.current) return

    updatePosition(event.clientX)
  }

  const handlePointerUp = (event) => {
    isDragging.current = false

    try {
      event.currentTarget.releasePointerCapture?.(
        event.pointerId
      )
    } catch {
      // Pointer capture may already be released.
    }
  }

  const handleContainerClick = (event) => {
    if (event.target.closest('button')) {
      return
    }

    updatePosition(event.clientX)
  }

  /*
   * ==========================================================
   * CHANGE SLIDE
   * ==========================================================
   */

  const changeSlide = (direction) => {
    setActiveSlide((current) => {
      const next = current + direction

      if (next < 0) {
        return transformations.length - 1
      }

      if (next >= transformations.length) {
        return 0
      }

      return next
    })

    setPosition(50)
  }

  return (
    <section className="bg-[#faf9f7] px-6 py-20 sm:px-8 lg:px-12 lg:py-24">

      <div className="mx-auto max-w-[1400px]">

        {/* =====================================================
            HEADER
        ====================================================== */}

        <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">

          <div>

            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#344f21]">
              Ignacio Furnitures
            </p>

            <h2 className="mt-3 font-serif text-4xl leading-tight tracking-tight text-[#10263b] sm:text-5xl">
              See the difference
            </h2>

            <p className="mt-2 max-w-[650px] text-base leading-7 text-[#718093]">
              Discover how the right furniture can completely change
              the look, comfort and character of your home.
            </p>

          </div>


          {/* Location */}

          <div className="flex items-center gap-2 text-sm text-[#718093]">

            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              className="h-5 w-5 text-[#344f21]"
            >
              <path d="M12 21s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Z" />
              <circle cx="12" cy="9" r="2.2" />
            </svg>

            <span>
              Barangay Care, Tarlac City
            </span>

          </div>

        </div>


        {/* =====================================================
            BEFORE / AFTER
        ====================================================== */}

        <div
          ref={containerRef}
          className="
            relative
            aspect-[16/7]
            min-h-[400px]
            w-full
            select-none
            overflow-hidden
            rounded-[28px]
            bg-[#e8e5df]
            shadow-[0_20px_50px_rgba(0,0,0,0.08)]
            touch-none
          "
          onClick={handleContainerClick}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >

          {/* =================================================
              BEFORE
          ================================================== */}

          <img
            src={transformation.before}
            alt={`${transformation.title} before`}
            draggable="false"
            className="
              absolute
              inset-0
              h-full
              w-full
              object-cover
            "
          />


          {/* =================================================
              AFTER
          ================================================== */}

          <div
            className="
              absolute
              inset-y-0
              left-0
              overflow-hidden
            "
            style={{
              width: `${position}%`,
            }}
          >

            <img
              src={transformation.after}
              alt={`${transformation.title} after`}
              draggable="false"
              className="
                absolute
                inset-y-0
                left-0
                h-full
                max-w-none
                object-cover
              "
              style={{
                width: containerRef.current
                  ? `${containerRef.current.offsetWidth}px`
                  : '100%',
              }}
            />

          </div>


          {/* =================================================
              DARK GRADIENT
          ================================================== */}

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/5" />


          {/* =================================================
              DIVIDER
          ================================================== */}

          <div
            className="
              pointer-events-none
              absolute
              inset-y-0
              z-20
              w-[2px]
              bg-white
              shadow-[0_0_8px_rgba(0,0,0,0.2)]
            "
            style={{
              left: `${position}%`,
              transform: 'translateX(-50%)',
            }}
          />


          {/* =================================================
              DRAG HANDLE
          ================================================== */}

          <button
            type="button"
            aria-label="Drag to compare furniture transformation"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            className="
              absolute
              top-1/2
              z-30
              flex
              h-12
              w-12
              -translate-x-1/2
              -translate-y-1/2
              cursor-ew-resize
              items-center
              justify-center
              rounded-full
              bg-white
              text-[#344f21]
              shadow-[0_5px_20px_rgba(0,0,0,0.2)]
              transition-transform
              hover:scale-105
              active:scale-95
              touch-none
            "
            style={{
              left: `${position}%`,
            }}
          >

            <span className="flex items-center gap-[1px]">

              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="m14 7-5 5 5 5" />
              </svg>

              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="m10 7 5 5-5 5" />
              </svg>

            </span>

          </button>


          {/* =================================================
              BEFORE LABEL
          ================================================== */}

          <div className="absolute bottom-6 left-6 z-20">

            <span className="rounded-lg bg-[#101719]/90 px-4 py-2 text-[11px] font-bold uppercase tracking-wide text-white backdrop-blur-sm">
              Before
            </span>

          </div>


          {/* =================================================
              AFTER LABEL
          ================================================== */}

          <div className="absolute bottom-6 right-6 z-20">

            <span className="rounded-lg bg-[#344f21]/95 px-4 py-2 text-[11px] font-bold uppercase tracking-wide text-white backdrop-blur-sm">
              Ignacio Furnitures
            </span>

          </div>


          {/* =================================================
              TITLE
          ================================================== */}

          <div className="absolute left-6 top-6 z-20 max-w-[420px] text-white">

            <h3 className="font-serif text-2xl drop-shadow-md sm:text-3xl">
              {transformation.title}
            </h3>

          </div>

        </div>


        {/* =====================================================
            DESCRIPTION
        ====================================================== */}

        <div className="mt-5 flex flex-col justify-between gap-5 md:flex-row md:items-center">

          <div className="max-w-[650px]">

            <p className="text-sm leading-6 text-[#718093]">
              {transformation.description}
            </p>

          </div>


          {/* =================================================
              SLIDE INDICATORS
          ================================================== */}

          <div className="flex items-center gap-2">

            {transformations.map((_, index) => (

              <button
                key={index}
                type="button"
                aria-label={`View furniture transformation ${index + 1}`}
                onClick={() => {
                  setActiveSlide(index)
                  setPosition(50)
                }}
                className={`
                  h-1.5
                  rounded-full
                  transition-all
                  duration-300
                  ${
                    index === activeSlide
                      ? 'w-8 bg-[#344f21]'
                      : 'w-2 bg-[#d3d0c9]'
                  }
                `}
              />

            ))}

          </div>


          {/* =================================================
              PREVIOUS / NEXT
          ================================================== */}

          <div className="flex items-center gap-2">

            <button
              type="button"
              onClick={() => changeSlide(-1)}
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                border
                border-[#ddd9d1]
                bg-white
                text-[#172b3d]
                transition
                hover:bg-[#344f21]
                hover:text-white
              "
              aria-label="Previous furniture transformation"
            >
              ←
            </button>


            <button
              type="button"
              onClick={() => changeSlide(1)}
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                border
                border-[#ddd9d1]
                bg-white
                text-[#172b3d]
                transition
                hover:bg-[#344f21]
                hover:text-white
              "
              aria-label="Next furniture transformation"
            >
              →
            </button>

          </div>

        </div>


        {/* =====================================================
            BOTTOM CTA
        ====================================================== */}

        <div className="mt-8 flex flex-col items-start justify-between gap-5 rounded-[24px] bg-[#344f21] px-6 py-6 text-white sm:flex-row sm:items-center sm:px-8">

          <div>

            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/60">
              Ignacio Furnitures
            </p>

            <h3 className="mt-1 font-serif text-2xl">
              Ready to transform your space?
            </h3>

            <p className="mt-1 text-sm text-white/70">
              Explore our furniture collection or contact us today.
            </p>

          </div>


          <a
            href="/products"
            className="
              inline-flex
              shrink-0
              items-center
              gap-4
              rounded-full
              bg-white
              px-6
              py-3
              text-sm
              font-semibold
              text-[#344f21]
              transition
              hover:bg-[#f1f0eb]
              hover:shadow-lg
            "
          >
            Explore Furniture

            <span className="text-lg">
              →
            </span>

          </a>

        </div>

      </div>

    </section>
  )
}

export default BeforeAfterSection