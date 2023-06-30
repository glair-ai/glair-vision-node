export class BaseError<T extends string> extends Error {
  constructor({
    name,
    message,
    cause,
  }: {
    name: T;
    message: string;
    cause?: unknown;
  }) {
    super(message);

    this.name = name;
    this.message = message;
    this.cause = cause;
  }
}
