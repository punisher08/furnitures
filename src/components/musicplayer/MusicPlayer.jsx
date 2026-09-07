import React, { useEffect, useRef, useState } from "react";

const MusicPlayer = () => {
  const audioRef = useRef(null);

  const [tracks, setTracks] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);

  const currentTrack = tracks[currentIndex];

  /*
  |--------------------------------------------------------------------------
  | Load Local Music
  |--------------------------------------------------------------------------
  */
  const handleFiles = (event) => {
    const files = Array.from(event.target.files || []);

    const audioFiles = files.filter((file) =>
      file.type.startsWith("audio/")
    );

    const newTracks = audioFiles.map((file) => ({
      id: `${file.name}-${file.lastModified}`,
      name: file.name.replace(/\.[^/.]+$/, ""),
      file,
      url: URL.createObjectURL(file),
    }));

    setTracks((prev) => [...prev, ...newTracks]);

    if (tracks.length === 0 && newTracks.length > 0) {
      setCurrentIndex(0);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Play / Pause
  |--------------------------------------------------------------------------
  */
  const togglePlay = async () => {
    if (!audioRef.current || !currentTrack) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        console.error("Unable to play audio:", error);
      }
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Select Track
  |--------------------------------------------------------------------------
  */
  const selectTrack = (index) => {
    setCurrentIndex(index);
    setProgress(0);

    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }, 50);
  };

  /*
  |--------------------------------------------------------------------------
  | Previous
  |--------------------------------------------------------------------------
  */
  const previousTrack = () => {
    if (!tracks.length) return;

    const newIndex =
      currentIndex === 0
        ? tracks.length - 1
        : currentIndex - 1;

    selectTrack(newIndex);
  };

  /*
  |--------------------------------------------------------------------------
  | Next
  |--------------------------------------------------------------------------
  */
  const nextTrack = () => {
    if (!tracks.length) return;

    const newIndex =
      currentIndex === tracks.length - 1
        ? 0
        : currentIndex + 1;

    selectTrack(newIndex);
  };

  /*
  |--------------------------------------------------------------------------
  | Audio Events
  |--------------------------------------------------------------------------
  */
  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    const handleTimeUpdate = () => {
      if (!audio.duration) return;

      setProgress(
        (audio.currentTime / audio.duration) * 100
      );
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      nextTrack();
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener(
      "loadedmetadata",
      handleLoadedMetadata
    );
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener(
        "timeupdate",
        handleTimeUpdate
      );

      audio.removeEventListener(
        "loadedmetadata",
        handleLoadedMetadata
      );

      audio.removeEventListener("ended", handleEnded);
    };
  }, [currentIndex, tracks]);

  /*
  |--------------------------------------------------------------------------
  | Volume
  |--------------------------------------------------------------------------
  */
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  /*
  |--------------------------------------------------------------------------
  | Seek
  |--------------------------------------------------------------------------
  */
  const handleSeek = (event) => {
    if (!audioRef.current || !duration) return;

    const value = Number(event.target.value);

    audioRef.current.currentTime =
      (value / 100) * duration;

    setProgress(value);
  };

  /*
  |--------------------------------------------------------------------------
  | Time Formatter
  |--------------------------------------------------------------------------
  */
  const formatTime = (seconds) => {
    if (!seconds || Number.isNaN(seconds)) {
      return "0:00";
    }

    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);

    return `${minutes}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <section className="min-h-screen bg-zinc-950 p-4 text-white md:p-8">

      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src={currentTrack?.url || ""}
        preload="metadata"
      />

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 md:grid-cols-4 md:grid-rows-3">

        {/* =====================================================
            MAIN PLAYER
        ====================================================== */}
        <div className="relative overflow-hidden rounded-3xl bg-zinc-900 p-6 md:col-span-3 md:row-span-3">

          <div className="relative flex min-h-[650px] flex-col">

            {/* Header */}
            <div className="flex items-center justify-between">

              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
                  Local Music
                </p>

                <p className="mt-1 text-sm text-zinc-400">
                  {tracks.length
                    ? `${tracks.length} songs loaded`
                    : "No music selected"}
                </p>
              </div>

              {/* Add Music */}
              <label className="cursor-pointer rounded-full bg-white px-4 py-2 text-sm font-medium text-black transition hover:bg-zinc-200">
                + Add Music

                <input
                  type="file"
                  accept="audio/*"
                  multiple
                  onChange={handleFiles}
                  className="hidden"
                />
              </label>
            </div>

            {/* Album Artwork */}
            <div className="flex flex-1 items-center justify-center">

              {currentTrack ? (
                <div className="flex aspect-square w-full max-w-[360px] items-center justify-center rounded-3xl bg-gradient-to-br from-zinc-700 via-zinc-900 to-black shadow-2xl">

                  <div className="text-center px-8">

                    <div className="mx-auto mb-6 flex h-28 w-28 items-center justify-center rounded-full bg-white/10 text-5xl">
                      ♪
                    </div>

                    <p className="line-clamp-2 text-lg font-medium">
                      {currentTrack.name}
                    </p>

                    <p className="mt-2 text-sm text-zinc-500">
                      Local audio file
                    </p>

                  </div>

                </div>
              ) : (
                <div className="flex aspect-square w-full max-w-[360px] flex-col items-center justify-center rounded-3xl border border-dashed border-zinc-700 bg-zinc-800/50 p-8 text-center">

                  <div className="mb-5 text-6xl">
                    ♪
                  </div>

                  <h2 className="text-xl font-semibold">
                    Your Music
                  </h2>

                  <p className="mt-2 text-sm text-zinc-500">
                    Select music from your device to start
                    listening.
                  </p>

                  <label className="mt-6 cursor-pointer rounded-full bg-white px-5 py-3 text-sm font-medium text-black">
                    Choose Music

                    <input
                      type="file"
                      accept="audio/*"
                      multiple
                      onChange={handleFiles}
                      className="hidden"
                    />
                  </label>

                </div>
              )}

            </div>

            {/* Track Information */}
            {currentTrack && (
              <>
                <div>
                  <h1 className="truncate text-2xl font-semibold md:text-3xl">
                    {currentTrack.name}
                  </h1>

                  <p className="mt-1 text-sm text-zinc-500">
                    {currentTrack.file.name}
                  </p>
                </div>

                {/* Progress */}
                <div className="mt-7">

                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={progress}
                    onChange={handleSeek}
                    className="h-1 w-full cursor-pointer appearance-none rounded-full bg-zinc-700 accent-white"
                  />

                  <div className="mt-2 flex justify-between text-xs text-zinc-500">
                    <span>
                      {formatTime(
                        audioRef.current?.currentTime
                      )}
                    </span>

                    <span>
                      {formatTime(duration)}
                    </span>
                  </div>

                </div>

                {/* Controls */}
                <div className="mt-6 flex items-center justify-center gap-8">

                  <button
                    onClick={previousTrack}
                    className="text-xl text-zinc-400 transition hover:text-white"
                    title="Previous"
                  >
                    ⏮
                  </button>

                  <button
                    onClick={togglePlay}
                    className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-xl text-black transition hover:scale-105"
                  >
                    {isPlaying ? "Ⅱ" : "▶"}
                  </button>

                  <button
                    onClick={nextTrack}
                    className="text-xl text-zinc-400 transition hover:text-white"
                    title="Next"
                  >
                    ⏭
                  </button>

                </div>
              </>
            )}

          </div>
        </div>

        {/* =====================================================
            PLAYLIST
        ====================================================== */}
        <div className="rounded-3xl bg-zinc-900 p-5 md:col-span-1">

          <div className="mb-5 flex items-center justify-between">

            <h2 className="font-semibold">
              Playlist
            </h2>

            <span className="text-xs text-zinc-500">
              {tracks.length}
            </span>

          </div>

          {tracks.length === 0 ? (
            <div className="py-10 text-center">

              <p className="text-sm text-zinc-500">
                Your playlist is empty.
              </p>

              <p className="mt-2 text-xs text-zinc-600">
                Add music from your device.
              </p>

            </div>
          ) : (
            <div className="max-h-[390px] space-y-2 overflow-y-auto">

              {tracks.map((track, index) => (

                <button
                  key={track.id}
                  onClick={() => selectTrack(index)}
                  className={`flex w-full items-center gap-3 rounded-2xl p-3 text-left transition ${
                    currentIndex === index
                      ? "bg-white/10"
                      : "hover:bg-white/5"
                  }`}
                >

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-zinc-800 text-sm">
                    {currentIndex === index && isPlaying
                      ? "♫"
                      : index + 1}
                  </div>

                  <div className="min-w-0">

                    <p className="truncate text-sm font-medium">
                      {track.name}
                    </p>

                    <p className="truncate text-xs text-zinc-500">
                      {formatTime(
                        track.file.size / 100000
                      )}
                    </p>

                  </div>

                </button>

              ))}

            </div>
          )}

        </div>

        {/* =====================================================
            VOLUME
        ====================================================== */}
        <div className="rounded-3xl bg-zinc-900 p-5 md:col-span-1">

          <div className="flex justify-between">

            <span className="text-sm text-zinc-400">
              Volume
            </span>

            <span className="text-sm">
              {Math.round(volume * 100)}%
            </span>

          </div>

          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) =>
              setVolume(Number(e.target.value))
            }
            className="mt-5 h-1 w-full cursor-pointer appearance-none rounded-full bg-zinc-700 accent-white"
          />

        </div>

        {/* =====================================================
            LOCAL STORAGE INFO
        ====================================================== */}
        <div className="rounded-3xl bg-white p-5 text-black md:col-span-1">

          <p className="text-xs uppercase tracking-widest text-zinc-500">
            Device
          </p>

          <p className="mt-3 text-lg font-semibold">
            Local Music
          </p>

          <p className="mt-1 text-sm text-zinc-500">
            Your files stay on your device.
          </p>

        </div>

      </div>
    </section>
  );
};

export default MusicPlayer;