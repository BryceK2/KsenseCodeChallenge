import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

// POST route to handle payload
export async function POST(request: Request) {
  const body = await request.json();
  console.log("Received Payload:", body);

  // store secret message in Redis db
  await redis.set("secret_message", body);
  return NextResponse.json({ msg: "Your secret is safe with me" });
}

// GET route for retrieval once payload sent
// This route is for you to check for storage
export async function GET() {
  const payload = await redis.get("secret_message");
  if (!payload) {
    return NextResponse.json({ error: "No secret message stored." });
  }
  return NextResponse.json(payload);
}
