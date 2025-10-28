import { test, expect } from '@playwright/test';

const url = 'https://www.ag-grid.com/example/';
test.describe('AG Grid Performance tab test', () => {
	test.beforeEach(async ({ page }) => {
    await page.goto(url);
    await expect(page).toHaveTitle('Demo - Performance Grid');
  });

	test('should sort by Language column ascending and descending', async ({ page }) => {
    const languageHeader = page.getByRole('columnheader', { name: 'Language', exact: true })
    const firstLanguageCell = page.locator('.ag-center-cols-container .ag-cell[col-id="language"]').first();

		await languageHeader.click();
    await expect(firstLanguageCell).toHaveText('English');

		await languageHeader.click();
    await expect(firstLanguageCell).toHaveText('Swedish');
  });

	test('should filter rows by Country for Germany', async ({ page }) => {
		const filterInput = page.locator('input[placeholder*="Filter"]');
    await filterInput.fill('Germany');

    await page.waitForSelector('.ag-center-cols-container .ag-row');
    const visibleRows = page.locator('.ag-center-cols-container .ag-row');
    const rowCount = await visibleRows.count();
    expect(rowCount).toBeGreaterThan(0);

    const countries = await visibleRows.locator('[col-id="country"]').allInnerTexts();
    for (const country of countries) {
      expect(country).toContain('Germany');
    }
  });

	test('should hide and show the Name column', async ({ page }) => {
		const nameToggle = page.locator('[aria-label="Name Column"]');
    await nameToggle.click();

		let headerTexts = await page.locator('.ag-header-cell-text').allInnerTexts();
    expect(headerTexts).not.toContain('Name');

		await nameToggle.click();

		headerTexts = await page.locator('.ag-header-cell-text').allInnerTexts();
    expect(headerTexts).toContain('Name');
  });
});
