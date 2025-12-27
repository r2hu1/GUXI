import { NextResponse } from "next/server";
import { auth } from "@/lib/auth/init";
import { headers } from "next/headers";
import { postTweet } from "@/lib/x/init";

export async function GET() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  await postTweet(session.user.id, "Hello from GUXI 🚀");

  return NextResponse.json({ ok: true });
}
