module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    '@coc-boilerplate/eslint-config-coc',
    'plugin:vue/vue3-recommended',
    '@vue/prettier',
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2021,
  },
  rules: {
    'prettier/prettier': ['warn', { singleQuote: true }],
    quotes: [2, 'single', { avoidEscape: true }],
  },
};
