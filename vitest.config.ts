import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@components": "/src/components",
      "@domain": "/src/domain",
      "@islands": "/src/islands",
      "@layouts": "/src/layouts",
      "@programs": "/src/programs",
      "@schemas": "/src/schemas",
      "@services": "/src/services",
      "@styles": "/src/styles"
    }
  }
});
