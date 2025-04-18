/* eslint-env node */
module.exports = {
  root: true,
  env: {
    browser: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:import/typescript',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/strict',
    'plugin:react/jsx-runtime',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/stylistic',
    'plugin:prettier/recommended',
    'prettier',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  ignorePatterns: ['dist', '.eslintrc.cjs', 'src/charting_library'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'import',
    'jsx-a11y',
    'react-hooks',
    'react-refresh',
    'prettier',
  ],
  rules: {
    'no-var': 'error',
    'no-alert': 'error',
    'no-console': ["error", { allow: ["warn", "error"] }],
    'prefer-const': 'error',
    // "prefer-destructuring": "error",

    'import/no-duplicates': 'error',
    'import/no-self-import': 'error',
    'import/no-relative-packages': 'off',
    'import/no-relative-parent-imports': 'off',
    'import/consistent-type-specifier-style': ['error', 'prefer-inline'],
    'import/no-empty-named-blocks': 'error',
    'import/no-extraneous-dependencies': 'error',
    'import/no-import-module-exports': 'error',
    'import/newline-after-import': 'error',
    'import/group-exports': 'off',
    'import/exports-last': 'error',
    'import/no-useless-path-segments': ['error', { noUselessIndex: true }],

    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { ignoreRestSiblings: true }],
    '@typescript-eslint/consistent-type-definitions': 'off',
    '@typescript-eslint/no-empty-function': 'off',

    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'off',

    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',

    'prettier/prettier': [
      'warn',
      {
        endOfLine: 'lf',
        singleQuote: true,
      },
    ],

    'react-refresh/only-export-components': 'off',
  },
}
