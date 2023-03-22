export enum LogLevel {
  DEBUG,
  INFO,
  WARN,
  ERROR,
  SILENT,
}

const logLevelMapping = {
  [LogLevel.DEBUG]: "log",
  [LogLevel.INFO]: "info",
  [LogLevel.WARN]: "warn",
  [LogLevel.ERROR]: "error",
};

export const setLogLevel = (logLevel: LogLevel) => {
  logger.logLevel = logLevel;
};

export const logDebug = (message: string, ...args: unknown[]) => {
  logger.debug(message, args);
};

class Logger {
  private _logLevel = LogLevel.INFO; // default to INFO

  get logLevel(): LogLevel {
    return this._logLevel;
  }

  set logLevel(logLevel: LogLevel) {
    this._logLevel = logLevel;
  }

  debug(...args: unknown[]) {
    this._log(LogLevel.DEBUG, ...args);
  }

  private _log(logLevel: LogLevel, ...args: unknown[]) {
    if (logLevel < this._logLevel) return;

    const now = new Date().toISOString();
    const method = logLevelMapping[logLevel as keyof typeof logLevelMapping];

    console[method as "log" | "info" | "warn" | "error"](
      `[${now}] Vision SDK:`,
      ...args.map(this._stringify)
    );
  }

  private _stringify(obj: unknown): string | unknown {
    if (typeof obj === "string") {
      return obj;
    } else {
      try {
        return JSON.stringify(obj);
      } catch (e) {
        // Failed to convert to JSON, log the object directly.
        return obj;
      }
    }
  }
}

const logger: Logger = new Logger();
