import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className="w-full bg-[#faf9f6] text-[#171717]">

      {/* =====================================================
          TOP ANNOUNCEMENT BAR
      ====================================================== */}

      <div className="bg-[#344a22] text-white">
        <div className="mx-auto flex h-10 max-w-[1500px] items-center justify-between px-5 sm:px-8 lg:px-12">

          {/* Shipping */}
          <div className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-wide">

            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              className="h-4 w-4"
            >
              <path d="M3 6h11v11H3z" />
              <path d="M14 9h4l3 3v5h-7z" />
              <circle cx="7" cy="19" r="2" />
              <circle cx="18" cy="19" r="2" />
            </svg>

            <span>
              Free shipping on all orders over $500
            </span>

          </div>


          {/* Right links */}

          <div className="hidden items-center gap-5 text-xs text-white/80 md:flex">

            <Link
              to="/products"
              className="flex items-center gap-2 transition hover:text-white"
            >

              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                className="h-4 w-4"
              >
                <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>

              Products

            </Link>

            <span className="h-4 w-px bg-white/30" />

            {/* Instagram */}

            <a
              href="#"
              aria-label="Instagram"
              className="transition hover:text-white"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                className="h-4 w-4"
              >
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle
                  cx="17.5"
                  cy="6.5"
                  r=".7"
                  fill="currentColor"
                />
              </svg>
            </a>

            {/* Pinterest */}

            <a
              href="#"
              aria-label="Pinterest"
              className="text-sm transition hover:text-white"
            >
              P
            </a>

            {/* Facebook */}

            <a
              href="#"
              aria-label="Facebook"
              className="text-sm transition hover:text-white"
            >
              f
            </a>

          </div>

        </div>
      </div>


      {/* =====================================================
          MAIN HEADER
      ====================================================== */}

      <div className="border-b border-[#e7e4de]">

        <div className="mx-auto flex h-[102px] max-w-[1500px] items-center gap-8 px-5 sm:px-8 lg:px-12">

          {/* Logo */}

          <Link
            to="/"
            className="flex shrink-0 items-center"
          >

            <div className="flex items-center gap-3">

              {/* Logo icon */}

              <div className="relative flex h-[58px] w-[42px] items-end justify-center">

                <svg
                  viewBox="0 0 50 70"
                  fill="none"
                  className="h-[58px] w-[42px]"
                >

                  {/* Chair outline */}

                  <path
                    d="M13 63V28C13 17 19 8 28 8C37 8 43 16 43 27V63"
                    stroke="#344a22"
                    strokeWidth="1.5"
                  />

                  <path
                    d="M13 43H40C43 43 45 45 45 48V63H8V48C8 45 10 43 13 43Z"
                    stroke="#344a22"
                    strokeWidth="1.5"
                  />

                  {/* Plant */}

                  <path
                    d="M26 43C25 32 26 23 30 16"
                    stroke="#344a22"
                    strokeWidth="1.3"
                  />

                  <path
                    d="M27 29C21 27 19 23 20 19C25 20 28 23 27 29Z"
                    stroke="#344a22"
                    strokeWidth="1.2"
                  />

                  <path
                    d="M28 24C32 22 34 18 33 14C29 15 27 19 28 24Z"
                    stroke="#344a22"
                    strokeWidth="1.2"
                  />

                  <path
                    d="M27 35C22 34 19 31 19 27C24 28 27 30 27 35Z"
                    stroke="#344a22"
                    strokeWidth="1.2"
                  />

                </svg>

              </div>


              {/* Brand */}

              <div className="leading-none">

                <span className="front-page block font-serif text-[20px] lg:text-[38px] font-semibold tracking-tight text-[#344a22]">
                  IGNACIO
                </span>

                <span className="mt-1 block text-[8px] font-medium uppercase tracking-[0.45em] text-[#789052]">
                  Furnitures
                </span>

              </div>

            </div>

          </Link>


          {/* Search */}

          <div className="mx-auto hidden max-w-[540px] flex-1 lg:block">

            <div className="relative">

              <input
                type="search"
                placeholder="Search for furniture, rooms, inspiration..."
                className="h-[52px] w-full rounded-full border border-[#e3e0da] bg-white px-6 pr-16 text-sm text-stone-700 outline-none placeholder:text-stone-400 transition focus:border-[#344a22]"
              />

              <button
                type="button"
                aria-label="Search"
                className="absolute right-1.5 top-1.5 flex h-[43px] w-[43px] items-center justify-center rounded-full bg-[#344a22] text-white transition hover:bg-[#283a1a]"
              >

                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-5 w-5"
                >
                  <circle cx="11" cy="11" r="6.5" />
                  <path d="m16 16 5 5" />
                </svg>

              </button>

            </div>

          </div>


          {/* Header Actions */}

          <div className="ml-auto flex items-center gap-5 sm:gap-7">

            {/* Mobile search */}

            <button
              type="button"
              className="hidden"
              aria-label="Search"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                className="h-5 w-5"
              >
                <circle cx="11" cy="11" r="6.5" />
                <path d="m16 16 5 5" />
              </svg>
            </button>


            {/* Favorites */}

            <Link
              to="/favorites"
              className="group relative hidden flex-col items-center gap-1 sm:flex"
            >

              <div className="relative">

                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  className="h-6 w-6 transition group-hover:text-[#344a22]"
                >
                  <path d="M20.8 8.8c0 5.5-8.8 10.4-8.8 10.4S3.2 14.3 3.2 8.8A4.8 4.8 0 0 1 8 4c1.7 0 3.2.9 4 2.2C12.8 4.9 14.3 4 16 4a4.8 4.8 0 0 1 4.8 4.8Z" />
                </svg>

                <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#344a22] px-1 text-[9px] font-semibold text-white">
                  0
                </span>

              </div>

              <span className="text-[11px]">
                Favorites
              </span>

            </Link>


            {/* Account */}

            <Link
              to="/admin"
              className="group flex flex-col items-center gap-1"
            >

              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                className="h-6 w-6 transition group-hover:text-[#344a22]"
              >
                <circle cx="12" cy="7" r="3.5" />
                <path d="M5 21c.8-4.2 3.1-6.3 7-6.3s6.2 2.1 7 6.3" />
              </svg>

              <span className="text-[11px]">
                Account
              </span>

            </Link>


            {/* Cart */}

            <Link
              to="/admin"
              className="group flex flex-col items-center gap-1"
            >

              <div className="relative">

                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  className="h-6 w-6 transition group-hover:text-[#344a22]"
                >
                  <path d="M4 7h16v13H4z" />
                  <path d="M8 7V5a4 4 0 0 1 8 0v2" />
                </svg>

                <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#e8a12d] px-1 text-[9px] font-semibold text-white">
                  0
                </span>

              </div>

              <span className="text-[11px]">
                Cart
              </span>

            </Link>

          </div>

        </div>

      </div>


      {/* =====================================================
          NAVIGATION
      ====================================================== */}

      <nav className="hidden border-b border-[#e7e4de] lg:block">

        <div className="mx-auto flex h-[76px] max-w-[1500px] items-center gap-10 px-5 sm:px-8 lg:px-12">

          {/* SHOP */}

          <NavItem
            icon="shop"
            title="Shop"
            subtitle="Furniture & Decor"
            active
            to="/products"
          />


         
        
          {/* SALE */}

          
          
          <NavItem
            icon="sale"
            title="About"
            subtitle="Special Offers"
            to="/about"
          />


          {/* CTA */}

          <Link
            to="https://www.facebook.com/Checkbread"
            target="_blank"
            className="ml-auto flex h-[58px] items-center gap-4 rounded-full bg-[#344a22] px-4 pr-6 text-white transition hover:bg-[#283a1a]"
          >

            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-[#ddd8cc]">

              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="#344a22"
                strokeWidth="1.5"
                className="h-6 w-6"
              >
                <path d="M4 18h16" />
                <path d="M6 18V8h12v10" />
                <path d="M9 8V5h6v3" />
                <path d="M8 12h8" />
              </svg>

            </div>

            <div className="leading-tight">

              <span className="block text-[13px] font-semibold">
                Design Your Space
              </span>

              <span className="block text-[10px] text-white/70">
                Book a free consultation
              </span>

            </div>

            <span className="ml-1 text-lg">
              →
            </span>

          </Link>

        </div>

      </nav>


      {/* =====================================================
          MOBILE NAV
      ====================================================== */}

      <div className="border-b border-[#e7e4de] lg:hidden">

        <div className="flex h-14 items-center justify-between px-5">

          <button
            type="button"
            className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.15em]"
          >

            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              className="h-5 w-5"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>

            Menu

          </button>


          <Link
            to="/contact"
            className="rounded-full bg-[#344a22] px-5 py-2.5 text-[10px] font-semibold uppercase tracking-wide text-white"
          >
            Design Your Space
          </Link>

        </div>

      </div>

    </header>
  )
}


