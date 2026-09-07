import { skills } from "../../data/skills";

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative mx-auto max-w-7xl scroll-mt-24 px-6 py-28 lg:px-8"
    >
      {/* Header */}
      <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <span className="h-px w-8 bg-violet-400" />

            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-violet-400">
              Toolkit
            </p>
          </div>

          <h2 className="max-w-2xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Tools behind the
            <span className="text-zinc-500"> work.</span>
          </h2>
        </div>

        <p className="max-w-md text-sm leading-7 text-zinc-500 md:text-right">
          A modern stack built around web development, e-commerce,
          automation, AI, and scalable digital experiences.
        </p>
      </div>

      {/* Skills */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {skills.map((skill, index) => {
          const Icon = skill.icon;

          return (
            <div
              key={skill.title}
              className={`
                group relative overflow-hidden rounded-[28px]
                border border-white/[0.08]
                bg-white/[0.025]
                p-7
                transition-all duration-500
                hover:-translate-y-1
                hover:border-violet-400/20
                hover:bg-white/[0.045]
                ${
                  index === 0
                    ? "lg:col-span-2"
                    : ""
                }
              `}
            >
              {/* Background glow */}
              <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-violet-500/10 blur-[70px] opacity-0 transition duration-500 group-hover:opacity-100" />

              {/* Top row */}
              <div className="relative flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-zinc-200 transition duration-300 group-hover:border-violet-400/20 group-hover:bg-violet-400/10 group-hover:text-violet-300">
                  <Icon size={21} strokeWidth={1.8} />
                </div>

                <span className="text-xs font-medium text-zinc-700 transition group-hover:text-zinc-500">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              {/* Title */}
              <div className="relative mt-7">
                <h3 className="text-xl font-semibold tracking-tight text-white">
                  {skill.title}
                </h3>

                <p className="mt-2 text-xs text-zinc-600">
                  {skill.items.length} technologies
                </p>
              </div>

              {/* Technologies */}
              <div className="relative mt-6 flex flex-wrap gap-2">
                {skill.items.map((item) => (
                  <span
                    key={item}
                    className="
                      rounded-xl
                      border border-white/[0.07]
                      bg-white/[0.025]
                      px-3 py-2
                      text-xs font-medium
                      text-zinc-400
                      transition-all duration-300
                      hover:border-white/15
                      hover:bg-white/[0.06]
                      hover:text-white
                    "
                  >
                    {item}
                  </span>
                ))}
              </div>

              {/* Bottom accent */}
              <div className="absolute bottom-0 left-7 right-7 h-px origin-left scale-x-0 bg-gradient-to-r from-violet-400/60 via-violet-400/20 to-transparent transition-transform duration-500 group-hover:scale-x-100" />
            </div>
          );
        })}
      </div>

      {/* Bottom statement */}
      <div className="mt-10 flex flex-col justify-between gap-4 border-t border-white/[0.06] pt-6 text-xs text-zinc-600 sm:flex-row">
        <span>Always learning. Always building.</span>

        <span className="text-zinc-700">
          React · Laravel · Shopify · WordPress · AI
        </span>
      </div>
    </section>
  );
}