import { expect, test } from '@playwright/test';

test('index page has expected h1', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByRole('heading', { name: 'Svelte 5 UI Component Demo' })).toBeVisible();
});

test('button components are rendered', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByRole('button', { name: 'Primary Button' })).toBeVisible();
	await expect(page.getByRole('button', { name: 'Secondary Button' })).toBeVisible();
	await expect(page.getByRole('button', { name: 'Danger Button' })).toBeVisible();
});

test('counter functionality works', async ({ page }) => {
	await page.goto('/');
	
	const incrementButton = page.getByRole('button', { name: '+' });
	const decrementButton = page.getByRole('button', { name: '-' });
	const resetButton = page.getByRole('button', { name: 'Reset' });
	
	// Test increment
	await incrementButton.click();
	await expect(page.locator('.count')).toHaveText('1');
	
	// Test decrement
	await decrementButton.click();
	await expect(page.locator('.count')).toHaveText('0');
	
	// Test multiple increments
	await incrementButton.click();
	await incrementButton.click();
	await incrementButton.click();
	await expect(page.locator('.count')).toHaveText('3');
	
	// Test reset
	await resetButton.click();
	await expect(page.locator('.count')).toHaveText('0');
}); 