"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth/client";
import { Loader2 } from "lucide-react";
import { useState } from "react";

export default function ConnectXPage() {
  const [loading, setLoading] = useState(false);
  const connect = async () => {
    setLoading(true);
    await authClient.linkSocial({
      provider: "twitter",
      callbackURL: `/dashboard`,
    });
    setLoading(false);
  };

  return (
    <div className="mx-auto max-w-md space-y-4 px-5 rounded-md py-4 bg-secondary/60 border-2 border-border/60 backdrop-blur-2xl">
      <h1 className="text-2xl font-semibold">Connect X</h1>
      <p className="text-muted-foreground">
        GUXI needs permission to post tweets when you create a GitHub
        repository.
      </p>

      <Button onClick={connect} disabled={loading} className="w-full">
        Connect X {loading && <Loader2 className="animate-spin size-4" />}
      </Button>
    </div>
  );
}
