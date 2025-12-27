"use client";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

export default function InstallAppPage() {
  const installApp = async () => {
    const redirectUrl = process.env.NEXT_PUBLIC_APP_URL + "/api/github/install";
    window.location.href = `https://github.com/apps/guxi-app/installations/new?redirect_url=${encodeURIComponent(redirectUrl)}`;
  };
  return (
    <div className="mx-auto max-w-md space-y-4 px-5 rounded-md py-4 bg-secondary/60 border-2 border-border/60 backdrop-blur-2xl">
      <h1 className="text-2xl font-semibold">Install Github App</h1>
      <p className="text-muted-foreground">
        We need your GitHub account to install Guix in order to enable webhooks
        and other features.
      </p>
      <Button onClick={installApp} className="w-full">
        Install Guxi <ExternalLink className="size-4" />
      </Button>
    </div>
  );
}
