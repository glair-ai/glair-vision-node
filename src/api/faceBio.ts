import fs from "fs";
import { fileFromSync } from "fetch-blob/from.js";
import { logInfo } from "../util/logger";
import { visionFetch } from "../util/visionFetch";
import { Config, Settings } from "./config";
import { PassiveLivenesSessions } from "./sessions/passiveLivenessSessions";

type MatchParam = { captured: string; stored: string };
type PassiveLivenessParam = { image: string };
type ActiveLivenessParam = { image: string; gestureCode: string };

export class FaceBio {
  readonly passiveLivenessSessions: PassiveLivenesSessions;

  constructor(private readonly config: Config) {
    this.passiveLivenessSessions = new PassiveLivenesSessions(config);
  }

  async match(param: MatchParam, newConfig?: Settings): Promise<any> {
    logInfo("Face Match", { param });
    const { captured, stored } = param;

    const data = {
      captured_image: this.base64_encode(captured),
      stored_image: this.base64_encode(stored),
    };

    const req = {
      method: "POST",
      body: JSON.stringify(data),
    };

    const config = this.config.getConfig(newConfig);
    return visionFetch(config, "face/:version/match", req);
  }

  async passiveLiveness(param: PassiveLivenessParam, newConfig?: Settings) {
    logInfo("Passive Liveness", { param });
    const { image } = param;

    const formData = new FormData();
    formData.set("image", fileFromSync(image));

    const req = {
      method: "POST",
      body: formData,
    };

    const config = this.config.getConfig(newConfig);
    return visionFetch(config, "face/:version/passive-liveness", req);
  }

  async activeLiveness(param: ActiveLivenessParam, newConfig?: Settings) {
    logInfo("Active Liveness", { param });
    const { image, gestureCode } = param;

    const formData = new FormData();
    formData.set("image", fileFromSync(image));
    formData.set("gesture-code", gestureCode);

    const req = {
      method: "POST",
      body: formData,
    };

    const config = this.config.getConfig(newConfig);
    return visionFetch(config, "face/:version/active-liveness", req);
  }

  base64_encode(file: string) {
    const bitmap = fs.readFileSync(file);
    return Buffer.from(bitmap).toString("base64");
  }
}
