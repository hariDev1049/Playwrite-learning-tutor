import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/counter')
})

test('increment and reset update the count', async ({ page }) => {
  const decrement = page.getByRole('button', { name: 'Decrement' })

  await expect(page.getByText('Count is 0')).toBeVisible()
  await expect(decrement).toBeDisabled()

  await page.getByRole('button', { name: 'Increment' }).click()
  await page.getByRole('button', { name: 'Increment' }).click()

  await expect(page.getByText('Count is 2')).toBeVisible()
  await expect(decrement).toBeEnabled()

  await decrement.click()
  await expect(page.getByText('Count is 1')).toBeVisible()

  await page.getByRole('button', { name: 'Reset' }).click()
  await expect(page.getByText('Count is 0')).toBeVisible()
  await expect(decrement).toBeDisabled()
})

test('a later test still starts at zero', async ({ page }) => {
  // This file's other test clicks Increment. It cannot leak here:
  // Playwright opens a new browser context for every test.
  await expect(page.getByText('Count is 0')).toBeVisible()
})
