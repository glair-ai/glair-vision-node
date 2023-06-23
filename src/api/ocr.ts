import { fileFromSync } from "fetch-blob/from.js";

import { Config, Settings } from "./config";

import { logInfo } from "../util/logger";
import { isDefined, runSchemaValidation } from "../util/validator";
import { visionFetch } from "../util/visionFetch";

import type { KTP } from "../types/ktp";
import type { NPWP } from "../types/npwp";

type OCRParam = { image: string };

export class Ocr {
  constructor(private readonly config: Config) {}

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
