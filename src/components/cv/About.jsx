const features = [
  {
    number: "01",
    title: "Clean Code",
    description:
      "Maintainable and scalable architecture designed for long-term projects.",
  },
  {
    number: "02",
    title: "Responsive",
    description:
      "Beautiful experiences that work across desktop, tablet and mobile.",
  },
  {
    number: "03",
    title: "Performance",
    description:
      "Fast and optimized interfaces with performance in mind.",
  },
  {
    number: "04",
    title: "Problem Solving",
    description:
      "Practical solutions to real-world technical and business problems.",
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="mx-auto max-w-7xl px-6 py-24 lg:px-8"
    >

      <div className="grid gap-8 lg:grid-cols-2">

        {/* About */}
        <div className="rounded-[28px] border border-white/10 bg-white/[0.035] p-8 md:p-12">

          <p className="text-sm uppercase tracking-[0.2em] text-cyan-400">
            About me
          </p>

          <h2 className="mt-5 text-4xl font-semibold tracking-tight">
            Developer by craft.
            <br />
            Problem solver by nature.
          </h2>

          <p className="mt-8 leading-8 text-zinc-400">
            I enjoy turning ideas into clean, functional
            and intuitive digital products. My focus is writing
            maintainable code while creating interfaces that
            feel simple and enjoyable to use.
          </p>

          <p className="mt-5 leading-8 text-zinc-400">
            From responsive websites and e-commerce platforms
            to dashboards and mobile applications, I work
            across the stack to bring products from concept
            to production.
          </p>

        </div>

        {/* Feature cards */}
        <div className="grid gap-5 sm:grid-cols-2">

          {features.map((item) => (
            <div
              key={item.number}
              className="group rounded-[28px] border border-white/10 bg-white/[0.035] p-7 transition duration-300 hover:-translate-y-1 hover:bg-white/[0.06]"
            >

              <span className="text-xs text-zinc-600">
                {item.number}
              </span>

              <h3 className="mt-12 text-xl font-semibold">
                {item.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-zinc-500">
                {item.description}
              </p>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
}