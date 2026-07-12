import { defineConfig, fontProviders } from "astro/config";

export default defineConfig({
  devToolbar: {
    enabled: false
  },
  i18n: {
    locales: ["en", "vi"],
    defaultLocale: "en",
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: true,
      fallbackType: "rewrite"
    }
  },
  fonts: [
    {
      name: "Fraunces",
      subsets: ["latin", "vietnamese"],
      provider: fontProviders.google(),
      cssVariable: "--font-display",
      weights: [100, 200, 300, 4000, 500, 600, 700, 800, 900],
      variationSettings: '"SOFT" 0, "WONK" 0',
      styles: ["normal", "italic"]
    },
    {
      name: "Epilogue",
      subsets: ["latin", "vietnamese"],
      provider: fontProviders.google(),
      cssVariable: "--font-body",
      weights: [100, 200, 300, 4000, 500, 600, 700, 800, 900],
      styles: ["normal"]
    },
    {
      name: "JetBrains Mono",
      fallbacks: ["monospace"],
      subsets: ["latin", "vietnamese"],
      provider: fontProviders.google(),
      cssVariable: "--font-code",
      weights: [100, 200, 300, 4000, 500, 600, 700, 800, 900],
      styles: ["normal"]
    }
  ],
  output: "static"
});