/* =========================================================
   NAV ITEM
========================================================= */

function NavItem({
  icon,
  title,
  subtitle,
  hasArrow,
  sale,
  to,
}) {
  return (
    <Link
      to={to}
      className={`group flex items-center gap-3 ${
        sale ? '' : ''
      }`}
    >

      {/* Icon */}

      <div className="flex h-9 w-9 items-center justify-center">

        {icon === 'shop' && (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="h-5 w-5"
          >
            <path d="M4 8h16v12H4z" />
            <path d="M7 8V6a5 5 0 0 1 10 0v2" />
            <path d="M9 12h6" />
          </svg>
        )}

        {icon === 'rooms' && (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="h-5 w-5"
          > 
            <path d="M4 11h16v8H4z" />
            <path d="M6 11V7h5v4M13 11V7h5v4" />
            <path d="M6 19v2M18 19v2" />
          </svg>
        )}

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

        {icon === 'studio' && (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="h-5 w-5"
          >
            <path d="m14 4-9 9 6 6 9-9" />
            <path d="m13 5 6 6M5 20l-2 1 1-2" />
          </svg>
        )}

        {icon === 'sale' && (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="h-5 w-5"
          >
            <path d="m20 13-7 7-10-10V4h6l10 9Z" />
            <circle cx="7.5" cy="7.5" r="1" />
          </svg>
        )}

      </div>


      {/* Text */}

      <div className="leading-tight">

        <div className="flex items-center gap-2">

          <span className="text-[12px] font-semibold uppercase tracking-wide">
            {title}
          </span>

          {hasArrow && (
            <svg
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="h-3 w-3 text-stone-400 transition group-hover:translate-y-0.5"
            >
              <path d="m5 7 5 5 5-5" />
            </svg>
          )}

        </div>

        <span
          className={`mt-1 block text-[9px] ${
            sale
              ? ''
              : 'text-stone-400'
          }`}
        >
          {subtitle}
        </span>

      </div>

    </Link>
  )
}

export default Header