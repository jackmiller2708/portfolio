import js from "@eslint/js";
import globals from "globals";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginAstro from "eslint-plugin-astro";
import jsxA11y from "eslint-plugin-jsx-a11y";
import tseslint from "typescript-eslint";

const readabilityRules = {
  // These thresholds are intentionally conservative. They reduce extraneous
  // cognitive load by keeping branching, nesting, and function contracts easy
  // to scan during maintenance and review.
  complexity: ["warn", { max: 8 }],
  "max-depth": ["warn", 3],
  "max-lines-per-function": [
    "warn",
    {
      max: 80,
      skipBlankLines: true,
      skipComments: true,
      IIFEs: true
    }
  ],
  "max-nested-callbacks": ["warn", 3],
  "max-params": ["warn", 4],
  "no-nested-ternary": "error",
  "no-unneeded-ternary": "warn",
  "no-else-return": ["warn", { allowElseIf: false }],
  "no-var": "error",
  "object-shorthand": ["warn", "always"],
  "prefer-const": [
    "warn",
    {
      destructuring: "all",
      ignoreReadBeforeAssign: true
    }
  ],
  eqeqeq: ["error", "smart"],
  curly: ["error", "all"]
};

export default [
  {
    ignores: [
      "dist/**",
      ".astro/**",
      "node_modules/**",
      "coverage/**",
      "playwright-report/**",
      "test-results/**"
    ]
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  jsxA11y.flatConfigs.recommended,
  {
    files: ["**/*.{js,mjs,cjs,ts,astro}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    rules: readabilityRules
  },
  {
    files: ["**/*.astro"],
    rules: {
      ...readabilityRules,
      "astro/no-conflict-set-directives": "error",
      "astro/no-deprecated-astro-canonicalurl": "error",
      "astro/no-deprecated-astro-fetchcontent": "error",
      "astro/no-deprecated-astro-resolve": "error",
      "astro/no-unused-define-vars-in-style": "warn",
      "jsx-a11y/anchor-is-valid": "off",
      "jsx-a11y/click-events-have-key-events": "warn",
      "jsx-a11y/no-static-element-interactions": "warn"
    }
  },
  {
    files: ["**/*.test.ts"],
    rules: {
      "max-lines-per-function": "off"
    }
  },
  {
    files: ["src/env.d.ts"],
    rules: {
      "@typescript-eslint/triple-slash-reference": "off"
    }
  },
  eslintConfigPrettier
];
