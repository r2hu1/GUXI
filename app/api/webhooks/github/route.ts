import { NextResponse } from "next/server";

export async function GET() {
  console.log("TEST ROUTE HIT");
  return NextResponse.json({ ok: true });
}

export async function POST(req: Request) {
  const event = req.headers.get("x-github-event");
  const body = await req.json();
  console.log(body);

  console.log("GitHub event:", event);

  if (event === "push") {
    console.log("Repo:", body.repository?.full_name);
    console.log("Commits:", body.commits?.length);
  }

  if (event === "repository") {
    console.log("Repo action:", body.action);
    console.log("Repo name:", body.repository?.full_name);
  }

  return NextResponse.json({ ok: true });
}
