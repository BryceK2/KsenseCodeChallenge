import { NextApiRequest, NextApiResponse } from "next";
import { kv } from "@vercel/kv";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    console.log("Received Payload:", req.body);

    // store secret message in Vercel's KV db
    await kv.set("secret_message", req.body);
    return res.status(200).json({ msg: "Your secret is safe with me" });
  }

  // get route for retrieval once payload sent
  // I can check Vercel's KV db for speed, but this route is for you to check for storage
  if (req.method === "GET") {
    const payload = await kv.get("secret_message");
    if (!payload) {
      return res.status(400).json({ error: "No secret message stored." });
    }
    return res.status(200).json(payload);
  }

  return res.status(405).json({ error: "Only POST/GET methods are allowed" });
}
