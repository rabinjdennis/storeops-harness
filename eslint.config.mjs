import eslint from "@eslint/js";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

export default defineConfig(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,

  {
    ignores: ["dist/**", "coverage/**", "node_modules/**"],
  },

  {
    files: ["**/*.ts"],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },

  {
    files: ["jest.config.cjs"],
    languageOptions: {
      globals: {
        module: "readonly",
      },
    },
  },
);