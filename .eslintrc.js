module.exports = {
  extends: ["airbnb", "prettier", "prettier/react"],
  plugins: ["prettier"],
  env: {
    browser: true,
    jest: true,
  },
  rules: {
    "prettier/prettier": 2,
  },
  globals: {
    // For puppeteer tests
    page: true,
  },
};
