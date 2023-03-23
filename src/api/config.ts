export interface Settings {
  baseUrl?: string;
  apiVersion?: string;
  apiKey: string;
  username: string;
  password: string;
}

const DEFAULT_BASE_URL = "https://api.vision.glair.ai";
const DEFAULT_API_VERSION = "v1";
const DEFAULT_API_KEY = "default-api-key";
const DEFAULT_USERNAME = "default-username";
const DEFAULT_PASSWORD = "default-password";

export class Config {
  readonly baseUrl: string;
  readonly apiVersion: string;
  readonly apiKey: string;
  readonly username: string;
  readonly password: string;
  readonly basicAuth?: string;

  constructor(config?: Settings) {
    this.baseUrl = config?.baseUrl || DEFAULT_BASE_URL;
    this.apiVersion = config?.apiVersion || DEFAULT_API_VERSION;
    this.apiKey = config?.apiKey || DEFAULT_API_KEY;
    this.username = config?.username || DEFAULT_USERNAME;
    this.password = config?.password || DEFAULT_PASSWORD;
  }

  getUrl(path: string) {
    return `${this.baseUrl}/${this.replaceVersion(path)}`;
  }

  getBasicAuth() {
    if (!this.basicAuth) {
      return `Basic ${btoa(this.username + ":" + this.password)}`;
    }
    return this.basicAuth;
  }

  getConfig(newConfig?: Settings) {
    return newConfig ? new Config(newConfig) : this;
  }

  private replaceVersion(path: string) {
    return path.replaceAll(":version", this.apiVersion);
  }
}
