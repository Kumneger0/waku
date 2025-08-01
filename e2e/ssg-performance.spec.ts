import { expect } from '@playwright/test';

import { test, prepareStandaloneSetup } from './utils.js';

const startApp = prepareStandaloneSetup('ssg-performance');

test.skip(
  ({ browserName }) => browserName !== 'chromium',
  'Browsers are not relevant for this test. One is enough.',
);
test.skip(
  ({ mode }) => mode !== 'PRD',
  'This test is only relevant in production mode.',
);

test.describe(`high volume static site generation`, () => {
  test('build and verify', async ({ page }) => {
    test.setTimeout(60000);
    const { port, stopApp } = await startApp('PRD');
    await page.goto(`http://localhost:${port}/path-3`);
    await expect(page.getByRole('heading')).toHaveText('/path-3');
    await stopApp();
  });
});
