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
  },
});
