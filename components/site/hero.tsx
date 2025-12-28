"use client";
import { Github, Maximize, Pause, Play } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Slider } from "../ui/slider";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const seekingRef = useRef(false);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onLoadedMetadata = () => {
      setDuration(video.duration || 0);
      setCurrentTime(0);
    };

    const onTimeUpdate = () => {
      if (!seekingRef.current) {
        setCurrentTime(video.currentTime);
      }
    };

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    video.addEventListener("loadedmetadata", onLoadedMetadata);
    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);

    return () => {
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    video.paused ? video.play() : video.pause();
  };

  const onSliderChange = (value: number[]) => {
    if (!value || value.length === 0) return;
    seekingRef.current = true;
    setCurrentTime(value[0]);
  };

  const onSliderCommit = (value: number[]) => {
    if (!value || value.length === 0) return;
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = value[0];
    seekingRef.current = false;
  };

  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      videoRef.current?.parentElement?.requestFullscreen();
    }
  };

  return (
    <section className="py-28 px-6">
      <div className="mx-auto space-y-8 w-full max-w-4xl text-center">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-medium">
          Tweet your GitHub launches automatically using AI.
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Guxi automatically tweets your GitHub launches using AI.
        </p>
        <div className="flex items-center gap-3 justify-center">
          <Button variant="secondary" asChild>
            <Link href="https://github.com/r2hu1/guxi">
              Self-Host <Github className="size-4!" />
            </Link>
          </Button>
          <Button asChild>
            <Link href="/~/auth">Get Started</Link>
          </Button>
        </div>
      </div>

      <div className="bg-border p-2 rounded-md mt-28 max-w-5xl mx-auto relative group">
        <video
          ref={videoRef}
          src="/demo.mov"
          className="rounded-sm w-full"
          onClick={togglePlay}
          controls={false}
        />

        <Button
          size="lg"
          variant="outline"
          onClick={togglePlay}
          className={`absolute h-20 w-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-200 ${
            isPlaying ? "opacity-0" : "opacity-100"
          }`}
        >
          {isPlaying ? (
            <Pause className="!size-8" />
          ) : (
            <Play className="!size-8" />
          )}
        </Button>

        <div
          className="absolute bottom-4 left-6 right-6 bg-black/50 backdrop-blur-sm p-2 rounded-lg flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20"
            onClick={togglePlay}
          >
            {isPlaying ? <Pause /> : <Play />}
          </Button>

          <Slider
            value={[currentTime]}
            min={0}
            max={duration || 100}
            step={0.01}
            disabled={!duration}
            onValueChange={onSliderChange}
            onValueCommit={onSliderCommit}
            className="flex-1"
          />

          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20"
            onClick={toggleFullscreen}
          >
            <Maximize />
          </Button>
        </div>
      </div>
    </section>
  );
}
