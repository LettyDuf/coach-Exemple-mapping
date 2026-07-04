import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  test: {
    globals: true,
    projects: [
      {
        // Domaine pur — environnement Node, AUCUNE dépendance navigateur.
        extends: true,
        test: {
          name: "domain",
          environment: "node",
          include: ["tests/domain/**/*.test.ts", "src/domain/**/*.test.ts"],
        },
      },
      {
        // Intégrité du corpus pédagogique — Node, pas besoin de DOM.
        extends: true,
        test: {
          name: "corpus",
          environment: "node",
          include: ["tests/corpus/**/*.test.ts"],
        },
      },
      {
        // UI React — environnement jsdom.
        extends: true,
        test: {
          name: "ui",
          environment: "jsdom",
          include: ["tests/ui/**/*.test.{ts,tsx}", "src/adapters/ui/**/*.test.{ts,tsx}"],
          setupFiles: ["./tests/ui/setup.ts"],
        },
      },
    ],
  },
  resolve: {
    alias: {
      "@domain": path.resolve(__dirname, "src/domain"),
      "@content": path.resolve(__dirname, "src/content"),
      "@adapters": path.resolve(__dirname, "src/adapters"),
      "@app": path.resolve(__dirname, "src/app"),
    },
  },
});
