import { Config, Settings } from "./config";
import { FaceBio } from "./faceBio";
import { Ocr } from "./ocr";

export class Vision {
  readonly config: Config;
  readonly ocr: Ocr;
  readonly faceBio: FaceBio;

  constructor(settings?: Settings) {
    this.config = new Config(settings);
    this.ocr = new Ocr(this.config);
    this.faceBio = new FaceBio(this.config);
  }
}
