import { Config, Settings } from "./config";
import { FaceBio } from "./faceBio";
import { Identity } from "./identity";
import { Ocr } from "./ocr";

export class Vision {
  readonly config: Config;
  readonly ocr: Ocr;
  readonly faceBio: FaceBio;
  readonly identity: Identity;

  constructor(settings?: Settings) {
    this.config = new Config(settings);
    this.ocr = new Ocr(this.config);
    this.faceBio = new FaceBio(this.config);
    this.identity = new Identity(this.config);
  }
}
