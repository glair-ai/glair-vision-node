// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { vision } from "@/util/vision";
import formidable from "formidable";
import type { NextApiRequest, NextApiResponse } from "next";

type RequestBody = { fields: formidable.Fields; files: formidable.Files };

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const form = formidable({ multiples: true });
  const parse = (): Promise<RequestBody> => {
    return new Promise((resolve, reject) => {
      form.parse(
        req,
        async (
          err: typeof formidable.errors.FormidableError,
          fields: formidable.Fields,
          files: formidable.Files
        ) => {
          if (err) {
            reject("request body parse error");
          }
          resolve({ fields, files });
        }
      );
    });
  };

  const { files, fields } = await parse();
  const filePath = (files.image as formidable.File[])[0].filepath;
  const qualitiesDetector =
    fields.qualities_detector && fields.qualities_detector[0] === "true";

  let error = null;
  const resp = await vision.ocr
    .ktp({ image: filePath, qualities_detector: qualitiesDetector as boolean })
    .catch((err) => (error = err));
  if (error) {
    res.status(400).json(error);
    return;
  }
  res.status(200).json(resp);
}
