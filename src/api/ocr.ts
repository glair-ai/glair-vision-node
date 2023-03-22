export class Ocr {
  constructor(private readonly config: any) {}

  async ktp(img: string): Promise<any> {
    console.log({ img, config: this.config });
    return { result: "ktp ok" };
  }
}
