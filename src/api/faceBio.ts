import { existsSync, readFileSync } from "fs";

import { logInfo } from "../util/logger";
import { visionFetch } from "../util/visionFetch";
import { Config, Settings } from "./config";
import { PassiveLivenessSessions } from "./sessions/passiveLivenessSessions";
import { ActiveLivenessSessions } from "./sessions/activeLivenessSessions";

import { FileNotFoundError } from "../error/file-not-found";

type MatchParam = { captured: string; stored: string };
type PassiveLivenessParam = { image: string };
type ActiveLivenessParam = { image: string; gestureCode: string };

export class FaceBio {
  readonly passiveLivenessSessions: PassiveLivenessSessions;
  readonly activeLivenessSessions: ActiveLivenessSessions;

  constructor(private readonly config: Config) {
    this.passiveLivenessSessions = new PassiveLivenessSessions(config);
    this.activeLivenessSessions = new ActiveLivenessSessions(config);
  }

  async match(param: MatchParam, newConfig?: Partial<Settings>) {
    logInfo("Face Biometric - Match", { param });
    const { captured, stored } = param;

    if (!existsSync(captured)) {
      throw new FileNotFoundError(captured);
    }

    if (!existsSync(stored)) {
      throw new FileNotFoundError(stored);
    }

    const formData = new FormData();
    formData.set("captured_image", new Blob([readFileSync(captured)]));
    formData.set("stored_image", new Blob([readFileSync(stored)]));

    const req = {
      method: "POST",
      body: formData,
    };

    const config = this.config.getConfig(newConfig);
    return visionFetch(config, "face/:version/match", req);
  }

  async passiveLiveness(
    param: PassiveLivenessParam,
    newConfig?: Partial<Settings>
  ) {
    logInfo("Face Biometric - Passive Liveness", { param });
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
    return visionFetch(config, "face/:version/passive-liveness", req);
  }

  async activeLiveness(
    param: ActiveLivenessParam,
    newConfig?: Partial<Settings>
  ) {
    logInfo("Face Biometric - Active Liveness", { param });
    const { image, gestureCode } = param;

    if (!existsSync(image)) {
      throw new FileNotFoundError(image);
    }

    const formData = new FormData();
    formData.set("image", new Blob([readFileSync(image)]));
    formData.set("gesture-code", gestureCode);

    const req = {
      method: "POST",
      body: formData,
    };

    const config = this.config.getConfig(newConfig);
    return visionFetch(config, "face/:version/active-liveness", req);
  }

  base64_encode(file: string) {
    const bitmap = readFileSync(file);
    return Buffer.from(bitmap).toString("base64");
  }
}
