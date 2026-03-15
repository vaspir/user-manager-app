const { test, expect } = require('@playwright/test')

test('add user', async ({ page }) => {
  await page.goto('http://localhost:5173')
  await page.click('text=Add User')
})