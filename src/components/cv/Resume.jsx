import React, { useMemo, useState } from "react";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Check,
  ChevronRight,
  Code2,
  Download,
  ExternalLink,
  GraduationCap,
  Mail,
  MapPin,
  Menu,
  Phone,
  Send,
  Sparkles,
  X,
} from "lucide-react";

import { resumeData } from "../../data/resumeData";

const Resume = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [activeProject, setActiveProject] = useState("All");

  const projectCategories = useMemo(() => {
    const categories = resumeData.projects?.map((project) => project.category) || [];
    return ["All", ...new Set(categories.filter(Boolean))];
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeProject === "All") return resumeData.projects || [];

    return (resumeData.projects || []).filter(
      (project) => project.category === activeProject
    );
  }, [activeProject]);

  const scrollToSection = (id) => {
    setMobileMenu(false);

    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <main className="min-h-screen bg-[#eef1f5] text-[#171717]">
      {/* Decorative background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-[8%] top-[8%] h-48 w-48 rounded-full bg-white/60 blur-3xl" />
        <div className="absolute right-[8%] top-[35%] h-72 w-72 rounded-full bg-white/50 blur-3xl" />
      </div>

      <div className="relative mx-auto flex w-full max-w-[1180px] gap-5 px-3 py-3 sm:px-5 lg:px-6 lg:py-5">

        {/* =========================
            SIDEBAR
        ========================== */}
        <aside className="hidden w-[25%] shrink-0 lg:block">
          <div className="sticky top-5 space-y-3">
            {/* Brand */}
            <div className="rounded-2xl bg-white px-4 py-3 shadow-sm">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-white">
                  <Code2 size={14} />
                </div>

                <div>
                  <p className="text-[14px] font-bold leading-none">
                    {resumeData.profile.name}
                  </p>
                  <p className="mt-1 text-[12px] text-neutral-500">
                    Developer Portfolio
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="rounded-2xl bg-black p-2.5 text-white shadow-sm">
              <p className="mb-2 px-2 text-[12px] font-semibold uppercase tracking-[0.18em] text-white/40">
                Menu
              </p>

              <SidebarLink
                label="Home"
                onClick={() => scrollToSection("home")}
              />

              <SidebarLink
                label="About"
                onClick={() => scrollToSection("about")}
              />

              <SidebarLink
                label="Skills"
                onClick={() => scrollToSection("skills")}
              />

              <SidebarLink
                label="Projects"
                onClick={() => scrollToSection("projects")}
              />

              <SidebarLink
                label="Experience"
                onClick={() => scrollToSection("experience")}
              />

              <SidebarLink
                label="Contact"
                onClick={() => scrollToSection("contact")}
              />
            </nav>

            {/* Contact mini card */}
            <div className="rounded-2xl bg-black p-3 text-white shadow-sm">
              <div className="mb-3 flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-400" />
                <span className="text-[12px] text-white/70">
                  Available for opportunities
                </span>
              </div>

              <a
                href={`mailto:${resumeData.profile.email}`}
                className="flex items-center justify-between rounded-lg bg-white/10 px-2.5 py-2 text-[12px] transition hover:bg-white/20"
              >
                <span>Email me</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </aside>

        {/* =========================
            MAIN CONTENT
        ========================== */}
        <div className="min-w-0 flex-1">

          {/* Mobile header */}
          <header className="mb-3 flex items-center justify-between rounded-2xl bg-white px-4 py-3 shadow-sm lg:hidden">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white">
                <Code2 size={15} />
              </div>

              <div>
                <p className="text-xs font-bold">
                  {resumeData.profile.name}
                </p>
                <p className="text-[12px] text-neutral-500">
                  {resumeData.profile.title}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setMobileMenu(!mobileMenu)}
              className="rounded-lg bg-black p-2 text-white"
              aria-label="Toggle navigation"
            >
              {mobileMenu ? <X size={16} /> : <Menu size={16} />}
            </button>
          </header>

          {mobileMenu && (
            <div className="mb-3 rounded-2xl bg-black p-3 text-white lg:hidden">
              <div className="grid grid-cols-2 gap-2">
                {[
                  ["Home", "home"],
                  ["About", "about"],
                  ["Skills", "skills"],
                  ["Projects", "projects"],
                  ["Experience", "experience"],
                  ["Contact", "contact"],
                ].map(([label, id]) => (
                  <button
                    key={id}
                    onClick={() => scrollToSection(id)}
                    className="rounded-xl bg-white/10 px-3 py-2.5 text-left text-xs transition hover:bg-white/20"
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* =========================
              HERO
          ========================== */}
          <section id="home" className="scroll-mt-5">
            <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
              <div className="grid lg:grid-cols-[1fr_220px]">

                <div className="p-5 sm:p-7 lg:p-9">
                  <div className="mb-5 flex items-center gap-2">
                    <span className="rounded-full bg-black px-3 py-1 text-[12px] font-semibold uppercase tracking-[0.16em] text-white">
                      Full Stack Developer
                    </span>

                    <span className="flex items-center gap-1 rounded-full border border-neutral-200 px-3 py-1 text-[12px] text-neutral-500">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                      Available
                    </span>
                  </div>

                  <h1 className="max-w-[650px] text-3xl font-black leading-[0.98] tracking-[-0.04em] sm:text-4xl lg:text-5xl">
                    Building modern web experiences with{" "}
                    <span className="text-neutral-400">
                      WordPress, Shopify & React.
                    </span>
                  </h1>

                  <p className="mt-5 max-w-[580px] text-xs leading-6 text-neutral-500 sm:text-sm">
                    {resumeData.profile.intro}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    <button
                      onClick={() => scrollToSection("projects")}
                      className="group flex items-center gap-2 rounded-full bg-black px-4 py-2.5 text-[12px] font-semibold text-white transition hover:-translate-y-0.5"
                    >
                      View my work
                      <ArrowUpRight
                        size={14}
                        className="transition-transform group-hover:translate-x-0.5"
                      />
                    </button>

                    <button
                      onClick={() => window.print()}
                      className="flex items-center gap-2 rounded-full border border-neutral-200 px-4 py-2.5 text-[12px] font-semibold transition hover:bg-neutral-50"
                    >
                      <Download size={13} />
                      Download CV
                    </button>
                  </div>
                </div>

                {/* Hero profile block */}
                <div className="relative flex min-h-[260px] items-end overflow-hidden bg-[#f2f3f5] p-5">
                  <div className="absolute right-5 top-5 rounded-full border border-black/10 bg-white px-3 py-1 text-[12px] font-medium">
                    5+ Years
                  </div>

                  <div className="absolute inset-x-8 bottom-0 top-16 rounded-t-[100px] bg-neutral-200" />

                  <div className="relative z-10 w-full">
                    <div className="mx-auto flex h-36 w-36 items-center justify-center rounded-full border-8 border-white bg-black text-4xl font-black text-white shadow-xl">
                      {resumeData.profile.initials}
                    </div>

                    <div className="mt-4 text-center">
                      <p className="text-xs font-bold">
                        {resumeData.profile.name}
                      </p>
                      <p className="mt-1 text-[12px] text-neutral-500">
                        {resumeData.profile.location}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* =========================
              ABOUT / PROFILE
          ========================== */}
          <section id="about" className="mt-3 scroll-mt-5">
            <div className="rounded-2xl bg-white p-5 shadow-sm sm:p-7">

              <div className="grid gap-7 lg:grid-cols-[180px_1fr]">

                <div>
                  <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-neutral-400">
                    About me
                  </p>

                  <h2 className="mt-2 text-xl font-black tracking-tight">
                    {resumeData.profile.name}
                  </h2>

                  <p className="mt-1 text-[12px] text-neutral-500">
                    {resumeData.profile.title}
                  </p>

                  <div className="mt-7 grid grid-cols-3 gap-2 lg:grid-cols-1">
                    <Stat value="5+" label="Years" />
                    <Stat value="30+" label="Projects" />
                    <Stat value="10+" label="Technologies" />
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium leading-6 text-neutral-600">
                    {resumeData.profile.summary}
                  </p>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    <InfoRow
                      icon={<MapPin size={13} />}
                      label="Location"
                      value={resumeData.profile.location}
                    />

                    <InfoRow
                      icon={<Mail size={13} />}
                      label="Email"
                      value={resumeData.profile.email}
                    />

                    <InfoRow
                      icon={<Phone size={13} />}
                      label="Phone"
                      value={resumeData.profile.phone}
                    />

                    <InfoRow
                      icon={<BriefcaseBusiness size={13} />}
                      label="Specialization"
                      value="Web Development"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* =========================
              WHAT I DO
          ========================== */}
          <section className="mt-3">
            <div className="rounded-2xl bg-white p-5 shadow-sm sm:p-7">
              <SectionHeading
                eyebrow="Capabilities"
                title={
                  <>
                    Helping businesses build{" "}
                    <span className="text-neutral-400">
                      better digital experiences.
                    </span>
                  </>
                }
                description="I combine development, design implementation and technical problem solving to create maintainable and high-performing websites."
              />

              <div className="mt-7 divide-y divide-neutral-100">
                {resumeData.capabilities.map((item, index) => (
                  <div
                    key={item.title}
                    className="group flex gap-4 py-4 first:pt-0 last:pb-0"
                  >
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-[12px] font-bold transition group-hover:bg-black group-hover:text-white">
                      0{index + 1}
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className="text-xs font-bold">
                          {item.title}
                        </h3>

                        <ChevronRight
                          size={13}
                          className="text-neutral-300 transition-transform group-hover:translate-x-1"
                        />
                      </div>

                      <p className="mt-1 max-w-2xl text-[12px] leading-5 text-neutral-500">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* =========================
              PROJECTS
          ========================== */}
          <section id="projects" className="mt-3 scroll-mt-5">
            <div className="rounded-2xl bg-white p-5 shadow-sm sm:p-7">

              <SectionHeading
                eyebrow="Selected work"
                title="Featured Projects"
                description="A selection of WordPress, Shopify, WooCommerce and custom web development projects."
              />

              {/* Filters */}
              <div className="mt-5 flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
                {projectCategories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveProject(category)}
                    className={`whitespace-nowrap rounded-full px-3 py-1.5 text-[12px] font-semibold transition ${
                      activeProject === category
                        ? "bg-black text-white"
                        : "border border-neutral-200 text-neutral-500 hover:bg-neutral-50"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                {filteredProjects.map((project, index) => (
                  <ProjectCard
                    key={`${project.title}-${index}`}
                    project={project}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* =========================
              EXPERIENCE
          ========================== */}
          <section id="experience" className="mt-3 scroll-mt-5">
            <div className="rounded-2xl bg-white p-5 shadow-sm sm:p-7">

              <div className="grid gap-8 md:grid-cols-2">

                {/* Education */}
                <div>
                  <SectionLabel
                    icon={<GraduationCap size={13} />}
                    title="Education"
                  />

                  <div className="mt-5 space-y-5">
                    {resumeData.education.map((item) => (
                      <TimelineItem
                        key={item.school}
                        title={item.degree}
                        company={item.school}
                        period={item.period}
                        description={item.description}
                      />
                    ))}
                  </div>
                </div>

                {/* Experience */}
                <div>
                  <SectionLabel
                    icon={<BriefcaseBusiness size={13} />}
                    title="Experience"
                  />

                  <div className="mt-5 space-y-5">
                    {resumeData.experience.slice(0, 4).map((item) => (
                      <TimelineItem
                        key={`${item.company}-${item.period}`}
                        title={item.position}
                        company={item.company}
                        period={item.period}
                        description={item.description}
                      />
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* =========================
              SKILLS
          ========================== */}
          <section id="skills" className="mt-3 scroll-mt-5">
            <div className="rounded-2xl bg-white p-5 shadow-sm sm:p-7">

              <div className="grid gap-8 lg:grid-cols-2">

                {/* Skill circles */}
                <div>
                  <SectionHeading
                    eyebrow="Expertise"
                    title="Top Skills"
                  />

                  <div className="mt-6 grid grid-cols-5 gap-2">
                    {resumeData.skillLevels.map((skill) => (
                      <SkillCircle
                        key={skill.name}
                        name={skill.name}
                        value={skill.value}
                      />
                    ))}
                  </div>
                </div>

                {/* Tech stack */}
                <div>
                  <SectionHeading
                    eyebrow="Technology"
                    title="Design & Development Skills"
                  />

                  <div className="mt-6 flex flex-wrap gap-2">
                    {resumeData.technologies.map((technology) => (
                      <span
                        key={technology.name}
                        className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 px-3 py-2 text-[12px] font-medium"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-black" />
                        {technology.name}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* =========================
              SERVICES
          ========================== */}
          <section className="mt-3">
            <div className="rounded-2xl bg-white p-5 shadow-sm sm:p-7">

              <SectionHeading
                eyebrow="Services"
                title="How I Can Help"
                description="Focused development services based on my professional experience."
              />

              <div className="mt-6 space-y-2">
                {resumeData.services.map((service, index) => (
                  <div
                    key={service.title}
                    className="grid grid-cols-[45px_1fr_auto] items-center gap-3 rounded-xl border border-neutral-100 bg-neutral-50/60 p-3"
                  >
                    <div className="text-sm font-black">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <div>
                      <h3 className="text-[12px] font-bold">
                        {service.title}
                      </h3>

                      <p className="mt-0.5 text-[12px] leading-4 text-neutral-500">
                        {service.description}
                      </p>
                    </div>

                    <Check size={13} className="text-neutral-400" />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* =========================
              CERTIFICATION
          ========================== */}
          <section className="mt-3">
            <div className="rounded-2xl bg-white p-5 shadow-sm sm:p-7">

              <SectionHeading
                eyebrow="Credentials"
                title="Certification & Additional Experience"
              />

              <div className="mt-6 grid gap-2 sm:grid-cols-2">
                {resumeData.certifications.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-xl border border-neutral-100 p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-[12px] font-bold">
                          {item.title}
                        </p>

                        <p className="mt-1 text-[12px] text-neutral-500">
                          {item.description}
                        </p>
                      </div>

                      <Sparkles
                        size={13}
                        className="shrink-0 text-neutral-400"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* =========================
              CONTACT
          ========================== */}
          <section id="contact" className="mt-3 scroll-mt-5">
            <div className="overflow-hidden rounded-2xl bg-black text-white shadow-sm">

              <div className="grid gap-8 p-5 sm:p-7 lg:grid-cols-[1fr_300px] lg:p-9">

                <div>
                  <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-white/40">
                    Let's work together
                  </p>

                  <h2 className="mt-3 max-w-lg text-3xl font-black leading-tight tracking-[-0.03em] sm:text-4xl">
                    Got an idea?
                    <br />
                    Let's build it.
                  </h2>

                  <p className="mt-4 max-w-lg text-xs leading-6 text-white/50">
                    I'm interested in web development opportunities,
                    Shopify projects, WordPress development and custom
                    application work.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    <a
                      href={`mailto:${resumeData.profile.email}`}
                      className="flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-[12px] font-bold text-black transition hover:bg-neutral-200"
                    >
                      <Mail size={13} />
                      Contact me
                    </a>

                    {resumeData.profile.linkedin && (
                      <a
                        href={resumeData.profile.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 rounded-full border border-white/20 px-4 py-2.5 text-[12px] font-bold transition hover:bg-white/10"
                      >
                        LinkedIn
                        <ExternalLink size={11} />
                      </a>
                    )}
                  </div>
                </div>

                <div className="grid gap-2">
                  <ContactCard
                    icon={<Mail size={14} />}
                    label="Email"
                    value={resumeData.profile.email}
                    href={`mailto:${resumeData.profile.email}`}
                  />

                  <ContactCard
                    icon={<Phone size={14} />}
                    label="Phone"
                    value={resumeData.profile.phone}
                    href={`tel:${resumeData.profile.phone}`}
                  />

                  <ContactCard
                    icon={<MapPin size={14} />}
                    label="Location"
                    value={resumeData.profile.location}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="flex flex-col items-center justify-between gap-2 px-2 py-5 text-[12px] text-neutral-400 sm:flex-row">
            <p>
              © {new Date().getFullYear()} {resumeData.profile.name}
            </p>

            <p>
              Built with React + Tailwind CSS
            </p>
          </footer>
        </div>
      </div>
    </main>
  );
};

/* =====================================================
   COMPONENTS
===================================================== */

const SidebarLink = ({ label, onClick }) => (
  <button
    onClick={onClick}
    className="group flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-left text-[12px] text-white/60 transition hover:bg-white/10 hover:text-white"
  >
    {label}
    <ChevronRight
      size={10}
      className="opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100"
    />
  </button>
);

const SectionHeading = ({ eyebrow, title, description }) => (
  <div>
    {eyebrow && (
      <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-neutral-400">
        {eyebrow}
      </p>
    )}

    <h2 className="mt-1 text-xl font-black tracking-[-0.025em]">
      {title}
    </h2>

    {description && (
      <p className="mt-2 max-w-xl text-[12px] leading-5 text-neutral-500">
        {description}
      </p>
    )}
  </div>
);

const SectionLabel = ({ icon, title }) => (
  <div className="flex items-center gap-2">
    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-black text-white">
      {icon}
    </div>

    <h2 className="text-sm font-black">
      {title}
    </h2>
  </div>
);

const Stat = ({ value, label }) => (
  <div>
    <p className="text-xl font-black tracking-tight">
      {value}
    </p>

    <p className="mt-0.5 text-[12px] text-neutral-400">
      {label}
    </p>
  </div>
);

const InfoRow = ({ icon, label, value }) => (
  <div className="flex items-start gap-2 rounded-xl bg-neutral-50 p-3">
    <div className="mt-0.5 text-neutral-400">
      {icon}
    </div>

    <div className="min-w-0">
      <p className="text-[12px] uppercase tracking-wider text-neutral-400">
        {label}
      </p>

      <p className="mt-0.5 truncate text-[12px] font-semibold">
        {value}
      </p>
    </div>
  </div>
);

const ProjectCard = ({ project }) => {
  return (
    <a
      href={project.url || "#"}
      target={project.url ? "_blank" : undefined}
      rel={project.url ? "noreferrer" : undefined}
      className="group overflow-hidden rounded-xl border border-neutral-100 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      {/* Project visual */}
      <div className="relative aspect-[1.2/1] overflow-hidden bg-neutral-900">

        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div
            className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${
              project.gradient || "from-neutral-800 to-neutral-950"
            }`}
          >
            <span className="text-center text-lg font-black tracking-tight text-white/80">
              {project.shortName || project.title?.slice(0, 2).toUpperCase()}
            </span>
          </div>
        )}

        <div className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-white text-black opacity-0 shadow transition group-hover:opacity-100">
          <ArrowUpRight size={14} />
        </div>
      </div>

      <div className="p-2.5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-[12px] font-bold leading-tight">
              {project.title}
            </h3>

            <p className="mt-1 text-[7px] text-neutral-400">
              {project.category}
            </p>
          </div>

          <ExternalLink
            size={10}
            className="shrink-0 text-neutral-300"
          />
        </div>
      </div>
    </a>
  );
};

