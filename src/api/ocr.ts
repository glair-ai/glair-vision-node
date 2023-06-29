import { existsSync, readFileSync } from "fs";

import { logInfo } from "../util/logger";
import { visionFetch } from "../util/visionFetch";
import { Config, Settings } from "./config";
import { FileNotFoundError } from "../error/file-not-found";

type KtpParam = { image: string };

export class Ocr {
  constructor(private readonly config: Config) {}

  async ktp(param: KtpParam, newConfig?: Partial<Settings>) {
    logInfo("OCR - KTP");
    const { image } = param;

    if (!existsSync(image)) {
      throw new FileNotFoundError(image);
    }

    const formData = new FormData();
    formData.set("image", new Blob([readFileSync(image)]));

    const req = {
      method: "POST",
      body: formData,
    };

    const config = this.config.getConfig(newConfig);
    return visionFetch(config, "ocr/:version/ktp", req);
  }
}
