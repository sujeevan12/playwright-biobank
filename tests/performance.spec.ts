import { test, expect } from '@playwright/test';

test.describe('Biobank site basic test', () => {
  test('homepage loads and has title', async ({ page }) => {
    await page.goto('https://www.ag-grid.com/example/');
    await expect(page).toHaveTitle('Demo - Performance Grid');
  });
});
