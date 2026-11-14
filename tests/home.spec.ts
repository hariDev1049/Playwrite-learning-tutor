import { expect, test } from '@playwright/test'

test('home page explains the lab', async ({ page }) => {
  await page.goto('/')

  await expect(
    page.getByRole('heading', { name: 'Playwright Lab' }),
  ).toBeVisible()
  await expect(page).toHaveTitle('Playwright Lab')
})

test('main nav opens the tasks page', async ({ page }) => {
  await page.goto('/')

  await page
    .getByRole('navigation', { name: 'Main' })
    .getByRole('link', { name: 'Tasks' })
    .click()

  await expect(page).toHaveURL('/tasks')
  await expect(page.getByRole('heading', { name: 'Tasks' })).toBeVisible()
})

test('loading a tip shows the dev server response', async ({ page }) => {
  await page.goto('/')

  await page.getByRole('button', { name: 'Load a tip' }).click()

  await expect(page.getByRole('status')).toHaveText(
    'Locators re-query the page on every action.',
  )
})

test('a test can replace the tip response', async ({ page }) => {
  // page.route runs before the app's fetch. The button still works;
  // only the JSON behind it changes.
  await page.route('**/api/tip', (route) =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        text: 'This tip came from the test, not the server.',
      }),
    }),
  )

  await page.goto('/')
  await page.getByRole('button', { name: 'Load a tip' }).click()

  await expect(page.getByRole('status')).toHaveText(
    'This tip came from the test, not the server.',
  )
})
