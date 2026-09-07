
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";

export default function ProjectCard({ projects = [] }) {
  const [current, setCurrent] = useState(0);

  if (!projects.length) return null;

  const maxIndex = Math.max(0, projects.length - 2);

  const nextSlide = () => {
    setCurrent((prev) => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrent((prev) => Math.max(prev - 1, 0));
  };

  const hasLink = (project) =>
    project.link && project.link !== "#";

  return (
    <section className="relative w-full">

      {/* =====================================================
          SLIDER
      ====================================================== */}

      <div className="relative overflow-hidden">

        {/* Track */}
        <div
          className="flex gap-5 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{
            transform: `translateX(calc(-${current * 50}% - ${
              current * 10
            }px))`,
          }}
        >
          {projects.map((project, index) => (
            <article
              key={project.id || index}
              className="
                group
                relative
                min-w-full
                md:min-w-[calc(50%-10px)]
                overflow-hidden
                rounded-[28px]
                border
                border-white/10
                bg-zinc-950
              "
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">

                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="
                    h-full
                    w-full
                    object-cover
                    opacity-80
                    transition-all
                    duration-700
                    group-hover:scale-105
                    group-hover:opacity-100
                  "
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=85";
                  }}
                />

                {/* Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                {/* Hover */}
                <div className="absolute inset-0 bg-black/0 transition duration-500 group-hover:bg-black/10" />

                {/* =================================================
                    TOP
                ================================================== */}

                <div className="absolute left-5 right-5 top-5 flex items-center justify-between">

                  {/* Category */}
                  <span className="rounded-full border border-white/10 bg-black/40 px-3 py-1.5 text-xs text-white backdrop-blur-xl">
                    {project.category}
                  </span>

                  {/* Number */}
                  <span className="font-mono text-xs text-white/60">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* =================================================
                    CONTENT
                ================================================== */}

                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">

                  {/* Title */}
                  <div className="flex items-end justify-between gap-4">

                    <div className="min-w-0">

                      <h3 className="text-2xl font-semibold tracking-[-0.03em] text-white md:text-3xl">
                        {project.title}
                      </h3>

                      {project.description && (
                        <p className="mt-2 line-clamp-2 max-w-xl text-sm leading-6 text-zinc-300">
                          {project.description}
                        </p>
                      )}

                      {/* Technologies */}
                      <div className="mt-4 flex flex-wrap gap-2">
                        {project.tech?.slice(0, 4).map((item) => (
                          <span
                            key={`${project.id}-${item}`}
                            className="
                              rounded-full
                              border
                              border-white/10
                              bg-white/10
                              px-3
                              py-1.5
                              text-xs
                              text-zinc-200
                              backdrop-blur-md
                            "
                          >
                            {item}
                          </span>
                        ))}
                      </div>

                    </div>

                    {/* Link */}
                    {hasLink(project) && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open ${project.title} website`}
                        className="
                          flex
                          h-12
                          w-12
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                          bg-white
                          text-black
                          transition-all
                          duration-300
                          hover:scale-110
                          hover:bg-zinc-200
                        "
                      >
                        <ArrowUpRight size={19} />
                      </a>
                    )}

                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* =====================================================
          CONTROLS
      ====================================================== */}

      <div className="mt-6 flex items-center justify-between">

        {/* Progress */}
        <div className="flex flex-1 items-center gap-2">
          {projects.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setCurrent(Math.min(index, maxIndex))}
              className="group h-1.5 flex-1 overflow-hidden rounded-full bg-white/10"
              aria-label={`Go to project ${index + 1}`}
            >
              <span
                className={`block h-full rounded-full transition-all duration-500 ${
                  index >= current && index < current + 2
                    ? "w-full bg-white"
                    : "w-0"
                }`}
              />
            </button>
          ))}
        </div>

        {/* Arrows */}
        <div className="ml-6 flex gap-2">

          <button
            type="button"
            onClick={prevSlide}
            disabled={current === 0}
            aria-label="Previous projects"
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-full
              border
              border-white/10
              bg-white/5
              text-white
              transition
              hover:bg-white
              hover:text-black
              disabled:cursor-not-allowed
              disabled:opacity-30
            "
          >
            <ArrowLeft size={17} />
          </button>

          <button
            type="button"
            onClick={nextSlide}
            disabled={current >= maxIndex}
            aria-label="Next projects"
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-full
              bg-white
              text-black
              transition
              hover:bg-zinc-200
              disabled:cursor-not-allowed
              disabled:opacity-30
            "
          >
            <ArrowRight size={17} />
          </button>

        </div>
      </div>
    </section>
  );
}

