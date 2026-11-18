import React from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  ArrowUpRight,
} from 'lucide-react';

import MessengerChat from './MessengerChat';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <footer className="bg-[#1d211c] text-white">
        {/* Main Footer */}
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">

            {/* Brand */}
            <div>
              <div className="mb-6">
                <h2 className="font-serif text-2xl tracking-[0.18em]">
                  IGNACIO
                </h2>

                <p className="mt-1 text-[10px] font-medium tracking-[0.35em] text-[#c5a46d]">
                  FURNITURES
                </p>
              </div>

              <p className="max-w-sm text-sm leading-7 text-white/60">
                Quality furniture crafted with care, designed to make your
                space feel timeless, comfortable, and truly yours.
              </p>

              {/* Social */}
              <div className="mt-7 flex items-center gap-3">
                <a
                  href="#"
                  aria-label="Facebook"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 transition hover:border-[#c5a46d] hover:bg-[#c5a46d] hover:text-[#1d211c]"
                >
                  <Facebook size={17} />
                </a>

                <a
                  href="#"
                  aria-label="Instagram"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 transition hover:border-[#c5a46d] hover:bg-[#c5a46d] hover:text-[#1d211c]"
                >
                  <Instagram size={17} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-[#c5a46d]">
                Explore
              </h3>

              <ul className="space-y-4 text-sm text-white/60">
                <li>
                  <a
                    href="/"
                    className="transition hover:text-white"
                  >
                    Home
                  </a>
                </li>

                <li>
                  <a
                    href="/products"
                    className="transition hover:text-white"
                  >
                    Products
                  </a>
                </li>

                <li>
                  <a
                    href="/projects"
                    className="transition hover:text-white"
                  >
                    Projects
                  </a>
                </li>

                <li>
                  <a
                    href="/about"
                    className="transition hover:text-white"
                  >
                    About Us
                  </a>
                </li>

                <li>
                  <a
                    href="/contact"
                    className="transition hover:text-white"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h3 className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-[#c5a46d]">
                Categories
              </h3>

              <ul className="space-y-4 text-sm text-white/60">
                <li>
                  <a
                    href="/products?category=dining"
                    className="transition hover:text-white"
                  >
                    Dining Tables
                  </a>
                </li>

                <li>
                  <a
                    href="/products?category=living"
                    className="transition hover:text-white"
                  >
                    Living Room
                  </a>
                </li>

                <li>
                  <a
                    href="/products?category=office"
                    className="transition hover:text-white"
                  >
                    Office Furniture
                  </a>
                </li>

                <li>
                  <a
                    href="/products?category=doors"
                    className="transition hover:text-white"
                  >
                    Doors
                  </a>
                </li>

                <li>
                  <a
                    href="/products?category=custom"
                    className="transition hover:text-white"
                  >
                    Custom Furniture
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-[#c5a46d]">
                Get in Touch
              </h3>

              <div className="space-y-5">

                <div className="flex gap-3">
                  <MapPin
                    size={18}
                    className="mt-1 flex-shrink-0 text-[#c5a46d]"
                  />

                  <p className="text-sm leading-6 text-white/60">
                    Philippines
                    <br />
                    Visit our showroom
                  </p>
                </div>

                <a
                  href="tel:+639352989795"
                  className="flex items-center gap-3 text-sm text-white/60 transition hover:text-white"
                >
                  <Phone
                    size={18}
                    className="text-[#c5a46d]"
                  />

                  <span>+63 935 298 9795</span>
                </a>

                <a
                  href="mailto:jhomignacio05@gmail.com"
                  className="flex items-center gap-3 text-sm text-white/60 transition hover:text-white"
                >
                  <Mail
                    size={18}
                    className="text-[#c5a46d]"
                  />

                  <span>jhomignacio05@gmail.com</span>
                </a>

              </div>

              {/* CTA */}
              <a
                href="/contact"
                className="mt-7 inline-flex items-center gap-2 border-b border-[#c5a46d] pb-1 text-sm font-medium text-white transition hover:text-[#c5a46d]"
              >
                Start a project
                <ArrowUpRight size={15} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-6 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between lg:px-8">

            <p>
              © {new Date().getFullYear()} Ignacio Furnitures. All rights reserved.
            </p>

            <div className="flex items-center gap-5">
              <a
                href="/privacy-policy"
                className="transition hover:text-white"
              >
                Privacy Policy
              </a>

              <a
                href="/terms"
                className="transition hover:text-white"
              >
                Terms
              </a>

              <button
                type="button"
                onClick={scrollToTop}
                className="transition hover:text-white"
              >
                Back to top ↑
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Messenger */}
      <MessengerChat
        businessName="Ignacio Furnitures"
        welcomeMessage="Hi! 👋 Welcome to Ignacio Furnitures. How can we help you today?"
      />
    </>
  );
};

export default Footer;