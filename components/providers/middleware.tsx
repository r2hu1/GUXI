"use client";

import { useSession } from "@/lib/auth/client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Middleware({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isPending, data, error } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isPending) return;

    if (!data && !error) {
      if (!pathname.startsWith("/~/auth")) {
        router.replace("/~/auth");
      }
      return;
    }

    if (data && pathname.startsWith("/~/auth")) {
      router.replace("/dashboard");
    }
  }, [isPending, data, error, pathname, router]);

  return children;
}
