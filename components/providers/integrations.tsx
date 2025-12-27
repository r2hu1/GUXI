"use client";

import { ReactNode, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

export function Integrations({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const check = async () => {
      const res = await fetch("/api/integrations/status");
      const data = await res.json();

      if (!data.github) {
        if (pathname !== "/~/install-app") {
          router.replace("/~/install-app");
        }
        setLoading(false);
        return;
      }

      if (!data.x) {
        if (pathname !== "/~/connect-x/") {
          router.replace("/~/connect-x/");
        }
        setLoading(false);
        return;
      }

      setLoading(false);
    };

    check();
  }, [router, pathname]);

  if (loading) {
    return <Skeleton className="h-40 w-full" />;
  }

  return <>{children}</>;
}
