import { Vision } from "@glair/vision";

export const vision = () => {
  return new Vision({
    baseUrl: process.env.VISION_URL,
    apiKey: process.env.X_API_KEY ?? "",
    username: process.env.USERNAME ?? "",
    password: process.env.PASSWORD ?? "",
  });
};
