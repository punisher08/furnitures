import { Link } from 'react-router-dom'

const rooms = [
  {
    number: '01',
    title: 'Living Room',
    description: 'Comfort meets timeless design.',
    image:
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=85',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="h-5 w-5"
      >
        <path d="M4 12h16v7H4z" />
        <path d="M6 12V9a3 3 0 0 1 6 0v3M12 12V9a3 3 0 0 1 6 0v3" />
        <path d="M6 19v2M18 19v2" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Bedroom',
    description: 'Rest easy in natural comfort.',
    image:
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=900&q=85',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="h-5 w-5"
      >
        <path d="M4 11h16v8H4z" />
        <path d="M6 11V8h5v3M13 11V8h5v3" />
        <path d="M6 19v2M18 19v2" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Dining Room',
    description: 'Gather in natural beauty.',
    image:
      'https://images.unsplash.com/photo-1617104678098-de229db51175?auto=format&fit=crop&w=900&q=85',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="h-5 w-5"
      >
        <path d="M4 9h16" />
        <path d="M12 9V5" />
        <path d="M8 5h8" />
        <path d="M6 9v10M18 9v10" />
      </svg>
    ),
  },
]

function DesignSpaces() {
  return (
    <section className="bg-[#f6f4f0] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">

      <div className="mx-auto max-w-[1400px]">

        {/* =====================================================
            TOP CONTENT
        ====================================================== */}

        <div className="grid gap-5 xl:grid-cols-[1.5fr_0.9fr_0.9fr_0.9fr_1fr]">

          {/* =================================================
              CONSULTATION CARD
          ================================================= */}

          <div className="relative flex min-h-[470px] flex-col justify-between overflow-hidden rounded-[24px] border border-[#e5e1da] bg-[#fbfaf8] p-8 sm:p-10 lg:p-11">

            <div>

              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#54713b]">
                Design your perfect space
              </p>


              <h2 className="mt-9 max-w-[390px] font-serif text-[40px] leading-[1.02] tracking-tight text-[#20211e] sm:text-[46px]">

                From inspiration
                <br />

                to{' '}

                <em className="font-serif font-normal italic text-[#55713b]">
                  reality
                </em>

              </h2>


              <p className="mt-10 max-w-[360px] text-sm leading-6 text-[#7b7b77]">
                Our design experts help you create spaces that reflect
                your style and elevate everyday living.
              </p>

            </div>


            {/* Consultation CTA */}

            <Link
              to="/contact"
              className="group flex w-fit items-center gap-4"
            >

              <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#20211e]">
                Book a free consultation
              </span>

              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#4a6333] text-[#4a6333] transition duration-300 group-hover:bg-[#405f28] group-hover:text-white">

                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                >
                  <path d="M5 12h13" />
                  <path d="m13 7 5 5-5 5" />
                </svg>

              </span>

            </Link>

          </div>


          {/* =================================================
              ROOM CARDS
          ================================================== */}

          {rooms.map((room) => (

            <RoomCard
              key={room.number}
              room={room}
            />

          ))}


          {/* =================================================
              JOURNAL CARD
          ================================================== */}

          <div className="relative min-h-[470px] overflow-hidden rounded-[24px] bg-[#081b0d] p-8 text-white sm:p-9">

            <div className="relative z-10">

              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#b6c48b]">
                The Kave Journal
              </p>


              <h2 className="mt-8 max-w-[220px] font-serif text-[28px] leading-[1.05]">
                Stories, tips &
                <br />
                inspiration
              </h2>


              <p className="mt-8 max-w-[230px] text-xs leading-5 text-white/65">
                Explore our journal for design ideas, natural living
                tips, and inspiration for every space.
              </p>


              <Link
                to="/journal"
                className="mt-9 inline-flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.15em]"
              >
                Explore now

                <span className="text-sm">
                  →
                </span>
              </Link>

            </div>


            {/* Decorative bottom image */}

            <div className="absolute bottom-0 left-1/2 h-[165px] w-[160px] -translate-x-1/2 overflow-hidden rounded-t-[90px] bg-[#10281a]">

              <img
                src="https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=500&q=80"
                alt=""
                className="h-full w-full object-cover opacity-80 mix-blend-luminosity"
              />

              <div className="absolute inset-0 bg-[#10281a]/40" />

            </div>

          </div>

        </div>


        {/* =====================================================
            BENEFITS STRIP
        ====================================================== */}

        <div className="mt-6 rounded-[24px] border border-[#e4e0d8] bg-[#fbfaf8] p-5 shadow-[0_12px_35px_rgba(35,35,25,0.04)] sm:p-6 lg:px-10">

          <div className="grid gap-6 lg:grid-cols-[1fr_1fr_1fr_1.05fr] lg:items-center">

            {/* Sustainable */}

            <Benefit
              icon="leaf"
              title="Sustainable materials"
              description="Responsibly sourced, naturally beautiful."
            />


            {/* Quality */}

            <Benefit
              icon="shield"
              title="Quality you can trust"
              description="Crafted to last, backed by our lifetime warranty."
              border
            />


            {/* Delivery */}

            <Benefit
              icon="delivery"
              title="White-glove delivery"
              description="Delivered, assembled & placed with care."
              border
            />


            {/* Purpose CTA */}

            <Link
              to="/about"
              className="relative flex min-h-[106px] items-center justify-between overflow-hidden rounded-[18px] bg-[#f1eee8] px-6 py-5"
            >

              <div className="relative z-10">

                <p className="font-serif text-[12px] font-semibold uppercase tracking-[0.1em] text-[#344a22]">
                  Designing life with purpose
                </p>

                <div className="mt-7 flex items-center gap-3 text-[9px] font-semibold uppercase tracking-[0.15em] text-[#344a22]">
                  Learn our story
                  <span className="text-sm">→</span>
                </div>

              </div>


              {/* Decorative leaf */}

              <svg
                viewBox="0 0 80 120"
                fill="none"
                className="absolute -right-1 -bottom-6 h-32 w-24 text-[#d8d8cd]"
              >
                <path
                  d="M40 115C40 76 45 40 72 7"
                  stroke="currentColor"
                  strokeWidth="1"
                />

                <path
                  d="M41 93C24 84 14 70 12 54C29 56 40 69 41 93Z"
                  stroke="currentColor"
                  strokeWidth="1"
                />

                <path
                  d="M44 73C57 66 66 55 68 42C54 43 45 53 44 73Z"
                  stroke="currentColor"
                  strokeWidth="1"
                />

                <path
                  d="M40 52C26 46 19 35 19 23C32 25 40 35 40 52Z"
                  stroke="currentColor"
                  strokeWidth="1"
                />
              </svg>

            </Link>

          </div>

        </div>

      </div>

    </section>
  )
}


