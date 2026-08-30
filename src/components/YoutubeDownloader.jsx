
import React, { useState } from "react";
import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://ignacio-server.test/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

const YoutubeMp3Downloader = () => {
  const [url, setUrl] = useState("");
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDownload = async (e) => {
    e.preventDefault();

    if (!url.trim()) {
      setError("Please enter a YouTube URL.");
      return;
    }

    setError("");
    setLink("");
    setLoading(true);

    try {
      const response = await api.post("/download", {
        url,
      });

      const fileUrl = response.data.data;

      console.log("MP3 URL:", fileUrl);

      setLink(fileUrl);
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          err.message ||
          "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };
  const handleDownloadBtn = () => {
  if (!link) return;

  const anchor = document.createElement("a");
  anchor.href = link;
  const filename = link.split("/").pop();
  anchor.download = filename;

  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
};

  return (
    <section className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-16">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-red-600/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 mb-5">
            <svg
              className="w-8 h-8 text-red-500"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 3C7.03 3 3 7.03 3 12s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9Zm4.5 9.87-6.5 3.75a.5.5 0 0 1-.75-.43V7.81a.5.5 0 0 1 .75-.43l6.5 3.75a1 1 0 0 1 0 1.74Z" />
            </svg>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
            YouTube
            <span className="text-red-500"> to MP3</span>
          </h1>

          <p className="mt-4 text-slate-400 text-base md:text-lg">
            Convert permitted YouTube content into high-quality audio.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-3xl p-5 md:p-8 shadow-2xl">
          <form onSubmit={handleDownload}>
            <label className="block text-sm font-medium text-slate-300 mb-3">
              YouTube URL
            </label>

            <div
              className={`flex items-center gap-3 p-2 rounded-2xl border transition-all duration-200 ${
                error
                  ? "border-red-500/50 bg-red-500/5"
                  : "border-white/10 bg-black/20 focus-within:border-red-500/50 focus-within:ring-4 focus-within:ring-red-500/10"
              }`}
            >
              {/* Link Icon */}
              <div className="pl-3 text-slate-500">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.828 10.172a4 4 0 0 0-5.656 0l-4 4a4 4 0 1 0 5.656 5.656l1.5-1.5m-1.5-4.5a4 4 0 0 0 5.656 0l4-4a4 4 0 1 0-5.656-5.656l-1.5 1.5"
                  />
                </svg>
              </div>

              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Paste YouTube URL here..."
                disabled={loading}
                className="flex-1 min-w-0 bg-transparent border-0 outline-none text-white placeholder:text-slate-600 py-3 px-1 disabled:opacity-50"
              />

              {url && !loading && (
                <button
                  type="button"
                  onClick={() => {
                    setUrl("");
                    setLink("");
                    setError("");
                  }}
                  className="p-2 text-slate-500 hover:text-white transition"
                  aria-label="Clear URL"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2 mt-3 text-sm text-red-400">
                <svg
                  className="w-4 h-4 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v3m0 4h.01M10.29 3.86l-7.82 13a2 2 0 0 0 1.71 3h15.64a2 2 0 0 0 1.71-3l-7.82-13a2 2 0 0 0-3.42 0Z"
                  />
                </svg>

                {error}
              </div>
            )}

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full mt-5 overflow-hidden rounded-2xl bg-red-500 hover:bg-red-600 active:scale-[0.99] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <div className="relative flex items-center justify-center gap-3 px-6 py-4 font-semibold text-white">
                {loading ? (
                  <>
                    <svg
                      className="w-5 h-5 animate-spin"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />

                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      />
                    </svg>

                    Converting...
                  </>
                ) : (
                  <>
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14"
                      />
                    </svg>

                    Convert to MP3
                  </>
                )}
              </div>
            </button>
          </form>

          {/* MP3 Result */}
          {link && (
            <div className="mt-6 p-5 rounded-2xl bg-black/30 border border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-red-500"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 3C7.03 3 3 7.03 3 12s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9Zm4.5 9.87-6.5 3.75a.5.5 0 0 1-.75-.43V7.81a.5.5 0 0 1 .75-.43l6.5 3.75a1 1 0 0 1 0 1.74Z" />
                  </svg>
                </div>

                <div>
                  <h3 className="text-white font-semibold">
                    MP3 Ready
                  </h3>

                  <p className="text-slate-500 text-xs">
                    Your audio is ready to play or download.
                  </p>
                </div>
              </div>

              {/* Audio Player */}
              <audio
                controls
                src={link}
                className="w-full mb-4"
              >
                Your browser does not support the audio player.
              </audio>

              {/* Download Button */}
              <a
                onClick={handleDownloadBtn}
                download="youtube-audio.mp3"
                className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl bg-white text-slate-950 font-semibold hover:bg-slate-200 transition"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14"
                  />
                </svg>

                Download MP3
              </a>
            </div>
          )}

          {/* Features */}
          <div className="grid grid-cols-3 gap-4 mt-7 pt-6 border-t border-white/10">
            <div className="text-center">
              <div className="text-white font-semibold text-sm">
                Fast
              </div>

              <div className="text-slate-500 text-xs mt-1">
                Quick conversion
              </div>
            </div>

            <div className="text-center border-x border-white/10">
              <div className="text-white font-semibold text-sm">
                MP3
              </div>

              <div className="text-slate-500 text-xs mt-1">
                High-quality audio
              </div>
            </div>

            <div className="text-center">
              <div className="text-white font-semibold text-sm">
                Simple
              </div>

              <div className="text-slate-500 text-xs mt-1">
                One-click download
              </div>
            </div>
          </div>
        </div>

        {/* Footer note */}
        <p className="text-center text-xs text-slate-600 mt-6">
          Only download content you have permission or legal rights to
          download.
        </p>
      </div>
    </section>
  );
};

export default YoutubeMp3Downloader;

