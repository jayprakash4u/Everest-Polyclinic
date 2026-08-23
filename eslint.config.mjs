import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = defineConfig([
  ...nextVitals,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    /* This is a JS codebase, so nothing else catches an identifier that is
       referenced but never imported. The Next preset leaves no-undef off,
       assuming TypeScript covers it — here nothing does, and two such bugs
       (a dropped `specialists` prop, three missing lucide icons) reached
       runtime as a result. */
    rules: {
      "no-undef": "error",
    },
  },
]);

export default eslintConfig;
