import { NextResponse } from "next/server";
import { kv } from "@vercel/kv";

// POST route to handle payload
export async function POST(request: Request) {
  const body = await request.json();
  console.log("Received Payload:", body);

  // store secret message in Vercel's KV db
  await kv.set("secret_message", body);
  return NextResponse.json({ msg: "Your secret is safe with me" });
}

// GET route for retrieval once payload sent
// I can check Vercel's KV db for speed, but this route is for you to check for storage
export async function GET() {
  const payload = await kv.get("secret_message");
  if (!payload) {
    return NextResponse.json({ error: "No secret message stored." });
  }
  return NextResponse.json(payload);
}
