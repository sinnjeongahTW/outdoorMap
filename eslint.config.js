import globals from "globals";
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import prettierPluginRecommended from "eslint-plugin-prettier/recommended";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";
import reactRefresh from "eslint-plugin-react-refresh";
import importPlugin from 'eslint-plugin-import';
import unusedImportPlugin from 'eslint-plugin-unused-imports';
import promisePlugin from 'eslint-plugin-promise'

/** @see https://github.com/facebook/react/issues/28313 */
/** @see https://github.com/vitejs/vite/issues/13747#issuecomment-1636870022 */
/** @see https://typescript-eslint.io/packages/typescript-eslint/#flat-config-extends */

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  jsxA11y.flatConfigs.recommended,
  prettierPluginRecommended,
  {
    ignores: ["eslint.config.js", 'node_modules/', '**/node_modules/**', "**/node_modules/typescript/lib/**"], // ✅ 가장 먼저 `ignore` 설정을 배치
  },
  {
    languageOptions: {
      parserOptions: {
        ecmaFeatures: { jsx: true },
        tsconfigRootDir: import.meta.dirname,
       
        project: ["tsconfig.app.json"],
      },
      globals: { ...globals.browser },
    },
  },
  {
    
    files: ["**/*.{ts,tsx}"],
    extends: [tseslint.configs.disableTypeChecked],
  },
  {
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
      "react-refresh": reactRefresh,
      "import":importPlugin,
      "unused-imports": unusedImportPlugin,
      "promise":promisePlugin
    },
    settings: { react: { version: "detect" } },
    rules: {
      ...reactPlugin.configs["recommended"].rules,
      ...reactPlugin.configs["jsx-runtime"].rules,
      ...reactHooksPlugin.configs.recommended.rules,
      ...reactRefresh.configs.recommended.rules,

      "prettier/prettier": "warn",
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      "react/react-in-jsx-scope": "off",
      "prettier/prettier": "error",
      "unused-imports/no-unused-imports": "error",
      'react/jsx-uses-react': 'off',
      'react/button-has-type': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/require-default-props': 'off',
      'jsx-a11y/label-has-associated-control': 'off',
      'no-unused-vars': 'off',  // 미사용 변수 경고 제거 (TypeScript에서는 별도 규칙 사용)
      'no-param-reassign': ['error', { props: true, ignorePropertyModificationsFor: ['draft', 'e'] }],
      'no-underscore-dangle': 'off',
      'no-console': 'off',
      'no-alert': 'off',
      '@typescript-eslint/naming-convention': 'off',
      '@typescript-eslint/no-explicit-any': 'warn', // any 타입 사용 경고
      "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_", "varsIgnorePattern": "^_" }]
    },
  }
);