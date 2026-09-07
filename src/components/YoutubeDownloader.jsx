
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

const YoutubeDownloader = () => {
  const [url, setUrl] = useState("");
  const [videoId, setVideoId] = useState("");
  const [link, setLink] = useState("");
  const [platform, setPlatform] = useState("youtube");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /*
  |--------------------------------------------------------------------------
  | Detect platform
  |--------------------------------------------------------------------------
  */

  const detectPlatform = (value) => {
    try {
      const parsedUrl = new URL(value);
      const host = parsedUrl.hostname.toLowerCase();

      if (
        host.includes("facebook.com") ||
        host.includes("fb.watch")
      ) {
        return "facebook";
      }

      if (
        host.includes("youtube.com") ||
        host.includes("youtu.be")
      ) {
        return "youtube";
      }

      return "";
    } catch {
      return "";
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Extract YouTube video ID
  |--------------------------------------------------------------------------
  */

  const getYoutubeVideoId = (value) => {
    try {
      const parsedUrl = new URL(value);

      if (parsedUrl.hostname.includes("youtube.com")) {
        return parsedUrl.searchParams.get("v") || "";
      }

      if (parsedUrl.hostname.includes("youtu.be")) {
        return parsedUrl.pathname.substring(1).split("?")[0];
      }

      return "";
    } catch {
      return "";
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Handle URL change
  |--------------------------------------------------------------------------
  */

  const handleUrlChange = (e) => {
    const value = e.target.value;

    setUrl(value);
    setError("");
    setLink("");

    const detectedPlatform = detectPlatform(value);

    if (detectedPlatform) {
      setPlatform(detectedPlatform);
    }

    if (detectedPlatform === "youtube") {
      setVideoId(getYoutubeVideoId(value));
    } else {
      setVideoId("");
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Paste
  |--------------------------------------------------------------------------
  */

  const handlePaste = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();

      if (!clipboardText) return;

      setUrl(clipboardText);

      const detectedPlatform = detectPlatform(clipboardText);

      if (detectedPlatform) {
        setPlatform(detectedPlatform);
      }

      if (detectedPlatform === "youtube") {
        const id = getYoutubeVideoId(clipboardText);

        if (id) {
          setVideoId(id);
          setError("");
        } else {
          setError("The copied text is not a valid YouTube URL.");
        }
      } else if (detectedPlatform === "facebook") {
        setVideoId("");
        setError("");
      } else {
        setError(
          "Please paste a valid YouTube or Facebook URL."
        );
      }
    } catch (err) {
      console.error(err);
      setError("Unable to access your clipboard.");
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Download / Convert
  |--------------------------------------------------------------------------
  */

  const handleConvert = async (e) => {
    e.preventDefault();

    if (!url.trim()) {
      setError("Paste a video URL first.");
      return;
    }

    const detectedPlatform = detectPlatform(url);

    if (!detectedPlatform) {
      setError(
        "Please enter a valid YouTube or Facebook URL."
      );
      return;
    }

    if (
      detectedPlatform === "youtube" &&
      !getYoutubeVideoId(url)
    ) {
      setError("Please enter a valid YouTube URL.");
      return;
    }

    setPlatform(detectedPlatform);
    setError("");
    setLink("");
    setLoading(true);

    try {
      /*
      |--------------------------------------------------------------------------
      | YouTube
      |--------------------------------------------------------------------------
      */

      if (detectedPlatform === "youtube") {
        const response = await api.post("/download", {
          url,
        });

        const fileUrl = response.data.data.url;
        console.log(fileUrl);
        

        if (!fileUrl) {
          throw new Error(
            "The server did not return an MP3 file."
          );
        }

        setLink(fileUrl);
      }

      /*
      |--------------------------------------------------------------------------
      | Facebook Reel
      |--------------------------------------------------------------------------
      */

      if (detectedPlatform === "facebook") {
        const response = await api.post("/reel", {
          url,
        });

        /*
         * Your PHP Reel endpoint returns:
         *
         * {
         *   success: true,
         *   url: "...mp4"
         * }
         */

        const fileUrl =
          response.data?.url ||
          response.data?.data.url;

        if (!fileUrl) {
          throw new Error(
            "The server did not return an MP4 file."
          );
        }
        console.log(fileUrl);
        
        setLink(fileUrl);
      }

      /*
      |--------------------------------------------------------------------------
      | Scroll result into view
      |--------------------------------------------------------------------------
      */

      setTimeout(() => {
        document
          .getElementById("download-result")
          ?.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
      }, 100);
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          err.message ||
          "Unable to process this video."
      );
    } finally {
      setLoading(false);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Download file
  |--------------------------------------------------------------------------
  */

  const handleDownload = async () => {
    if (!link) return;

    try {
      const response = await axios.get(link, {
        responseType: "blob",
      });

      const isFacebook = platform === "facebook";

      const mimeType = isFacebook
        ? "video/mp4"
        : "audio/mpeg";

      const extension = isFacebook
        ? "mp4"
        : "mp3";

      const filename = isFacebook
        ? "facebook-reel.mp4"
        : "youtube-audio.mp3";

      const blobUrl = window.URL.createObjectURL(
        new Blob([response.data], {
          type: mimeType,
        })
      );

      const anchor = document.createElement("a");

      anchor.href = blobUrl;
      anchor.download = filename;

      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();

      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error(err);

      setError(
        platform === "facebook"
          ? "Unable to download the MP4 file."
          : "Unable to download the MP3 file."
      );
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Clear
  |--------------------------------------------------------------------------
  */

  const handleClear = () => {
    setUrl("");
    setVideoId("");
    setLink("");
    setError("");
  };

  /*
  |--------------------------------------------------------------------------
  | Open YouTube
  |--------------------------------------------------------------------------
  */

  const handleYoutubeSearch = () => {
    window.open(
      "https://www.youtube.com/",
      "_blank",
      "noopener,noreferrer"
    );
  };

  /*
  |--------------------------------------------------------------------------
  | Open Facebook
  |--------------------------------------------------------------------------
  */

  const handleFacebook = () => {
    window.open(
      "https://www.facebook.com/",
      "_blank",
      "noopener,noreferrer"
    );
  };

  const isFacebook = platform === "facebook";

  return (
    <section className="relative min-h-screen bg-slate-950 px-4 py-8 sm:py-12 lg:py-16 overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-72 h-72 sm:w-96 sm:h-96 bg-red-600/20 rounded-full blur-3xl" />

        <div className="absolute -bottom-32 -right-32 w-72 h-72 sm:w-96 sm:h-96 bg-purple-600/20 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-7 sm:mb-10">

          <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-red-500/10 border border-red-500/20 mb-4 sm:mb-5">

            <svg
              className="w-7 h-7 sm:w-8 sm:h-8 text-red-500"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 3C7.03 3 3 7.03 3 12s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9Zm4.5 9.87-6.5 3.75a.5.5 0 0 1-.75-.43V7.81a.5.5 0 0 1 .75-.43l6.5 3.75a1 1 0 0 1 0 1.74Z" />
            </svg>

          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">

            Video
            <span className="text-red-500">
              {" "}Downloader
            </span>

          </h1>

          <p className="mt-3 sm:mt-4 text-slate-400 text-sm sm:text-base md:text-lg max-w-xl mx-auto px-2">

            Download permitted YouTube videos as MP3
            or Facebook Reels as MP4.

          </p>

        </div>

        {/* Main */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6">

          {/* LEFT */}
          <div className="bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-3xl p-4 sm:p-6 md:p-7 shadow-2xl">

            {/* Find video */}
            <div className="flex items-center gap-3 mb-5">

              <div className="w-10 h-10 shrink-0 rounded-xl bg-red-500/10 flex items-center justify-center">

                <svg
                  className="w-5 h-5 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <circle cx="11" cy="11" r="7" />

                  <path
                    strokeLinecap="round"
                    d="m20 20-4-4"
                  />
                </svg>

              </div>

              <div>

                <h2 className="text-white font-semibold">
                  Find a video
                </h2>

                <p className="text-xs sm:text-sm text-slate-500">
                  Choose a platform and paste a link.
                </p>

              </div>

            </div>

            {/* Platform buttons */}
            <div className="grid grid-cols-2 gap-3">

              <button
                type="button"
                onClick={handleYoutubeSearch}
                className={`min-h-[52px] flex items-center justify-center gap-3 rounded-2xl border font-semibold transition ${
                  platform === "youtube"
                    ? "bg-red-500/10 border-red-500/40 text-white"
                    : "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10"
                }`}
              >

                <svg
                  className="w-5 h-5 text-red-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8Z" />
                  <path
                    fill="white"
                    d="m9.5 15.5 6-3.5-6-3.5v7Z"
                  />
                </svg>

                YouTube

              </button>

              <button
                type="button"
                onClick={handleFacebook}
                className={`min-h-[52px] flex items-center justify-center gap-3 rounded-2xl border font-semibold transition ${
                  platform === "facebook"
                    ? "bg-blue-500/10 border-blue-500/40 text-white"
                    : "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10"
                }`}
              >

                <svg
                  className="w-5 h-5 text-blue-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.18 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.03 1.79-4.7 4.53-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.26h3.34l-.53 3.49h-2.81V24C19.61 23.18 24 18.1 24 12.07Z" />
                </svg>

                Facebook Reels

              </button>

            </div>

            {/* Steps */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-5">

              {[
                ["1", "Find"],
                ["2", "Copy"],
                ["3", "Paste"],
              ].map(([number, text]) => (

                <div
                  key={number}
                  className="rounded-xl bg-black/20 border border-white/5 p-3 text-center"
                >

                  <div className="mx-auto mb-1.5 w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-xs text-white">
                    {number}
                  </div>

                  <div className="text-xs text-slate-500">
                    {text}
                  </div>

                </div>

              ))}

            </div>

            {/* Preview */}
            <div className="mt-6">

              <div className="flex items-center justify-between mb-3">

                <span className="text-sm font-medium text-slate-300">
                  Preview
                </span>

                {videoId && !isFacebook && (
                  <span className="text-xs text-green-400">
                    Video found
                  </span>
                )}

                {isFacebook && url && (
                  <span className="text-xs text-blue-400">
                    Facebook Reel
                  </span>
                )}

              </div>

              <div className="aspect-video rounded-2xl overflow-hidden bg-black border border-white/10">

                {videoId && !isFacebook ? (

                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title="YouTube video preview"
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />

                ) : link && isFacebook ? (

                  <video
                    className="w-full h-full object-contain bg-black"
                    controls
                    preload="metadata"
                    src={link}
                  >
                    Your browser does not support video playback.
                  </video>

                ) : (

                  <div className="h-full flex flex-col items-center justify-center px-5 text-center">

                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-3">

                      <svg
                        className="w-6 h-6 text-slate-700"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                      >
                        <rect
                          width="18"
                          height="14"
                          x="3"
                          y="5"
                          rx="2"
                        />

                        <path d="m10 9 5 3-5 3V9Z" />

                      </svg>

                    </div>

                    <p className="text-slate-600 text-xs sm:text-sm">
                      Your video preview will appear here.
                    </p>

                  </div>

                )}

              </div>

            </div>

          </div>

          {/* RIGHT */}
          <div className="bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-3xl p-4 sm:p-6 md:p-7 shadow-2xl">

            {/* Header */}
            <div className="flex items-center gap-3 mb-5">

              <div className="w-10 h-10 shrink-0 rounded-xl bg-red-500/10 flex items-center justify-center">

                <svg
                  className="w-5 h-5 text-red-500"
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

              </div>

              <div>

                <h2 className="text-white font-semibold">
                  {isFacebook
                    ? "Download MP4"
                    : "Convert to MP3"}
                </h2>

                <p className="text-xs sm:text-sm text-slate-500">
                  {isFacebook
                    ? "Paste your Facebook Reel URL."
                    : "Paste your YouTube URL."}
                </p>

              </div>

            </div>

            <form onSubmit={handleConvert}>

              <label className="block text-sm font-medium text-slate-300 mb-2.5">
                {isFacebook
                  ? "Facebook Reel URL"
                  : "YouTube URL"}
              </label>

              {/* URL Input */}
              <div
                className={`flex items-center gap-1.5 p-1.5 rounded-2xl border transition ${
                  error
                    ? "border-red-500/50 bg-red-500/5"
                    : "border-white/10 bg-black/20 focus-within:border-red-500/50 focus-within:ring-4 focus-within:ring-red-500/10"
                }`}
              >

                <input
                  type="url"
                  value={url}
                  onChange={handleUrlChange}
                  placeholder={
                    isFacebook
                      ? "Paste Facebook Reel URL..."
                      : "Paste YouTube URL..."
                  }
                  disabled={loading}
                  inputMode="url"
                  autoCapitalize="none"
                  autoCorrect="off"
                  spellCheck="false"
                  className="flex-1 min-w-0 bg-transparent outline-none border-0 text-white text-sm sm:text-base placeholder:text-slate-600 py-3.5 px-3"
                />

                {/* Paste */}
                {!url && (
                  <button
                    type="button"
                    onClick={handlePaste}
                    className="shrink-0 px-3 py-2.5 rounded-xl bg-white/10 text-slate-300 hover:bg-white/15 active:scale-95 text-xs font-medium transition"
                  >
                    Paste
                  </button>
                )}

                {/* Clear */}
                {url && !loading && (
                  <button
                    type="button"
                    onClick={handleClear}
                    className="shrink-0 w-10 h-10 flex items-center justify-center rounded-xl text-slate-500 hover:text-white hover:bg-white/5 transition"
                    aria-label="Clear URL"
                  >
                    ✕
                  </button>
                )}

              </div>

              {/* Error */}
              {error && (
                <div className="mt-3 flex gap-2 text-sm text-red-400">

                  <svg
                    className="w-4 h-4 shrink-0 mt-0.5"
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

                  <span>{error}</span>

                </div>
              )}

              {/* Convert / Download Button */}
              <button
                type="submit"
                disabled={loading || !url.trim()}
                className={`w-full min-h-[54px] mt-4 rounded-2xl ${
                  isFacebook
                    ? "bg-blue-500 hover:bg-blue-600"
                    : "bg-red-500 hover:bg-red-600"
                } active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold transition flex items-center justify-center gap-3 touch-manipulation`}
              >

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

                    {isFacebook
                      ? "Downloading..."
                      : "Converting..."}

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

                    {isFacebook
                      ? "Download Reel MP4"
                      : "Convert to MP3"}

                  </>

                )}

              </button>

            </form>

            {/* RESULT */}
            {link && (
              <div
                id="download-result"
                className="mt-5 p-4 sm:p-5 rounded-2xl bg-black/30 border border-green-500/20"
              >

                {/* Success */}
                <div className="flex items-center gap-3 mb-4">

                  <div className="w-10 h-10 shrink-0 rounded-xl bg-green-500/10 flex items-center justify-center">

                    <svg
                      className="w-5 h-5 text-green-400"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m5 12 4 4L19 6"
                      />
                    </svg>

                  </div>

                  <div className="min-w-0">

                    <h3 className="text-white font-semibold">
                      {isFacebook
                        ? "MP4 Ready"
                        : "MP3 Ready"}
                    </h3>

                    <p className="text-slate-500 text-xs">
                      {isFacebook
                        ? "Preview or download your Reel."
                        : "Play or download your audio."}
                    </p>

                  </div>

                </div>

                {/* Media player */}
                <div className="rounded-xl overflow-hidden">

                  {isFacebook ? (

                    <video
                      controls
                      preload="metadata"
                      src={link}
                      className="w-full max-h-[420px] bg-black rounded-xl"
                    >
                      Your browser does not support video playback.
                    </video>

                  ) : (

                    <audio
                      controls
                      preload="metadata"
                      src={link}
                      className="w-full"
                    >
                      Your browser does not support audio playback.
                    </audio>

                  )}

                </div>

                {/* Download */}
                <button
                  type="button"
                  onClick={handleDownload}
                  className="w-full min-h-[54px] mt-4 flex items-center justify-center gap-2 rounded-xl bg-white text-slate-950 font-semibold hover:bg-slate-200 active:scale-[0.98] transition touch-manipulation"
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

                  {isFacebook
                    ? "Download MP4"
                    : "Download MP3"}

                </button>

              </div>
            )}

            {/* Features */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-6 pt-5 border-t border-white/10">

              <div className="text-center">

                <div className="text-white font-semibold text-sm">
                  Fast
                </div>

                <div className="text-slate-600 text-[11px] sm:text-xs mt-1">
                  Quick download
                </div>

              </div>

              <div className="text-center border-x border-white/10">

                <div className="text-white font-semibold text-sm">
                  {isFacebook ? "MP4" : "192K"}
                </div>

                <div className="text-slate-600 text-[11px] sm:text-xs mt-1">
                  {isFacebook
                    ? "Video quality"
                    : "MP3 quality"}
                </div>

              </div>

              <div className="text-center">

                <div className="text-white font-semibold text-sm">
                  Simple
                </div>

                <div className="text-slate-600 text-[11px] sm:text-xs mt-1">
                  Easy download
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* Footer */}
        <p className="text-center text-[11px] sm:text-xs text-slate-600 mt-6 px-4">
          Only download content you have permission or legal rights to
          download.
        </p>

      </div>

    </section>
  );
};

export default YoutubeDownloader;

