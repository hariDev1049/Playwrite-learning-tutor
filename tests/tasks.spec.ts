import { expect, test } from '@playwright/test'

test('adding and completing a task updates the list', async ({ page }) => {
  await page.goto('/tasks')

  const add = page.getByRole('button', { name: 'Add task' })
  await expect(page.getByText('No tasks yet.')).toBeVisible()
  await expect(add).toBeDisabled()

  await page.getByLabel('New task').fill('Buy milk')
  await expect(add).toBeEnabled()
  await add.click()

  await expect(page.getByRole('listitem').filter({ hasText: 'Buy milk' })).toBeVisible()
  await expect(page.getByText('1 left')).toBeVisible()
  await expect(page.getByLabel('New task')).toHaveValue('')

  await page.getByLabel('New task').fill('Walk the dog')
  await add.click()
  await expect(page.getByText('2 left')).toBeVisible()

  await page.getByRole('checkbox', { name: 'Buy milk' }).check()
  await expect(page.getByRole('checkbox', { name: 'Buy milk' })).toBeChecked()
  await expect(page.getByText('1 left')).toBeVisible()
})
