import { Config } from "../api/config";
import { logDebug } from "./logger";

export const visionFetch = async (
  config: Config,
  path: string,
  overrides?: RequestInit
) => {
  const url = config.getUrl(path);
  logDebug("URL", { url });

  const fetchConfig = {
    ...overrides,
    headers: {
      ...overrides?.headers,
      Authorization: config.getBasicAuth(),
      "x-api-key": config.apiKey,
      "User-Agent": "node:__packageVersion/GLAIR-Vision-SDK",
    },
    method: overrides?.method || "GET",
  };

  const resp = await fetch(url, fetchConfig);
  const respObj = await resp.json();
  if (resp.ok) {
    return respObj;
  }

  throw respObj;
};
