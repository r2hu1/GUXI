import { db } from "@/db/client";
import { githubInstallations } from "@/db/schema";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { getRepoDetails, verifyGitHubSignature } from "@/lib/github/utils";
import { generateTweet } from "@/lib/ai/openrouter";
import { postTweet } from "@/lib/x/init";

export async function POST(req: Request) {
  const signature = req.headers.get("x-hub-signature-256");
  const event = req.headers.get("x-github-event");

  const rawBody = await req.text();

  if (!signature || !verifyGitHubSignature(rawBody, signature)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const body = JSON.parse(rawBody);

  const installationId = body.installation?.id;
  if (!installationId) {
    return NextResponse.json({ ignored: true });
  }

  const [installation] = await db
    .select()
    .from(githubInstallations)
    .where(eq(githubInstallations.installationId, installationId))
    .limit(1);

  if (!installation) {
    return NextResponse.json({ ignored: true });
  }

  if (event === "installation" && body.action === "deleted") {
    await db
      .delete(githubInstallations)
      .where(eq(githubInstallations.installationId, installationId));
    return NextResponse.json({ ok: true });
  }

  if (event === "installation_repositories" && body.action === "added") {
    for (const repo of body.repositories_added ?? []) {
      if (repo.private) continue;
      const repoDetails = await getRepoDetails(
        installation.installationId,
        repo.full_name,
      );
      const neededDetails = {
        name: repoDetails.name,
        fullName: repoDetails.full_name,
        description: repoDetails.description ?? "",
        topics: repoDetails.topics ?? [],
        language: repoDetails.language ?? "",
        stars: repoDetails.stargazers_count ?? 0,
        forks: repoDetails.forks_count ?? 0,
        url: repoDetails.html_url ?? "",
        owner: repoDetails.owner?.login ?? "",
      };
      const generatedTweet = await generateTweet(neededDetails, 280);
      await postTweet(installation.userId, generatedTweet);
    }
  }

  if (event === "repository" && body.action === "publicized") {
    const repo = body.repository;
    if (repo.private) {
      return NextResponse.json({ ignored: true });
    }
    const repoDetails = await getRepoDetails(
      installation.installationId,
      repo.full_name,
    );
    const neededDetails = {
      name: repoDetails.name,
      fullName: repoDetails.full_name,
      description: repoDetails.description ?? "",
      topics: repoDetails.topics ?? [],
      language: repoDetails.language ?? "",
      stars: repoDetails.stargazers_count ?? 0,
      forks: repoDetails.forks_count ?? 0,
      url: repoDetails.html_url ?? "",
      owner: repoDetails.owner?.login ?? "",
    };
    const generatedTweet = await generateTweet(neededDetails, 280);
    await postTweet(installation.userId, generatedTweet);
  }

  return NextResponse.json({ ok: true });
}
