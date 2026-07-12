import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["src/**/*.test.ts"]
  },
  resolve: {
    alias: {
      "@components": "/src/components",
      "@domain": "/src/domain",
      "@i18n": "/src/i18n",
      "@islands": "/src/islands",
      "@layouts": "/src/layouts",
      "@programs": "/src/programs",
      "@schemas": "/src/schemas",
      "@services": "/src/services",
      "@styles": "/src/styles",
      "@utils": "/src/utils"
    }
  }
});
