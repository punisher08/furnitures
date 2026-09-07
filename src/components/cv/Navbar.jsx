import { Menu, X } from "lucide-react";
import { useState } from "react";

const navItems = [
  {
    label: "Work",
    href: "#work",
  },
  {
    label: "About",
    href: "#about",
  },
  {
    label: "Skills",
    href: "#skills",
  },
  {
    label: "Contact",
    href: "#contact",
  },
];


export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMenu = () => {
    setMobileOpen(false);
  };

  return (
    <header
      className="fixed inset-x-0 top-0 z-[99999] w-full"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
      }}
    >
      <div className="border-b border-white/10 bg-[#0b0b0c]/90 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">

          {/* Logo */}
          <a
            href="#jhomelignacio"
            className="text-xl font-bold tracking-tight"
          >
            JHOMEL <span className="text-violet-400">IGNACIO</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 text-sm text-zinc-400 md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="transition hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <a
            href="#contact"
            className="hidden rounded-full border border-white/10 bg-white/[0.04] px-5 py-2.5 text-sm font-medium transition hover:border-white/20 hover:bg-white/[0.08] md:block"
          >
            Let's Talk
          </a>

          {/* Mobile */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] md:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

        </nav>
      </div>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <div className="absolute left-4 right-4 top-[76px] rounded-2xl border border-white/10 bg-[#111113] p-3 shadow-2xl md:hidden">

          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={closeMenu}
              className="block rounded-xl px-4 py-3 text-sm text-zinc-400 transition hover:bg-white/5 hover:text-white"
            >
              {item.label}
            </a>
          ))}

          <a
            href="#contact"
            onClick={closeMenu}
            className="mt-2 block rounded-xl bg-white px-4 py-3 text-center text-sm font-medium text-black"
          >
            Let's Talk
          </a>

        </div>
      )}
    </header>
  );
}