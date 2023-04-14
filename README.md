<p align="center">
  <a href="https://docs.glair.ai" target="_blank">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://glair-chart.s3.ap-southeast-1.amazonaws.com/images/glair-horizontal-logo-blue.png">
      <source media="(prefers-color-scheme: light)" srcset="https://glair-chart.s3.ap-southeast-1.amazonaws.com/images/glair-horizontal-logo-color.png">
      <img alt="GLAIR" src="https://glair-chart.s3.ap-southeast-1.amazonaws.com/images/glair-horizontal-logo-color.png" width="180" height="60" style="max-width: 100%;">
    </picture>
  </a>
</p>

<p align="center">
  GLAIR Vision Node.js SDK
<p>

<p align="center">
    <a href="https://github.com/glair-ai/glair-web-components/releases"><img src="https://img.shields.io/npm/v/@glair/vision" alt="Latest Release"></a>
    <a href="https://github.com/glair-ai/glair-web-components/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/@glair/vision" alt="License"></a>
</p>

## Requirement

You need <span style="color: green">**Node version 18 or higher**</span>. If your current Node version is lower than 18, you can download the latest version from the official [Node website](https://nodejs.org/en/download).

To avoid errors when creating the `FormData` that needs to be sent to the API, it is necessary to make sure that the version of your Node environment is at least 18.

## Installation

Install

```
npm install @glair/vision
```

## Usage

The package needs to be configured with your credentials, see [here](https://docs.glair.ai/authentication) for more details.

```ts
import { Vision } from "@glair/vision";

const vision = new Vision({
  apiKey: "api-key",
  username: "username",
  password: "password",
});
```

Afterwards, you can use the provided functions to access GLAIR Vision API:

1. [OCR](#ocr)
2. [Face Biometric](#face-biometric)
3. [Session](#session)

## Configuration

The SDK can be initialized with several options:

```ts
import { Settings } from "@glair/vision/lib/api/config";

const visionConfig: Settings = {
  baseUrl: "https://api.vision.glair.ai",
  apiVersion: "v1",
  apiKey: "default-api-key",
  username: "default-username",
  password: "default-password",
};
```

| Option       | Default                       | Description                         |
| ------------ | ----------------------------- | ----------------------------------- |
| `baseUrl`    | `https://api.vision.glair.ai` | Base URL for the API                |
| `apiVersion` | `v1`                          | GLAIR Vision API version to be used |
| `apiKey`     | `default-api-key`             | Your API Key                        |
| `username`   | `default-username`            | Your username                       |
| `password`   | `default-password`            | Your password                       |

## Override Configuration

You can override the configuration values for one-time only:

```ts
const resp = await vision.ocr
  .ktp(
    { image: "/path/to/image.jpg" },
    { apiKey: "xxx", username: "yyy", password: "passwd" }
  )
  .catch((err) => console.error(err));
console.log(resp);
```

The second parameter is `Partial<Settings>` (same as `Settings` but all optional). It will be merged with the original `Settings` you set when instantiating the Vision instance.

## Usage with TypeScript

GLAIR Vision Node.js SDK is packaged with TypeScript declarations. You don't need to install another package.

## Usage with Frameworks

### NextJS

Instantiate a Vision instance in a file and export it.

```ts
// util/vision.ts
import { Vision } from "@glair/vision";

export const vision = new Vision({
  apiKey: "api-key",
  username: "username",
  password: "password",
});
```

Then you can use the `vision` object in server-side NextJS.

```ts
// api/ktp.ts
import { vision } from "../util/vision";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const resp = await vision.ocr.ktp({
    image: "/path/to/image.jpg",
  });
  res.status(200).json(resp);
}
```

---

## OCR

### KTP

```ts
const resp = await vision.ocr
  .ktp({ image: "/path/to/image.jpg" })
  .catch((err) => console.error(err));
console.log(resp);
```

### NPWP

_in development_.

### KK

_in development_.

### STNK

_in development_.

### BPKB

_in development_.

### Passport

_in development_.

### License Plate

_in development_.

## Face Biometric

### Face Matching

```ts
const resp = await vision.faceBio
  .match({
    captured: "/path/to/captured.jpg",
    stored: "/path/to/stored.jpg",
  })
  .catch((err) => console.error(err));
console.log(resp);
```

### Passive Liveness

```ts
const resp = await vision.faceBio
  .passiveLiveness({
    image: "/path/to/image.jpg",
  })
  .catch((err) => console.error(err));
console.log(resp);
```

### Active Liveness

```ts
const resp = await vision.faceBio
  .activeLiveness({
    image: "/path/to/image.jpg",
    gestureCode: "gesture-code",
  })
  .catch((err) => console.error(err));
console.log(resp);
```

## Session

### Passive Liveness Sessions

Create session

```ts
const resp = await vision.faceBio.passiveLivenessSessions
  .create({
    success_url: "https://docs.glair.ai?success=true",
    cancel_url: "https://docs.glair.ai?success=false",
  })
  .catch((err) => console.error(err));
console.log(resp);
```

Retrieve Session

```ts
const resp = await vision.faceBio.passiveLivenessSessions
  .retrieve({ sid: "session-id" })
  .catch((err) => console.error(err));
console.log(resp);
```

### Active Liveness Sessions

_in development_.
