import { logInfo } from "../../util/logger";
import { visionFetch } from "../../util/visionFetch";
import { Config, Settings } from "../config";

type PassiveLivenesSessionsCreateParam = {
  success_url: string;
  cancel_url?: string;
};

type PassiveLivenesSessionsRetrieveParam = {
  sid: string;
};

export class PassiveLivenesSessions {
  constructor(private readonly config: Config) {}

  async create(
    param: PassiveLivenesSessionsCreateParam,
    newConfig?: Settings & { asu: string }
  ) {
    logInfo("Passive Liveness Sessions Create", { param });
    const { success_url, cancel_url } = param;

    const req: RequestInit = {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ success_url, cancel_url }),
    };

    console.log(req);
    const config = this.config.getConfig(newConfig);
    return visionFetch(config, "face/:version/passive-liveness-sessions", req);
    // return visionFetch(config, "api/passive-liveness-sessions", req);
  }

  async retrieve(
    param: PassiveLivenesSessionsRetrieveParam,
    newConfig?: Settings
  ) {
    logInfo("Passive Liveness Sessions Retrieve", { param });
    const { sid } = param;

    const req = {
      method: "GET",
    };

    const config = this.config.getConfig(newConfig);
    return visionFetch(
      config,
      `face/:version/passive-liveness-sessions/${sid}`,
      req
    );
  }
}
