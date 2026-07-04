import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteSingleFile } from "vite-plugin-singlefile";
import path from "node:path";

export default defineConfig({
  plugins: [react(), viteSingleFile()],
  resolve: {
    alias: {
      "@domain": path.resolve(__dirname, "src/domain"),
      "@content": path.resolve(__dirname, "src/content"),
      "@adapters": path.resolve(__dirname, "src/adapters"),
      "@app": path.resolve(__dirname, "src/app"),
    },
  },
  build: {
    target: "es2022",
    cssCodeSplit: false,
    assetsInlineLimit: 100000000,
    chunkSizeWarningLimit: 100000000,
  },
});
