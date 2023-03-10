module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ["plugin:prettier/recommended", "eslint:recommended"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {},
  "prettier/prettier": [
    "error",
    {
      endOfLine: "auto",
    },
  ],
}
