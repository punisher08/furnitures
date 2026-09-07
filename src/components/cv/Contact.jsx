import {
  ArrowUpRight,
  Mail,
} from "lucide-react";

export default function Contact() {
  return (
    <section
      id="contact"
      className="mx-auto max-w-7xl px-6 py-24 lg:px-8"
    >

      <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-violet-500/10 via-white/[0.04] to-cyan-500/10 p-8 md:p-16">

        {/* Glow */}
        <div className="absolute right-[-100px] top-[-100px] h-[300px] w-[300px] rounded-full bg-violet-500/20 blur-[100px]" />

        <div className="relative max-w-3xl">

          <p className="text-sm uppercase tracking-[0.2em] text-violet-300">
            Have a project?
          </p>

          <h2 className="mt-5 text-4xl font-semibold tracking-tight md:text-6xl">
            Let's build something
            <br />
            great together.
          </h2>

          <p className="mt-6 max-w-xl leading-7 text-zinc-400">
            Have an idea, project or website that needs
            to be built? I'd love to hear about it.
          </p>

          <a
            href="mailto:jhomignacio08@gmail.com"
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 font-medium text-black transition hover:bg-zinc-200"
          >
            <Mail size={18} />

            Get in touch

            <ArrowUpRight size={17} />
          </a>

        </div>

      </div>

    </section>
  );
}