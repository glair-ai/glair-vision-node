import { FaceBio } from "./faceBio";
import { Ocr } from "./ocr";

export class Vision {
  readonly config: any;
  readonly ocr: Ocr;
  readonly faceBio: FaceBio;

  constructor(settings?: any) {
    this.config = settings || {};
    this.ocr = new Ocr(this.config);
    this.faceBio = new FaceBio(this.config);
  }
}
