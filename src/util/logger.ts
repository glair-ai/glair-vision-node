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

export function logInfo(message: string, ...args: unknown[]): void {
  logger.info(message, args);
}

export function logWarn(message: string, ...args: unknown[]): void {
  logger.warn(message, args);
}

export function logError(message: string, ...args: unknown[]): void {
  logger.error(message, args);
}

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

  info(...args: unknown[]): void {
    this._log(LogLevel.INFO, ...args);
  }

  warn(...args: unknown[]): void {
    this._log(LogLevel.WARN, ...args);
  }

  error(...args: unknown[]): void {
    this._log(LogLevel.ERROR, ...args);
  }

  private _log(logLevel: LogLevel, ...args: unknown[]) {
    if (logLevel < this._logLevel) return;

    const now = new Date().toISOString();
    const method = logLevelMapping[logLevel as keyof typeof logLevelMapping];

    console[method as "log" | "info" | "warn" | "error"](
      `[${now}] GLAIR Vision SDK:`,
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
