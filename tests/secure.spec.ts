import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

let loginPage: LoginPage;

test('Redirect to login when accessing secure page without login', async ({ page }) => {
  await page.goto('https://practice.expandtesting.com/secure');

  await expect(page).toHaveURL(/login/);
  await expect(page.locator('#flash'))
    .toContainText('You must login to view the secure area!');
});

test('Access secure page after login', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login('practice', 'SuperSecretPassword!');

  await expect(page).toHaveURL(/secure/);
  await expect(page.locator('#flash'))
    .toContainText('You logged into a secure area!');
});