import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

let loginPage: LoginPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  await loginPage.goto();
});

test('Login with valid credentials', async ({ page }) => {
  await loginPage.login('practice', 'SuperSecretPassword!');
  await expect(page).toHaveURL(/secure/);
  await expect(loginPage.getFlashMessage()).toContainText('You logged into a secure area!');
});

test('Login with invalid username', async ({ page }) => {
  await loginPage.login('xkqz9921mmnop', 'anything');
  await expect(loginPage.getFlashMessage()).toContainText('Your username is invalid!');
});

test('Login with invalid password', async ({ page }) => {
  await loginPage.login('practice', 'wrongpassword');
  await expect(loginPage.getFlashMessage()).toContainText('Your password is invalid!');
});