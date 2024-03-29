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

You need <span style="color: green">**Node version 18 or higher**</span>. For local development, we recommend to use [Node Version Manager (NVM)](https://github.com/nvm-sh/nvm).

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
4. [Identity](#identity)

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

const vision = new Vision({
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

## FAQ

1. I got `ReferenceError: FormData is not defined` error. What should I do?
   - Make sure you use Node version 18 or higher.

---

## OCR

### KTP

```ts
const resp = await vision.ocr
  .ktp({ image: "/path/to/image.jpg", qualities_detector: true }) // qualities_detector is false by default
  .catch((err) => console.error(err));
console.log(resp);
```

### NPWP

```ts
const resp = await vision.ocr
  .npwp({ image: "/path/to/image.jpg" })
  .catch((err) => console.error(err));
console.log(resp);
```

### KK

```ts
const resp = await vision
  .kk({ image: "/path/to/image.jpg" })
  .catch((err) => console.error(err));
console.log(resp);
```

### STNK

```ts
const resp = await vision.ocr
  .stnk({ image: "/path/to/image.jpg" })
  .catch((err) => console.error(err));
console.log(resp);
```

### BPKB

```ts
const resp = await vision.ocr
  .bpkb({ image: "/path/to/image.jpg" })
  .catch((err) => console.error(err));
console.log(resp);
```

### Passport

```ts
const resp = await vision.ocr
  .passport({ image: "/path/to/image.jpg" })
  .catch((err) => console.error(err));
console.log(resp);
```

### License Plate

```ts
const resp = await vision.ocr
  .licensePlate({ image: "/path/to/image.jpg" })
  .catch((err) => console.error(err));
console.log(resp);
```

### General Document

```ts
const resp = await vision.ocr
  .generalDocument({ image: "/path/to/image.jpg" })
  .catch((err) => console.error(err));
console.log(resp);
```

### Invoice

```ts
const resp = await vision.ocr
  .invoice({ image: "/path/to/image.jpg" })
  .catch((err) => console.error(err));
console.log(resp);
```

### Receipt

```ts
const resp = await vision.ocr
  .receipt({ image: "/path/to/image.jpg" })
  .catch((err) => console.error(err));
console.log(resp);
```

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

Create session

```ts
const resp = await vision.faceBio.activeLivenessSessions
  .create({
    success_url: "https://docs.glair.ai?success=true",
    cancel_url: "https://docs.glair.ai?success=false",
    number_of_gesture: 3,
  })
  .catch((err) => console.error(err));
console.log(resp);
```

Retrieve Session

```ts
const resp = await vision.faceBio.activeLivenessSessions
  .retrieve({ sid: "session-id" })
  .catch((err) => console.error(err));
console.log(resp);
```

### KTP Sessions

Create session

```ts
const resp = await vision.ocr.ktpSessions
  .create({
    success_url: "https://docs.glair.ai?success=true",
    cancel_url: "https://docs.glair.ai?success=false",
  })
  .catch((err) => console.error(err));
console.log(resp);
```

Retrieve Session

```ts
const resp = await vision.ocr.ktpSessions
  .retrieve({ sid: "session-id" })
  .catch((err) => console.error(err));
console.log(resp);
```

### NPWP Sessions

Create session

```ts
const resp = await vision.ocr.npwpSessions
  .create({
    success_url: "https://docs.glair.ai?success=true",
    cancel_url: "https://docs.glair.ai?success=false",
  })
  .catch((err) => console.error(err));
console.log(resp);
```

Retrieve Session

```ts
const resp = await vision.ocr.npwpSessions
  .retrieve({ sid: "session-id" })
  .catch((err) => console.error(err));
console.log(resp);
```

## Identity

### Basic Verification

```ts
const resp = await vision.identity
  .verification({
    nik: "1234567890123456",
    name: "John Doe",
    date_of_birth: "01-01-2000",
  })
  .catch((err) => console.error(err));
console.log(resp);
```

### Face Verification

```ts
const resp = await vision.identity
  .faceVerification({
    nik: "1234567890123456",
    name: "John Doe",
    date_of_birth: "01-01-2000",
    face_image: "/path/to/image.jpg",
  })
  .catch((err) => console.error(err));
console.log(resp);
```
