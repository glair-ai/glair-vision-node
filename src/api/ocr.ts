import { fileFromSync } from "fetch-blob/from.js";
import { logInfo } from "../util/logger";
import { visionFetch } from "../util/visionFetch";
import { Config, Settings } from "./config";

type KtpParam = { image: string; wa?: string };

export class Ocr {
  constructor(private readonly config: Config) {}

  async ktp(param: KtpParam, newConfig?: Settings) {
    logInfo("KTP", { param });
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
