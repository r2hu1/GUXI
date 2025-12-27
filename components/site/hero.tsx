import { ExternalLink, Github } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="py-28 px-6">
      <div className="mx-auto space-y-8 w-full max-w-6xl text-center">
        <h1 className="text-3xl md:text-6xl !leading-tight lg:text-7xl font-medium">
          Tweet your GitHub launches automatically using AI.
        </h1>
        <p className="sm:text-lg text-muted-foreground leading-tight max-w-2xl mx-auto">
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
      <div className="bg-border p-2 rounded-md !mt-28 max-w-5xl md:mx-auto">
        <img src="/flow.png" className="rounded-sm" />
      </div>
    </section>
  );
}
