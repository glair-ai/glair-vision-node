import { existsSync, readFileSync } from "fs";

import { Config, Settings } from "./config";

import { KtpSessions } from "./sessions/ktpSessions";
import { NPWPSessions } from "./sessions/npwpSessions";

import { logInfo } from "../util/logger";
import { isDefined, runSchemaValidation } from "../util/validator";
import { visionFetch } from "../util/visionFetch";

import { FileNotFoundError } from "../error/file-not-found";

import type { KTP } from "../types/ktp";
import type { NPWP } from "../types/npwp";
import type { GeneralDocument } from "../types/generalDocument";
import { Invoice } from "../types/invoice";
import { Receipt } from "../types/receipt";
import { SingaporeNRIC } from "../types/singaporeNRIC";
import { SingaporeFamilyPass } from "../types/singaporeFamilyPass";
import { SingaporeWorkPermit } from "../types/singaporeWorkPermit";

type OCRParam = { image: string; qualities_detector?: boolean };

export class Ocr {
  readonly ktpSessions: KtpSessions;
  readonly npwpSessions: NPWPSessions;

  constructor(private readonly config: Config) {
    this.ktpSessions = new KtpSessions(config);
    this.npwpSessions = new NPWPSessions(config);
  }

  async ktp(param: OCRParam, newConfig?: Partial<Settings>) {
    logInfo("OCR - KTP");
    return this.fetchOCR<KTP>(param, "ktp", newConfig);
  }

  async npwp(param: OCRParam, newConfig?: Partial<Settings>) {
    logInfo("OCR - NPWP");
    return this.fetchOCR<NPWP>(param, "npwp", newConfig);
  }

  async kk(param: OCRParam, newConfig?: Partial<Settings>) {
    logInfo("OCR - KK");
    return this.fetchOCR<any>(param, "kk", newConfig);
  }

  async stnk(param: OCRParam, newConfig?: Partial<Settings>) {
    logInfo("OCR - STNK");
    return this.fetchOCR<any>(param, "stnk", newConfig);
  }

  async bpkb(param: OCRParam, newConfig?: Partial<Settings>) {
    logInfo("OCR - BPKB");
    return this.fetchOCR<any>(param, "bpkb", newConfig);
  }

  async passport(param: OCRParam, newConfig?: Partial<Settings>) {
    logInfo("OCR - Passport");
    return this.fetchOCR<any>(param, "passport", newConfig);
  }

  async licensePlate(param: OCRParam, newConfig?: Partial<Settings>) {
    logInfo("OCR - License Plate");
    return this.fetchOCR<any>(param, "plate", newConfig);
  }

  async generalDocument(param: OCRParam, newConfig?: Partial<Settings>) {
    logInfo("OCR - General Document");
    return this.fetchOCR<GeneralDocument>(param, "general-document", newConfig);
  }

  async invoice(param: OCRParam, newConfig?: Partial<Settings>) {
    logInfo("OCR - Invoice");
    return this.fetchOCR<Invoice>(param, "invoice", newConfig);
  }

  async receipt(param: OCRParam, newConfig?: Partial<Settings>) {
    logInfo("OCR - Receipt");
    return this.fetchOCR<Receipt>(param, "receipt", newConfig);
  }

  async singaporeNRIC(param: OCRParam, newConfig?: Partial<Settings>) {
    logInfo("OCR - Singapore NRIC");
    return this.fetchOCR<SingaporeNRIC>(param, "singapore-nric", newConfig);
  }

  async singaporeFamilyPass(param: OCRParam, newConfig?: Partial<Settings>) {
    logInfo("OCR - Singapore Family Pass");
    return this.fetchOCR<SingaporeFamilyPass>(
      param,
      "singapore-family-pass",
      newConfig
    );
  }

  async singaporeWorkPermit(param: OCRParam, newConfig?: Partial<Settings>) {
    logInfo("OCR - Singapore Work Permit");
    return this.fetchOCR<SingaporeWorkPermit>(
      param,
      "singapore-work-permit",
      newConfig
    );
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

    const { image, qualities_detector } = param;

    if (!existsSync(image)) {
      throw new FileNotFoundError(image);
    }

    const formData = new FormData();
    formData.set(
      "image",
      new Blob([readFileSync(image)], { type: "image/jpeg" }),
      "filename.jpg"
    );

    const req = {
      method: "POST",
      body: formData,
    };

    const config = this.config.getConfig(newConfig);
    return visionFetch(
      config,
      qualities_detector
        ? `ocr/:version/${endpoint}/qualities`
        : `ocr/:version/${endpoint}`,
      req
    );
  }

  validateOCRParam(param: OCRParam) {
    const schema = {
      image: (val: any) => (isDefined(val) ? "" : "Image is required"),
    };

    return runSchemaValidation(param, schema);
  }
}
