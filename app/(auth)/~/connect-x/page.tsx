"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth/client";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ConnectXPage() {
  const connect = async () => {
    await authClient.linkSocial({
      provider: "twitter",
      callbackURL: `/dashboard`,
    });
  };

  return (
    <div className="mx-auto max-w-md space-y-6 py-20">
      <h1 className="text-2xl font-semibold">Connect X</h1>
      <p className="text-muted-foreground">
        GUXI needs permission to post tweets when you create a GitHub
        repository.
      </p>

      <Button onClick={connect} className="w-full">
        Connect X
      </Button>
    </div>
  );
}
