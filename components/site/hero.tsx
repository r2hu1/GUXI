"use client";
import { ExternalLink, Github, Pause, Play } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { useRef, useState } from "react";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  return (
    <section className="py-28 px-6">
      <div className="mx-auto space-y-8 w-full max-w-4xl text-center">
        <h1 className="text-3xl sm:text-4xl md:text-6xl !leading-tight font-medium">
          Tweet your GitHub launches automatically using AI.
        </h1>
        <p className="md:text-lg text-muted-foreground leading-tight max-w-2xl mx-auto">
          Guxi is a self-hosted web-app that automatically tweets your GitHub
          launches using AI. It's built with Next.js, TypeScript, and Tailwind
          CSS. It's easy to self-host and customize to your needs.
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
      <div
        className="bg-border p-2 rounded-md !mt-28 max-w-5xl md:mx-auto relative group"
        onClick={togglePlay}
      >
        <video
          ref={videoRef}
          src="/demo.mov"
          loop
          autoPlay={true}
          className="rounded-sm"
        ></video>
        <Button
          size="lg"
          variant="secondary"
          className={`absolute h-20 w-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity backdrop-blur-sm ${
            isPlaying ? "opacity-0 group-hover:opacity-100" : "opacity-100"
          }`}
        >
          {isPlaying ? (
            <Pause className="!size-10" />
          ) : (
            <Play className="!size-10" />
          )}
        </Button>
      </div>
    </section>
  );
}
