import { logInfo } from "../../util/logger";
import { visionFetch } from "../../util/visionFetch";
import { Config, Settings } from "../config";

type ActiveLivenessSessionsCreateParam = {
  success_url: string;
  cancel_url?: string;
  number_of_gestures?: number;
};

type ActiveLivenessSessionsRetrieveParam = {
  sid: string;
};

export class ActiveLivenessSessions {
  constructor(private readonly config: Config) {}

  async create(
    param: ActiveLivenessSessionsCreateParam,
    newConfig?: Partial<Settings>
  ) {
    logInfo("Active Liveness Sessions - Create", { param });
    const { success_url, cancel_url, number_of_gestures } = param;

    const req: RequestInit = {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ success_url, cancel_url, number_of_gestures }),
    };

    console.log(req);
    const config = this.config.getConfig(newConfig);
    return visionFetch(config, "face/:version/active-liveness-sessions", req);
  }

  async retrieve(
    param: ActiveLivenessSessionsRetrieveParam,
    newConfig?: Partial<Settings>
  ) {
    logInfo("Active Liveness Sessions - Retrieve", { param });
    const { sid } = param;

    const req = {
      method: "GET",
    };

    const config = this.config.getConfig(newConfig);
    return visionFetch(
      config,
      `face/:version/active-liveness-sessions/${sid}`,
      req
    );
  }
}
