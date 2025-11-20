import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import pluginReact from 'eslint-plugin-react'
import { defineConfig } from 'eslint/config'
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended'

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: { globals: globals.browser },
  },
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  eslintPluginPrettier,
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      'no-duplicate-imports': 'warn',
      'no-use-before-define': 'warn',
      'no-useless-assignment': 'warn',
      'require-atomic-updates': 'warn',
      'block-scoped-var': 'warn',
      'no-empty-function': 'warn',
      'no-unused-vars': 'warn',
      'no-undef': 'warn',
      'react/react-in-jsx-scope': 'off',
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          semi: false,
        },
      ],
    },
  },
])
