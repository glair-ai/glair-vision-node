export class FaceBio {
  constructor(private readonly config: any) {}

  async match(captured: string, stored: string): Promise<any> {
    console.log({ captured, stored, config: this.config });
    return { result: "match ok" };
  }
}
