# GLAIR Vision Next.js Example

This is an example of how to use [GLAIR Vision NodeJS SDK](https://github.com/glair-ai/glair-vision-node/) and [GLAIR Web Components](https://github.com/glair-ai/glair-web-components/) in a Next.js application.

## Getting Started

Install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Notes

If you are working on a TypeScript project, it is important to define a GLAIR Component. You can achieve this by using the `declare global` keyword in your project. A good example of this can be found in the [types.d.ts](src/components/types.d.ts) file located inside the `src/components` directory. This file is used to specify types for the various components in your project.
