import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: {
        ...globals.node, // Adds Node.js globals like process, Buffer
      },
    },
  },
  {
    // Specific environment for browser-related files
    files: ["**/*.browser.js"], // Assuming you have some browser-specific files
    languageOptions: {
      globals: globals.browser,
    },
    settings: {
      react: {
        version: "detect", // Automatically detect the React version
      },
    },
  },
  {
    // Jest environment for test files
    files: ["**/*.test.js"],
    languageOptions: {
      globals: {
        ...globals.jest, // Adds Jest globals like describe, test, jest, expect
      },
    },
    settings: {
      react: {
        version: "detect", // Automatically detect the React version
      },
    },
  },
  pluginJs.configs.recommended, // This applies ESLint's recommended rules
];
