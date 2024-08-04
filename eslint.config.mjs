import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    languageOptions: {
      globals: globals.browser,
      ecmaVersion: 2021 // ou a versão que você estiver utilizando
    },
    rules: {
      "no-console": ["error", { allow: ["warn", "error"] }],
    },
  },
  pluginJs.configs.recommended,
];