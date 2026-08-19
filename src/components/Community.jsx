import { useState } from 'react'

const benefits = [
  {
    icon: 'leaf',
    title: 'Curated Content',
    description: 'Inspiration & stories handpicked for you',
  },
  {
    icon: 'star',
    title: 'New Arrivals',
    description: 'Be the first to discover our latest pieces',
  },
  {
    icon: 'tag',
    title: 'Member Offers',
    description: 'Exclusive discounts & early access',
  },
  {
    icon: 'heart',
    title: 'Design Community',
    description: 'Join a global community that loves design',
  },
]

const stats = [
  {
    icon: 'users',
    value: '40,000+',
    label: 'Design enthusiasts',
  },
  {
    icon: 'globe',
    value: '120+',
    label: 'Countries worldwide',
  },
  {
    icon: 'mail',
    value: 'Monthly',
    label: 'Curated inspiration',
  },
  {
    icon: 'heart',
    value: '100%',
    label: 'No spam. Unsubscribe anytime.',
  },
]

function CommunitySection() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!email.trim()) return

    setSubmitted(true)
  }

  return (
    <section className="bg-[#f7f5f1] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">

      <div className="mx-auto max-w-[1400px]">

        <div className="relative overflow-hidden rounded-[28px] bg-[#e9e6df]">

          {/* =================================================
              MAIN CONTENT
          ================================================== */}

          <div className="relative min-h-[630px] lg:min-h-[670px]">

            {/* =================================================
                IMAGE
            ================================================== */}

            <div
              className="
                absolute
                right-0
                top-0
                h-full
                w-full
                overflow-hidden
                lg:w-[48%]
              "
            >

              <img
                src="https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1400&q=90"
                alt="Beautiful natural living room"
                className="h-full w-full object-cover"
              />

              {/* Image tint */}

              <div className="absolute inset-0 bg-black/[0.03]" />

            </div>


            {/* =================================================
                CURVED CONTENT MASK
            ================================================== */}

            <div
              className="
                relative
                z-10
                flex
                min-h-[630px]
                w-full
                flex-col
                justify-between
                bg-[#f3f0ea]
                px-7
                py-10
                lg:min-h-[670px]
                lg:w-[70%]
                lg:px-16
                lg:py-16
              "
              style={{
                clipPath:
                  'ellipse(82% 78% at 18% 50%)',
              }}
            >

              {/* =================================================
                  INTRO
              ================================================== */}

              <div className="max-w-[650px]">

                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#334c22]">
                  Join the community
                </p>


                <h2 className="mt-7 max-w-[600px] font-serif text-[42px] leading-[1.05] tracking-tight text-[#14283a] sm:text-[50px] lg:text-[52px]">

                  Design stories,
                  <br />

                  new arrivals &

                  <br />

                  <em className="font-serif font-normal italic text-[#46612f]">
                    exclusive member offers
                  </em>

                </h2>


                <p className="mt-6 max-w-[510px] text-sm leading-6 text-[#738092] sm:text-base">
                  Join 40,000+ design enthusiasts. No spam — just beautiful
                  furniture and thoughtful interiors, delivered monthly.
                </p>


                {/* =================================================
                    BENEFITS
                ================================================== */}

                <div className="mt-9 grid grid-cols-2 gap-y-6 sm:grid-cols-4">

                  {benefits.map((benefit, index) => (

                    <div
                      key={benefit.title}
                      className={`
                        pr-4
                        sm:px-4
                        ${
                          index !== 0
                            ? 'border-l border-[#d9d5cd]'
                            : ''
                        }
                      `}
                    >

                      {/* Icon */}

                      <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-[#e4e3db] text-[#45602f]">
                        <Icon name={benefit.icon} />
                      </div>


                      <h3 className="text-[11px] font-semibold text-[#172b3d]">
                        {benefit.title}
                      </h3>


                      <p className="mt-1 max-w-[125px] text-[10px] leading-4 text-[#78808a]">
                        {benefit.description}
                      </p>

                    </div>

                  ))}

                </div>


                {/* =================================================
                    EMAIL FORM
                ================================================== */}

                <div className="mt-9 max-w-[480px]">

                  {submitted ? (

                    <div className="flex h-[50px] items-center rounded-full bg-[#344f21] px-6 text-sm font-medium text-white">
                      Thank you for joining our community!
                    </div>

                  ) : (

                    <form
                      onSubmit={handleSubmit}
                      className="flex h-[54px] items-center rounded-full border border-[#ddd9d1] bg-white p-1.5 shadow-sm"
                    >

                      <div className="flex min-w-0 flex-1 items-center gap-3 px-4">

                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          className="h-5 w-5 shrink-0 text-[#73766e]"
                        >
                          <rect
                            x="3"
                            y="5"
                            width="18"
                            height="14"
                            rx="2"
                          />
                          <path d="m3 7 9 6 9-6" />
                        </svg>


                        <input
                          type="email"
                          value={email}
                          onChange={(event) =>
                            setEmail(event.target.value)
                          }
                          placeholder="you@example.com"
                          required
                          className="min-w-0 flex-1 bg-transparent text-sm text-[#30332e] outline-none placeholder:text-[#73766e]"
                        />

                      </div>


                      <button
                        type="submit"
                        className="shrink-0 rounded-full bg-[#344f21] px-6 py-3 text-xs font-semibold text-white transition hover:bg-[#293e1a]"
                      >
                        Subscribe →
                      </button>

                    </form>

                  )}


                  <p className="mt-3 text-[10px] text-[#858b93]">
                    By subscribing you agree to our{' '}
                    <a
                      href="/privacy-policy"
                      className="underline underline-offset-2"
                    >
                      Privacy Policy
                    </a>
                    . Unsubscribe anytime.
                  </p>

                </div>

              </div>


              {/* =================================================
                  BOTTOM STATS
              ================================================== */}

              <div className="mt-12 hidden grid-cols-4 gap-4 lg:grid">

                {stats.map((stat) => (

                  <div
                    key={stat.value}
                    className="flex items-center gap-3"
                  >

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f5f3ed] text-[#486231]">
                      <Icon name={stat.icon} />
                    </div>


                    <div>

                      <p className="text-base font-semibold leading-none text-[#172b3d]">
                        {stat.value}
                      </p>

                      <p className="mt-1 text-[10px] text-[#7d838b]">
                        {stat.label}
                      </p>

                    </div>

                  </div>

                ))}

              </div>

            </div>


            {/* =================================================
                FLOATING LEAF ICON
            ================================================== */}

            <div className="absolute right-[46%] top-[130px] z-20 hidden h-11 w-11 items-center justify-center rounded-full bg-white text-[#4a6532] shadow-[0_4px_20px_rgba(0,0,0,0.1)] lg:flex">

              <Icon name="leaf" />

            </div>

          </div>


          {/* =================================================
              MOBILE STATS
          ================================================== */}

          <div className="grid grid-cols-2 gap-y-6 px-7 py-7 lg:hidden">

            {stats.map((stat) => (

              <div
                key={stat.value}
                className="flex items-center gap-3"
              >

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f5f3ed] text-[#486231]">
                  <Icon name={stat.icon} />
                </div>


                <div>

                  <p className="text-sm font-semibold text-[#172b3d]">
                    {stat.value}
                  </p>

                  <p className="text-[9px] text-[#7d838b]">
                    {stat.label}
                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

    </section>
  )
}


/* =========================================================
   ICON COMPONENT
========================================================= */

function Icon({ name }) {
  const common = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.5,
    className: 'h-4 w-4',
  }

  if (name === 'leaf') {
    return (
      <svg {...common}>
        <path d="M20 4C10 4 4 9 4 17c0 2 1 3 3 3 8 0 13-6 13-16Z" />
        <path d="M4 20c3-5 7-8 12-10" />
      </svg>
    )
  }

  if (name === 'star') {
    return (
      <svg {...common}>
        <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z" />
      </svg>
    )
  }

  if (name === 'tag') {
    return (
      <svg {...common}>
        <path d="M20 13 13 20 4 11V4h7l9 9Z" />
        <circle cx="8" cy="8" r="1" />
      </svg>
    )
  }

  if (name === 'heart') {
    return (
      <svg
        {...common}
        fill="none"
      >
        <path d="M20.8 8.8c0 5.5-8.8 10.4-8.8 10.4S3.2 14.3 3.2 8.8A4.8 4.8 0 0 1 8 4c1.7 0 3.2.9 4 2.2C12.8 4.9 14.3 4 16 4a4.8 4.8 0 0 1 4.8 4.8Z" />
      </svg>
    )
  }

  if (name === 'users') {
    return (
      <svg {...common}>
        <circle cx="9" cy="8" r="3" />
        <path d="M3 20c0-3.3 2.4-5 6-5s6 1.7 6 5" />
        <path d="M16 6a3 3 0 0 1 0 5.8M18 15c2 .5 3 2 3 4" />
      </svg>
    )
  }

  if (name === 'globe') {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c2.5 2.5 3.5 5.5 3.5 9S14.5 18.5 12 21M12 3c-2.5 2.5-3.5 5.5-3.5 9s1 6.5 3.5 9" />
      </svg>
    )
  }

  if (name === 'mail') {
    return (
      <svg {...common}>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </svg>
    )
  }

  return null
}

export default CommunitySection