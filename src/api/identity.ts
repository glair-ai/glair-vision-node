import { fileFromSync } from "fetch-blob/from.js";
import { logInfo } from "../util/logger";
import { visionFetch } from "../util/visionFetch";
import { Config, Settings } from "./config";

type VerificationParam = { nik: string; name: string; date_of_birth: string };
type FaceVerificationParam = {
  nik: string;
  name: string;
  date_of_birth: string;
  face_image: string;
};

export class Identity {
  constructor(private readonly config: Config) {}

  async verification(param: VerificationParam, newConfig?: Partial<Settings>) {
    logInfo("Identity - Basic Verification");
    const { nik, name, date_of_birth } = param;

    const formData = new FormData();
    formData.set("nik", nik);
    formData.set("name", name);
    formData.set("date_of_birth", date_of_birth);

    const req = {
      method: "POST",
      body: formData,
    };

    const config = this.config.getConfig(newConfig);
    return visionFetch(config, "identity/:version/verification", req);
  }

  async faceVerification(
    param: FaceVerificationParam,
    newConfig?: Partial<Settings>
  ) {
    logInfo("Identity - Face Verification");
    const { nik, name, date_of_birth, face_image } = param;

    const formData = new FormData();
    formData.set("nik", nik);
    formData.set("name", name);
    formData.set("date_of_birth", date_of_birth);
    formData.set("face_image", fileFromSync(face_image));

    const req = {
      method: "POST",
      body: formData,
    };

    const config = this.config.getConfig(newConfig);
    return visionFetch(config, "identity/:version/face-verification", req);
  }
}
