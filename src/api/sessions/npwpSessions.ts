import { Config, Settings } from "../config";

import {
  SessionCreateParam,
  SessionRetrieveParam,
  validateSessionCreateParam,
  validateSessionRetrieveParam,
} from "../../types/session";

import { logInfo } from "../../util/logger";
import { visionFetch } from "../../util/visionFetch";

export class NPWPSessions {
  private static readonly BASE_URL = "ocr/:version/npwp-sessions";

  constructor(private readonly config: Config) {}

  async create(param: SessionCreateParam, newConfig?: Partial<Settings>) {
    logInfo("NPWP Sessions - Create", { param });

    const validationResult = validateSessionCreateParam(param);
    if (validationResult.length) {
      throw new Error(validationResult[0].message);
    }

    const { success_url, cancel_url } = param;

    const req: RequestInit = {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ success_url, cancel_url }),
    };

    const config = this.config.getConfig(newConfig);
    return visionFetch(config, NPWPSessions.BASE_URL, req);
  }

  async retrieve(param: SessionRetrieveParam, newConfig?: Partial<Settings>) {
    logInfo("NPWP Sessions - Retrieve", { param });

    const validationResult = validateSessionRetrieveParam(param);
    if (validationResult.length) {
      throw new Error(validationResult[0].message);
    }

    const { sid } = param;

    const req = {
      method: "GET",
    };

    const config = this.config.getConfig(newConfig);
    return visionFetch(config, `${NPWPSessions.BASE_URL}/${sid}`, req);
  }
}
