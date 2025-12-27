"use client";

import Header from "@/components/site/header";
import Hero from "@/components/site/hero";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Twitter } from "lucide-react";

export default function Home() {
  return (
    <main className="">
      <div className="fixed inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
      <Header />
      <Hero />
    </main>
  );
}