/* =========================================================
   ROOM CARD
========================================================= */

function RoomCard({ room }) {
  return (
    <Link
      to={`/rooms/${room.title.toLowerCase().replaceAll(' ', '-')}`}
      className="group relative min-h-[470px] overflow-hidden rounded-[24px] bg-[#fbfaf8]"
    >

      {/* Image */}

      <div className="relative h-[320px] overflow-hidden">

        <img
          src={room.image}
          alt={room.title}
          className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
        />

        {/* Dark overlay */}

        <div className="absolute inset-0 bg-black/20 transition group-hover:bg-black/10" />


        {/* Number */}

        <span className="absolute left-6 top-6 text-[11px] font-semibold tracking-[0.15em] text-white">
          {room.number}
        </span>


        {/* Icon */}

        <span className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#405f28] shadow-sm">
          {room.icon}
        </span>

      </div>


      {/* Content */}

      <div className="px-6 pb-6 pt-6">

        <div className="flex items-center gap-3">

          <span className="h-px w-4 bg-[#b8b4ad]" />

          <h3 className="font-serif text-[17px] uppercase tracking-wide text-[#252521]">
            {room.title}
          </h3>

        </div>


        <p className="mt-2 max-w-[190px] text-xs leading-5 text-[#7c7a74]">
          {room.description}
        </p>


        <div className="mt-5 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#172117]">
          Shop collection →
        </div>

      </div>

    </Link>
  )
}


/* =========================================================
   BENEFIT
========================================================= */

function Benefit({
  icon,
  title,
  description,
  border = false,
}) {
  return (
    <div
      className={`flex items-center gap-4 ${
        border
          ? 'border-l border-[#d7d2ca] pl-6 lg:pl-8'
          : ''
      }`}
    >

      {/* Icon */}

      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#e8e6dc] text-[#4d6737]">

        {icon === 'leaf' && (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="h-5 w-5"
          >
            <path d="M20 4C10 4 4 9 4 17c0 2 1 3 3 3 8 0 13-6 13-16Z" />
            <path d="M4 20c3-5 7-8 12-10" />
          </svg>
        )}

        {icon === 'shield' && (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="h-5 w-5"
          >
            <path d="M12 3 20 6v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6l8-3Z" />
            <path d="m9 12 2 2 4-4" />
          </svg>
        )}

        {icon === 'delivery' && (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="h-5 w-5"
          >
            <path d="M3 6h11v11H3z" />
            <path d="M14 9h4l3 3v5h-7z" />
            <circle cx="7" cy="19" r="2" />
            <circle cx="18" cy="19" r="2" />
          </svg>
        )}

      </div>


      {/* Text */}

      <div>

        <h3 className="text-[10px] font-semibold uppercase tracking-wide text-[#252521]">
          {title}
        </h3>

        <p className="mt-2 max-w-[210px] text-[10px] leading-4 text-[#85827c]">
          {description}
        </p>

      </div>

    </div>
  )
}

export default DesignSpaces