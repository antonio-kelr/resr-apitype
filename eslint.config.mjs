import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";

export default {
  languageOptions: { globals: globals.browser },
  plugins: ['@typescript-eslint'],
  extends: [
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended
  ],
  rules: {
    '@typescript-eslint/ban-types': 'off',  // Desativa  essa regra aquiiiiii*****
  },
};
