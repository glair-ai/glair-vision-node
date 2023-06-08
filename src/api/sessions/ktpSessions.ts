import { logInfo } from "../../util/logger";
import { visionFetch } from "../../util/visionFetch";
import { Config, Settings } from "../config";

type KtpSessionsCreateParam = {
  success_url: string;
  cancel_url?: string;
};

type KtpSessionsRetrieveParam = {
  sid: string;
};

export class KtpSessions {
  constructor(private readonly config: Config) {}

  async create(param: KtpSessionsCreateParam, newConfig?: Partial<Settings>) {
    logInfo("KTP Sessions - Create", { param });
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
    return visionFetch(config, "ocr/:version/ktp-sessions", req);
  }

  async retrieve(
    param: KtpSessionsRetrieveParam,
    newConfig?: Partial<Settings>
  ) {
    logInfo("KTP Sessions - Retrieve", { param });
    const { sid } = param;

    const req = {
      method: "GET",
    };

    const config = this.config.getConfig(newConfig);
    return visionFetch(config, `ocr/:version/ktp-sessions/${sid}`, req);
  }
}
