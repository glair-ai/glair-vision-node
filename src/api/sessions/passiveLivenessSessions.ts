import { logInfo } from "../../util/logger";
import { visionFetch } from "../../util/visionFetch";
import { Config, Settings } from "../config";

type PassiveLivenessSessionsCreateParam = {
  success_url: string;
  cancel_url?: string;
};

type PassiveLivenessSessionsRetrieveParam = {
  sid: string;
};

export class PassiveLivenessSessions {
  constructor(private readonly config: Config) {}

  async create(
    param: PassiveLivenessSessionsCreateParam,
    newConfig?: Partial<Settings>
  ) {
    logInfo("Passive Liveness Sessions - Create", { param });
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
  }

  async retrieve(
    param: PassiveLivenessSessionsRetrieveParam,
    newConfig?: Partial<Settings>
  ) {
    logInfo("Passive Liveness Sessions - Retrieve", { param });
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
