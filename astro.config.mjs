import { defineConfig, fontProviders } from "astro/config";

export default defineConfig({
  devToolbar: {
    enabled: false
  },
  fonts: [
    {
      name: "Fraunces",
      provider: fontProviders.google(),
      cssVariable: "--font-display",
      weights: [100, 200, 300, 4000, 500, 600, 700, 800, 900],
      variationSettings: '"SOFT" 0, "WONK" 0',
      styles: ["normal"]
    },
    {
      name: "Epilogue",
      provider: fontProviders.google(),
      cssVariable: "--font-body",
      weights: [100, 200, 300, 4000, 500, 600, 700, 800, 900],
      styles: ["normal"]
    },
    {
      name: "IBM Plex Mono",
      provider: fontProviders.google(),
      cssVariable: "--font-code",
      weights: [100, 200, 300, 4000, 500, 600, 700, 800, 900],
      styles: ["normal", "italic"]
    }
  ],
  output: "static"
});