const TimelineItem = ({
  title,
  company,
  period,
  description,
}) => (
  <div className="relative pl-5">
    <div className="absolute left-0 top-1.5 h-2 w-2 rounded-full border-2 border-black bg-white" />

    <div className="absolute left-[3px] top-4 h-[calc(100%+12px)] w-px bg-neutral-200 last:hidden" />

    <div className="flex flex-wrap items-start justify-between gap-2">
      <div>
        <h3 className="text-[12px] font-bold">
          {title}
        </h3>

        <p className="mt-0.5 text-[12px] text-neutral-500">
          {company}
        </p>
      </div>

      <span className="rounded-full bg-neutral-100 px-2 py-1 text-[7px] text-neutral-500">
        {period}
      </span>
    </div>

    <p className="mt-2 text-[12px] leading-4 text-neutral-500">
      {description}
    </p>
  </div>
);

const SkillCircle = ({ name, value }) => (
  <div className="text-center">
    <div
      className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border-[3px] border-black/10 bg-white text-[12px] font-black"
      style={{
        background: `conic-gradient(#171717 ${value}%, #f0f0f0 0)`,
      }}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
        {value}%
      </div>
    </div>

    <p className="mt-2 text-[7px] font-semibold text-neutral-500">
      {name}
    </p>
  </div>
);

const ContactCard = ({ icon, label, value, href }) => {
  const content = (
    <>
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-[7px] uppercase tracking-wider text-white/30">
          {label}
        </p>

        <p className="mt-1 truncate text-[12px] font-semibold text-white/80">
          {value}
        </p>
      </div>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className="flex items-center gap-3 rounded-xl border border-white/10 p-3 transition hover:bg-white/10"
      >
        {content}
      </a>
    );
  }

  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/10 p-3">
      {content}
    </div>
  );
};

export default Resume;