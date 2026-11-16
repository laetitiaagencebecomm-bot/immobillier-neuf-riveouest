import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir:'./tests', testMatch:'**/*.spec.js', fullyParallel:false, workers:1, reporter:'list', timeout:30000,
  use:{ baseURL:'http://127.0.0.1:4174', headless:true, launchOptions:process.env.CHROMIUM_PATH ? {executablePath:process.env.CHROMIUM_PATH} : {}, screenshot:'only-on-failure' },
  webServer:{ command:'npm run preview', url:'http://127.0.0.1:4174', reuseExistingServer:!process.env.CI },
});
