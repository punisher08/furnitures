import React from "react";
import SEO from "../components/SEO";
import Navbar from "../components/cv/Navbar";
import Hero from "../components/cv/Hero";
import ProjectCard from "../components/cv/ProjectCard";
import About from "../components/cv/About";
import Skills from "../components/cv/Skills";
import Contact from "../components/cv/Contact";
import Footer from "../components/cv/Footer";
import { sortedProjects } from "../data/projects";

const Home = () => {
  return (
    <>
      <SEO
        title="JHOMEL IGNACIO"
        description="WEB DEVELOPER PORTFOLIO"
        path="/"
      />

      <div className="min-h-screen bg-[#0b0b0c] text-white">

        {/* Background effects */}
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">

          <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-violet-600/10 blur-[140px]" />

          <div className="absolute right-[-150px] top-[30%] h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[150px]" />

          <div className="absolute bottom-[-200px] left-[30%] h-[500px] w-[500px] rounded-full bg-violet-500/5 blur-[150px]" />

        </div>

        {/* Navbar */}
        <Navbar />

        {/* Main content */}
      <main className="relative z-10 pt-[80px]">

          {/* Hero */}
          <Hero />

          {/* Work */}
          <section
            id="work"
            className="mx-auto max-w-7xl scroll-mt-24 px-6 py-24 lg:px-8"
          >

            <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">

              <div>
                <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-violet-400">
                  Selected work
                </p>

                <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
                  Things I've built.
                </h2>
              </div>

              <p className="max-w-md text-sm leading-6 text-zinc-500">
                A selection of websites, applications and digital experiences
                created with modern technologies.
              </p>

            </div>

            {/* Project cards */}
            <div className="">
                <ProjectCard projects={sortedProjects} />
            </div>

          </section>

          {/* About */}
          <div id="about" className="scroll-mt-24">
            <About />
          </div>

          {/* Skills */}
          <div id="skills" className="scroll-mt-24">
            <Skills />
          </div>

          {/* Contact */}
          <div id="contact" className="scroll-mt-24">
            <Contact />
          </div>

        </main>

        {/* Footer */}
        <Footer />

      </div>
    </>
  );
};

export default Home;