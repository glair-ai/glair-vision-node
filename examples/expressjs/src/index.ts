import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";
import { Vision } from "@glair/vision";
import formidable from "formidable";

import * as url from "url";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

const vision = new Vision({
  baseUrl: process.env.VISION_URL ?? "",
  apiKey: process.env.X_API_KEY ?? "",
  username: process.env.USERNAME ?? "",
  password: process.env.PASSWORD ?? "",
});

dotenv.config({ path: ".env.local" });

const app: Express = express();
const port = process.env.PORT ?? 8000;

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.urlencoded({ extended: false }));

app.post("/pl", async (req: Request, res: Response) => {
  const form = formidable({ multiples: true });
  const parse = (): Promise<any> => {
    return new Promise((resolve, reject) => {
      form.parse(req, async (err: any, fields: any, files: any) => {
        if (err) {
          reject("request body parse error");
        }
        resolve({ fields, files });
      });
    });
  };

  const { files } = await parse();

  const filePath = (files.image as any)[0].filepath;

  let error = null;
  const response = await vision.faceBio
    .passiveLiveness({ image: filePath })
    .catch((err) => (error = err));

  if (error) {
    res.status(400).json(error);
    return;
  }
  res.status(200).json(response);
});

app.post("/pl-sessions", async (req: Request, res: Response) => {
  let error = null;

  const session = await vision.faceBio.passiveLivenessSessions
    .create({
      success_url:
        "http://localhost:3000/passive-liveness-sessions?success=true",
      cancel_url:
        "http://localhost:3000/passive-liveness-sessions?canceled=true",
    })
    .catch((err) => (error = err));

  if (error) {
    res.status(400).json(error);
    return;
  }

  res.redirect(303, session.url);
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
