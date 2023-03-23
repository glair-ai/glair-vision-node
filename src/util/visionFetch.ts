import { Config } from "../api/config";

export const visionFetch = async (
  config: Config,
  path: string,
  overrides?: RequestInit
) => {
  const url = config.getUrl(path);

  const fetchConfig = {
    ...overrides,
    headers: {
      ...overrides?.headers,
      Authorization: config.getBasicAuth(),
      "x-api-key": config.apiKey,
    },
    method: overrides?.method || "GET",
  };

  return await fetch(url, fetchConfig);
};
