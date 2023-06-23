import { existsSync, readFileSync } from "fs";

import { logInfo } from "../util/logger";
import { visionFetch } from "../util/visionFetch";
import { Config, Settings } from "./config";
import { FileNotFoundError } from "../error/file-not-found";
import { KtpSessions } from "./sessions/ktpSessions";

type OCRParam = { image: string };

export class Ocr {
  readonly ktpSessions: KtpSessions;

  constructor(private readonly config: Config) {
    this.ktpSessions = new KtpSessions(config);
  }

  async ktp(param: OCRParam, newConfig?: Partial<Settings>): Promise<KTP> {
    logInfo("OCR - KTP");

    return this.fetchOCR<KTP>(param, "ktp", newConfig);
  }

  async npwp(param: OCRParam, newConfig?: Partial<Settings>): Promise<NPWP> {
    logInfo("OCR - NPWP");

    return this.fetchOCR<NPWP>(param, "npwp", newConfig);
  }

  private fetchOCR<T>(
    param: OCRParam,
    endpoint: string,
    newConfig?: Partial<Settings>
  ): Promise<T> {
    const validationResult = this.validateOCRParam(param);
    if (validationResult.length) {
      throw new Error(validationResult[0].message);
    }

    const { image } = param;

    const formData = new FormData();
    formData.set("image", fileFromSync(image));

    const req = {
      method: "POST",
      body: formData,
    };

    const config = this.config.getConfig(newConfig);
    return visionFetch(config, `ocr/:version/${endpoint}`, req);
  }

  validateOCRParam(param: OCRParam) {
    const schema = {
      image: (val: any) => (isDefined(val) ? "" : "Image is required"),
    };

    return runSchemaValidation(param, schema);
  }

  async ktp(param: OCRParam, newConfig?: Partial<Settings>) {
    logInfo("OCR - KTP");
    const { image } = param;

    if (!existsSync(image)) {
      throw new FileNotFoundError(image);
    }

    const formData = new FormData();
    formData.set("image", new Blob([readFileSync(image)]));

    const req = {
      method: "POST",
      body: formData,
    };

    const config = this.config.getConfig(newConfig);
    return visionFetch(config, "ocr/:version/ktp", req);
  }

  async npwp(param: OCRParam, newConfig?: Partial<Settings>) {
    logInfo("OCR - KTP");
    const { image } = param;

    const formData = new FormData();
    formData.set("image", fileFromSync(image));

    const req = {
      method: "POST",
      body: formData,
    };

    const config = this.config.getConfig(newConfig);
    return visionFetch(config, "ocr/:version/npwp", req);
  }
}
function fileFromSync(image: string): string | Blob {
  throw new Error("Function not implemented.");
}

function isDefined(val: any) {
  throw new Error("Function not implemented.");
}

function runSchemaValidation(
  param: OCRParam,
  schema: { image: (val: any) => "" | "Image is required" }
) {
  throw new Error("Function not implemented.");
}
