import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
} from "lucide-react";

export default function Hero() {
  const videoRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  // --------------------------------------------------
  // Typing animation
  // --------------------------------------------------

  const phrases = [
    "digital experiences",
    "web applications",
    "e-commerce platforms",
    "AI-powered solutions",
  ];

  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];

    let timeout;

    // Finished typing
    if (!isDeleting && displayText === currentPhrase) {
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 2200);

      return () => clearTimeout(timeout);
    }

    // Finished deleting
    if (isDeleting && displayText === "") {
      timeout = setTimeout(() => {
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
        setIsDeleting(false);
      }, 450);

      return () => clearTimeout(timeout);
    }

    // Typing
    if (!isDeleting) {
      timeout = setTimeout(() => {
        setDisplayText(
          currentPhrase.substring(0, displayText.length + 1)
        );
      }, 70);
    }

    // Deleting
    if (isDeleting) {
      timeout = setTimeout(() => {
        setDisplayText(
          currentPhrase.substring(0, displayText.length - 1)
        );
      }, 45);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, phraseIndex]);

  // --------------------------------------------------
  // Video controls
  // --------------------------------------------------

  const toggleVideo = async () => {
    const video = videoRef.current;

    if (!video) return;

    try {
      if (video.paused) {
        await video.play();
        setIsPlaying(true);
      } else {
        video.pause();
        setIsPlaying(false);
      }
    } catch (error) {
      console.error("Video playback failed:", error);
      setIsPlaying(false);
    }
  };

  // --------------------------------------------------
  // Mute / Unmute
  // --------------------------------------------------

  const toggleMute = () => {
    const video = videoRef.current;

    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  return (
    <section
      id="jhomelignacio"
      className="relative overflow-hidden"
    >
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-10%] top-[10%] h-[500px] w-[500px] rounded-full bg-violet-600/10 blur-[150px]" />

        <div className="absolute right-[-10%] top-[20%] h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[150px]" />

        <div className="absolute bottom-[-20%] left-[40%] h-[400px] w-[400px] rounded-full bg-violet-500/5 blur-[130px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-16 lg:px-8 lg:pb-32 lg:pt-20">

        {/* Main Hero */}
        <div className="grid items-center gap-14 lg:grid-cols-[1fr_0.9fr] lg:gap-20">

          {/* LEFT CONTENT */}
          <div>

            {/* Availability */}
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-4 py-2 text-xs text-zinc-400 backdrop-blur-xl">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>

              Available for new projects
            </div>

            {/* Eyebrow */}
            <p className="mb-5 text-sm font-medium uppercase tracking-[0.25em] text-violet-400">
              Full-Stack Web Developer
            </p>

            {/* Heading */}
            <h1 className="max-w-4xl text-5xl font-semibold leading-[0.95] tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl xl:text-[82px]">

              <span className="block">
                I build
              </span>

              {/* Animated phrase */}
              <span
                className="block min-h-[1em] text-violet-400"
                aria-live="polite"
              >
                {displayText}

                <span
                  className="ml-1 inline-block h-[0.78em] w-[3px] translate-y-[0.06em] bg-violet-400 align-middle"
                  style={{
                    animation: "blink 1s step-end infinite",
                  }}
                />
              </span>

              <span className="block">
                that{" "}
                <span className="text-green-400">
                  work.
                </span>
              </span>

            </h1>

            {/* Description */}
            <p className="mt-8 max-w-xl text-base leading-7 text-zinc-400 sm:text-lg">
              I'm Jhomel Ignacio, a full-stack developer specializing in
              modern websites, e-commerce platforms, custom applications,
              automation, and AI-powered digital experiences.
            </p>

            {/* CTA */}
            <div className="mt-9 flex flex-wrap items-center gap-3">

              <a
                href="#work"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-black transition duration-300 hover:bg-zinc-200"
              >
                View my work

                <ArrowUpRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-6 py-3.5 text-sm font-medium text-white backdrop-blur-xl transition duration-300 hover:border-white/20 hover:bg-white/[0.07]"
              >
                Let's talk
              </a>

            </div>

            {/* Tech stack */}
            <div className="mt-12 flex flex-wrap items-center gap-2">
              {[
                "React",
                "Laravel",
                "Shopify",
                "WordPress",
                "OpenAI",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-lg border border-white/[0.07] bg-white/[0.025] px-3 py-2 text-xs text-zinc-500 transition hover:border-white/15 hover:text-zinc-300"
                >
                  {item}
                </span>
              ))}
            </div>

          </div>

          {/* RIGHT VIDEO */}
          <div className="relative mx-auto w-full max-w-[560px] lg:ml-auto">

            {/* Glow */}
            <div className="absolute -inset-6 rounded-[40px] bg-violet-500/10 blur-3xl" />

            {/* Video frame */}
            <div className="group relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.03] p-2 shadow-2xl">

              <div
                className="relative aspect-[4/5] cursor-pointer overflow-hidden rounded-[26px] bg-zinc-900"
                onClick={toggleVideo}
              >

                <video
                  ref={videoRef}
                  className="absolute inset-0 h-full w-full object-cover object-top"
                  src="/vuejs/assets/videos/jhomelignacio-v1.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                />

                {/* Gradient overlay */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10" />

                {/* Video label */}
                <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-2 text-[10px] font-medium uppercase tracking-[0.18em] text-white backdrop-blur-md">
                  <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                  About me
                </div>

                {/* Top-right video controls */}
                <div className="absolute right-5 top-5 flex items-center gap-2">

                  {/* Mute / Unmute */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMute();
                    }}
                    aria-label={
                      isMuted
                        ? "Unmute video"
                        : "Mute video"
                    }
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/30 text-white backdrop-blur-md transition duration-300 hover:scale-105 hover:bg-black/50"
                  >
                    {isMuted ? (
                      <VolumeX
                        size={15}
                        strokeWidth={2}
                      />
                    ) : (
                      <Volume2
                        size={15}
                        strokeWidth={2}
                      />
                    )}
                  </button>

                  {/* Play / Pause */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleVideo();
                    }}
                    aria-label={
                      isPlaying
                        ? "Pause video"
                        : "Play video"
                    }
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/30 text-white backdrop-blur-md transition duration-300 hover:scale-105 hover:bg-black/50"
                  >
                    {isPlaying ? (
                      <Pause
                        size={14}
                        fill="currentColor"
                      />
                    ) : (
                      <Play
                        size={14}
                        fill="currentColor"
                      />
                    )}
                  </button>

                </div>

                {/* Center play button */}
                {!isPlaying && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleVideo();
                    }}
                    aria-label="Play video"
                    className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white shadow-2xl backdrop-blur-md transition duration-300 hover:scale-110 hover:bg-black/60"
                  >
                    <Play
                      size={22}
                      fill="currentColor"
                      className="ml-1"
                    />
                  </button>
                )}

                {/* Bottom information */}
                <div className="pointer-events-none absolute bottom-5 left-5 right-5">
                  <div className="flex items-end justify-between gap-5">

                    <div>
                      <p className="text-lg font-semibold text-white">
                        Jhomel Ignacio
                      </p>

                      <p className="mt-1 text-xs text-zinc-300">
                        Developer · Builder · Problem Solver
                      </p>
                    </div>

                    <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1.5 text-[10px] uppercase tracking-wider text-zinc-300 backdrop-blur-md">
                      01 / Intro
                    </span>

                  </div>
                </div>

              </div>
            </div>

            {/* Floating card - top */}
            <div className="absolute -left-5 top-16 hidden rounded-2xl border border-white/10 bg-[#111113]/80 px-4 py-3 shadow-xl backdrop-blur-xl sm:block">
              <p className="text-[10px] uppercase tracking-wider text-zinc-600">
                Experience
              </p>

              <p className="mt-1 text-sm font-semibold text-white">
                Web Development
              </p>
            </div>

            {/* Floating card - bottom */}
            <div className="absolute bottom-20 -right-5 hidden rounded-2xl border border-white/10 bg-[#111113]/80 px-4 py-3 shadow-xl backdrop-blur-xl sm:block">
              <p className="text-[10px] uppercase tracking-wider text-zinc-600">
                Focus
              </p>

              <p className="mt-1 text-sm font-semibold text-white">
                AI · E-commerce · Web
              </p>
            </div>

          </div>

        </div>

        {/* Scroll indicator */}
        <div className="mt-20 flex items-center justify-center lg:mt-24">
          <a
            href="#work"
            className="group flex flex-col items-center gap-3 text-zinc-600 transition hover:text-zinc-300"
          >
            <span className="text-[10px] uppercase tracking-[0.3em]">
              Explore
            </span>

            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 transition group-hover:border-white/20">
              <ArrowDown
                size={15}
                className="animate-bounce"
              />
            </span>
          </a>
        </div>

      </div>

      {/* Cursor blink animation */}
      <style>{`
        @keyframes blink {
          0%,
          45% {
            opacity: 1;
          }

          46%,
          100% {
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
}

