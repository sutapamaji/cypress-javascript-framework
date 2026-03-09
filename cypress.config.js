const { defineConfig } = require('cypress');
const fs = require('fs');
const path = require('path');
const cypressSplit = require('cypress-split');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://thinking-tester-contact-list.herokuapp.com',
    defaultCommandTimeout: 8000,
    pageLoadTimeout: 30000,
    viewportWidth: 1280,
    viewportHeight: 800,
    screenshotsFolder: 'reports/screenshots',
    videosFolder: 'reports/videos',
    reporter: 'mochawesome',
    allowCypressEnv: false,
    reporterOptions: {
      reportDir: 'reports',
      reportFilename: '[name]-report',
      reportTitle: 'Cypress Test Report',
      reportPageTitle: 'Cypress Test Report',
      embeddedScreenshots: true,
      inlineAssets: true,
      overwrite: false,
      html: false,
      json: true,
    },
    retries: {
      runMode: 1,
      openMode: 0,
    },
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: 'cypress/support/e2e.js',
    env: {
      viewports: [
        { name: 'desktop', width: 1280, height: 800 },
        { name: 'mobile', width: 375, height: 667 },
      ],
    },
    setupNodeEvents(on, config) {
      const envName = process.env.CYPRESS_ENV || 'stage';
      const envConfigPath = path.resolve(__dirname, `environments/${envName}.json`);

      if (fs.existsSync(envConfigPath)) {
        try {
          const envConfig = JSON.parse(fs.readFileSync(envConfigPath, 'utf-8'));
          console.log(`\n[Config] Loaded environment: ${envName} from ${envConfigPath}`);

          if (envConfig.webBaseUrl) {
            config.baseUrl = envConfig.webBaseUrl;
            console.log(`[Config] Overriding baseUrl: ${config.baseUrl}`);
          }

          Object.assign(config.env, envConfig);
          if (envConfig.env) {
            Object.assign(config.env, envConfig.env);
          }
        } catch (error) {
          console.error(`\n[Config Error] Failed to parse environment file: ${envConfigPath}`);
          console.error(error.message);
        }
      } else {
        console.warn(`\n[Config Warning] Environment file not found: ${envConfigPath}`);
      }

      cypressSplit(on, config);
      return config;
    },
  },
});
