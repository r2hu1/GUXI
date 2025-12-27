import { auth } from "@/lib/auth/init";
import { headers } from "next/headers";
import { db } from "@/db/client";
import { githubInstallations } from "@/db/schema";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export async function GET() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return NextResponse.json({
      github: false,
      x: false,
    });
  }

  const [github] = await db
    .select()
    .from(githubInstallations)
    .where(eq(githubInstallations.userId, session.user.id))
    .limit(1);

  const xToken = await auth.api
    .getAccessToken({
      body: {
        providerId: "twitter",
        userId: session.user.id,
      },
    })
    .catch(() => null);

  return NextResponse.json({
    github: !!github,
    x: !!xToken?.accessToken,
  });
}
