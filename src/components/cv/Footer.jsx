import {
  Github,
  Linkedin,
  Mail,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="mx-auto flex max-w-7xl flex-col gap-6 border-t border-white/10 px-6 py-8 text-sm text-zinc-500 md:flex-row md:items-center md:justify-between lg:px-8">

      <p>
        © {new Date().getFullYear()} Jhomel Ignacio. All rights reserved.
      </p>

      <div className="flex items-center gap-3">

        <a
          href="https://github.com/punisher08"
          aria-label="GitHub"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 transition hover:bg-white/10 hover:text-white"
        >
          <Github size={17} />
        </a>

        <a
          href="https://www.linkedin.com/in/jhomel-ignacio-67b298203/"
          aria-label="LinkedIn"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 transition hover:bg-white/10 hover:text-white"
        >
          <Linkedin size={17} />
        </a>

        <a
          href="mailto:jhomignacio08@gmail.com"
          aria-label="Email"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 transition hover:bg-white/10 hover:text-white"
        >
          <Mail size={17} />
        </a>

      </div>

    </footer>
  );
}