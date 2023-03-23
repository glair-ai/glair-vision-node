import { fileFromSync } from "fetch-blob/from.js";
import { visionFetch } from "../util/visionFetch";
import { Config, Settings } from "./config";

type KtpParam = { img: string; wa?: string };

export class Ocr {
  constructor(private readonly config: Config) {}

  async ktp(param: KtpParam, newConfig?: Settings): Promise<any> {
    const { img } = param;

    const formData = new FormData();
    formData.append("image", fileFromSync(img));

    const req = {
      method: "POST",
      body: formData,
    };

    const config = this.config.getConfig(newConfig);
    return visionFetch(config, "ocr/:version/ktp", req);
  }
}
