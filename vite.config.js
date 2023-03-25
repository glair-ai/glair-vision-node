import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: ["src/index.ts"],
      formats: ["es", "cjs"],
    },
    outDir: "lib",
    emptyOutDir: false,
    rollupOptions: {
      // RollupError: "promises" is not exported by "__vite-browser-external", imported by "node_modules/fetch-blob/from.js".
      // import { statSync, createReadStream, promises as fs } from 'node:fs'
      // RollupError: "basename" is not exported by "__vite-browser-external", imported by "node_modules/fetch-blob/from.js".
      // import { basename } from 'node:path'

      // This also means that the resulting lib can't run in the browser (this lib is meant for server-side only). If we try, it will throw error:
      // Module build failed: UnhandledSchemeError: Reading from "node:fs" is not handled by plugins (Unhandled scheme).
      // Webpack supports "data:" and "file:" URIs by default.
      // You may need an additional plugin to handle "node:" URIs.
      external: ["node:fs", "node:path", "fs"],
    },
    minify: false,
  },
});
