"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth/client";
import { Github, Loader2 } from "lucide-react";
import { useState } from "react";

export default function AuthPage() {
  const [loading, setLoading] = useState(false);

  const signIn = async () => {
    setLoading(true);
    await authClient.signIn.social({
      provider: "github",
      callbackURL: "/dashboard",
    });
    setLoading(false);
  };
  return (
    <div className="mx-auto max-w-md space-y-4 px-5 rounded-md py-4 bg-secondary/60 border-2 border-border/60 backdrop-blur-2xl">
      <h1 className="text-2xl font-semibold">Login or Sign Up</h1>
      <p className="text-muted-foreground">
        Welcome to Guix! Please sign in with your github account to continue.
      </p>
      <Button onClick={signIn} disabled={loading} className="w-full">
        Continue With Github{" "}
        {loading ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <Github className="size-4" />
        )}
      </Button>
    </div>
  );
}
