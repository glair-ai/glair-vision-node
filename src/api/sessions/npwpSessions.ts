import { Config, Settings } from "../config";
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 28dbfc3 (feat: add ocr npwp api)

import {
  SessionCreateParam,
  SessionRetrieveParam,
  validateSessionCreateParam,
  validateSessionRetrieveParam,
} from "../../types/session";

<<<<<<< HEAD
import { logInfo } from "../../util/logger";
import { visionFetch } from "../../util/visionFetch";

=======
import { logInfo } from "../../util/logger";
import { visionFetch } from "../../util/visionFetch";

import { isDefined, isString, isValidURL } from "../../util/validator";

type NPWPSessionsCreateParam = {
  success_url: string;
  cancel_url?: string;
};

type NPWPSessionsRetrieveParam = {
  sid: string;
};

>>>>>>> 0aef7fa (feat: add npwp session code)
=======
import { logInfo } from "../../util/logger";
import { visionFetch } from "../../util/visionFetch";

>>>>>>> 28dbfc3 (feat: add ocr npwp api)
export class NPWPSessions {
  private static readonly BASE_URL = "ocr/:version/npwp-sessions";

  constructor(private readonly config: Config) {}

<<<<<<< HEAD
<<<<<<< HEAD
  async create(param: SessionCreateParam, newConfig?: Partial<Settings>) {
    logInfo("NPWP Sessions - Create", { param });

    const validationResult = validateSessionCreateParam(param);
    if (validationResult.length) {
      throw new Error(validationResult[0].message);
=======
  async create(param: NPWPSessionsCreateParam, newConfig?: Partial<Settings>) {
=======
  async create(param: SessionCreateParam, newConfig?: Partial<Settings>) {
>>>>>>> 28dbfc3 (feat: add ocr npwp api)
    logInfo("NPWP Sessions - Create", { param });

    const validationResult = validateSessionCreateParam(param);
    if (validationResult.length) {
<<<<<<< HEAD
      throw new Error(validationResult[0]);
>>>>>>> 0aef7fa (feat: add npwp session code)
=======
      throw new Error(validationResult[0].message);
>>>>>>> 28dbfc3 (feat: add ocr npwp api)
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

<<<<<<< HEAD
<<<<<<< HEAD
  async retrieve(param: SessionRetrieveParam, newConfig?: Partial<Settings>) {
    logInfo("NPWP Sessions - Retrieve", { param });

    const validationResult = validateSessionRetrieveParam(param);
    if (validationResult.length) {
      throw new Error(validationResult[0].message);
=======
  async retrieve(
    param: NPWPSessionsRetrieveParam,
    newConfig?: Partial<Settings>
  ) {
=======
  async retrieve(param: SessionRetrieveParam, newConfig?: Partial<Settings>) {
>>>>>>> 28dbfc3 (feat: add ocr npwp api)
    logInfo("NPWP Sessions - Retrieve", { param });

    const validationResult = validateSessionRetrieveParam(param);
    if (validationResult.length) {
<<<<<<< HEAD
      throw new Error(validationResult[0]);
>>>>>>> 0aef7fa (feat: add npwp session code)
=======
      throw new Error(validationResult[0].message);
>>>>>>> 28dbfc3 (feat: add ocr npwp api)
    }

    const { sid } = param;

    const req = {
      method: "GET",
    };

    const config = this.config.getConfig(newConfig);
    return visionFetch(config, `${NPWPSessions.BASE_URL}/${sid}`, req);
  }
<<<<<<< HEAD
<<<<<<< HEAD
=======

  private validateCreateParam(param: NPWPSessionsCreateParam): string[] {
    const createParamValidation = {
      success_url: (val: any) => {
        if (!isDefined(val)) {
          return "Success URL is required";
        }

        if (!isValidURL(val)) {
          return "Success URL must be a valid URL";
        }

        return "";
      },
      cancel_url: (val: any) => {
        if (!isDefined(val) || isValidURL(val)) {
          return "";
        }

        return "Cancel URL must be a valid URL";
      },
    };

    const result = [];

    for (const [key, validator] of Object.entries(createParamValidation)) {
      const val = param[key as keyof NPWPSessionsCreateParam];

      result.push(validator(val));
    }

    return result.filter(Boolean);
  }

  private validateRetrieveParam(param: NPWPSessionsRetrieveParam): string[] {
    const retrieveParamValidation = {
      sid: (val: any) => {
        if (!isDefined(val)) {
          return "Session ID is required";
        }

        if (!isString(val)) {
          return "Sessions ID must be a string";
        }

        return "";
      },
    };

    const result = [];

    for (const [key, validator] of Object.entries(retrieveParamValidation)) {
      const val = param[key as keyof NPWPSessionsRetrieveParam];

      result.push(validator(val));
    }

    return result.filter(Boolean);
  }
>>>>>>> 0aef7fa (feat: add npwp session code)
=======
>>>>>>> 28dbfc3 (feat: add ocr npwp api)
}
