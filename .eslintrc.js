module.exports = {
  extends: [
    "eslint:recommended",
  ],
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parserOptions: {
    "ecmaVersion": 2021,
  },
  rules: {
    "prefer-const": "error",
    "arrow-parens": "error",
    "comma-dangle": ["error", "always-multiline"],
    "semi": "error",
    "eqeqeq": "error",
    "no-console": process.env.NODE_ENV === 'production' ? "error" : "off",
    "no-unused-vars": [
      "error",
      { vars: "all", args: "after-used", ignoreRestSiblings: false },
    ],
  },
};
