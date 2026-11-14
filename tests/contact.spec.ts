import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/contact')
})

test('an empty form explains what is missing', async ({ page }) => {
  await page.getByRole('button', { name: 'Send message' }).click()

  await expect(page.getByRole('alert')).toHaveText(
    'Name, email, and message are required.',
  )
})

test('a message shows a confirmation', async ({ page }) => {
  await page.getByLabel('Name').fill('Ada')
  await page.getByLabel('Email').fill('ada@example.com')
  await page.getByLabel('Message').fill('The counter test was easy to read.')
  await page.getByRole('button', { name: 'Send message' }).click()

  await expect(page.getByRole('status')).toHaveText(
    'Thanks, Ada. We got your message.',
  )
  await expect(page.getByLabel('Name')).toHaveCount(0)
})
