// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { vision } from "@/util/vision";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let error = null;
  const session = await vision.ocr.npwpSessions
    .create({
      success_url: "http://localhost:3000/npwp-sessions?success=true",
      cancel_url: "http://localhost:3000/npwp-sessions?canceled=true",
    })
    .catch((err) => (error = err));

  if (error) {
    res.status(400).json(error);
    return;
  }

  res.redirect(303, session.url);
}
