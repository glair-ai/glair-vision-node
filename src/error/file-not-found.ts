import { BaseError } from "./base";

export class FileNotFoundError extends BaseError<string> {
  constructor(filepath: string, { cause }: { cause?: unknown } = {}) {
    super({
      name: "FileNotFound",
      message: `Cannot find file ${filepath}`,
      cause,
    });
  }
}
