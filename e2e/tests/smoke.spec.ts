import { test, expect } from '@playwright/test';

test('smoke: list/create/edit/delete customer', async ({ page }) => {
  await page.goto('/');
  // wait for customers list lazy chunk to load
  await page.waitForSelector('table.kunden-table', { timeout: 10000 });

  // count existing rows
  const rowsBefore = await page.locator('table.kunden-table tbody tr').count();

  // open add dialog
  await page.click('button:has-text("Neu")');
  await page.fill('input[formcontrolname="vorname"]', 'E2E');
  await page.fill('input[formcontrolname="nachname"]', 'Tester');
  await page.fill('input[formcontrolname="email"]', 'e2e@example.com');
  await page.click('button:has-text("Speichern")');

  // wait for row added
  await page.waitForTimeout(1000);
  const rowsAfterCreate = await page.locator('table.kunden-table tbody tr').count();
  expect(rowsAfterCreate).toBeGreaterThan(rowsBefore);

  // find the created row and click edit
  const createdRow = page.locator('table.kunden-table tbody tr').first();
  await createdRow.locator('button[mat-icon-button]').first().click();
  await page.fill('input[formcontrolname="vorname"]', 'E2EUpdated');
  await page.click('button:has-text("Speichern")');
  await page.waitForTimeout(1000);

  // delete the created row
  const delBtn = page.locator('button[mat-icon-button]').nth(1);
  await delBtn.click();
  // confirm deletion
  await page.click('button:has-text("Löschen")');
  await page.waitForTimeout(1000);
  const rowsAfterDelete = await page.locator('table.kunden-table tbody tr').count();
  expect(rowsAfterDelete).toBeLessThanOrEqual(rowsBefore);
});
