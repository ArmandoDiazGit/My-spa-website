import { defineConfig } from "cypress";

export default defineConfig({
  allowCypressEnv: false,
  e2e: {
    baseUrl: "http://localhost:5173",
    specPattern: "cypress/e2e/**/*.cy.js",
    supportFile: "cypress/support/e2e.js",
    viewportWidth: 1280,
    viewportHeight: 800,
    video: false,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 8000,
    requestTimeout: 10000,
    responseTimeout: 10000,
    retries: {
      runMode: 1,
      openMode: 0,
    },
  },
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
    specPattern: "cypress/component/**/*.cy.jsx",
    supportFile: "cypress/support/component.js",
    indexHtmlFile: "cypress/support/component-index.html",
    viewportWidth: 1100,
    viewportHeight: 900,
    video: false,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 8000,
    retries: {
      runMode: 1,
      openMode: 0,
    },
  },
});
