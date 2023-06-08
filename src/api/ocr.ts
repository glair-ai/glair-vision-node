import { fileFromSync } from "fetch-blob/from.js";
import { logInfo } from "../util/logger";
import { visionFetch } from "../util/visionFetch";
import { Config, Settings } from "./config";
import { KtpSessions } from "./sessions/ktpSessions";

type KtpParam = { image: string };

export class Ocr {
  readonly ktpSessions: KtpSessions;

  constructor(private readonly config: Config) {
    this.ktpSessions = new KtpSessions(config);
  }

  async ktp(param: KtpParam, newConfig?: Partial<Settings>) {
    logInfo("OCR - KTP");
    const { image } = param;

    const formData = new FormData();
    formData.set("image", fileFromSync(image));

    const req = {
      method: "POST",
      body: formData,
    };

    const config = this.config.getConfig(newConfig);
    return visionFetch(config, "ocr/:version/ktp", req);
  }
}
