import { auth } from "@/lib/auth/init";

export async function getXAccessToken(userId: string) {
  const token = await auth.api.getAccessToken({
    body: {
      providerId: "twitter",
      userId,
    },
  });

  if (!token?.accessToken) {
    return null;
  }
  return token.accessToken;
}

export async function postTweet(userId: string, text: string) {
  const accessToken = await getXAccessToken(userId);

  const res = await fetch("https://api.x.com/2/tweets", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error);
  }

  return res.json();
}
