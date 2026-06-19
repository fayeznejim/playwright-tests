import { test, expect } from '@playwright/test';
import { RegisterPage } from '../pages/RegisterPage';

let registerPage: RegisterPage;

test.beforeEach(async ({ page }) => {
  registerPage = new RegisterPage(page);
  await registerPage.goto();
});

test('Register with valid credentials', async ({ page }) => {
      const uniqueUsername = `testuser${Date.now()}`;
  await registerPage.register(uniqueUsername, 'Test1234!', 'Test1234!');
  await expect(registerPage.getFlashMessage())
    .toContainText('Successfully registered, you can log in now.');
});

test('Register with empty fields', async ({ page }) => {
  await registerPage.register('', '', '');
  await expect(registerPage.getFlashMessage())
    .toContainText('All fields are required.');
});

test('Register with short username', async ({ page }) => {
  await registerPage.register('ff', 'Test1234!', 'Test1234!');
  await expect(registerPage.getFlashMessage())
    .toContainText('Username must be at least 3 characters long.');
});

test('Register with short password', async ({ page }) => {
  await registerPage.register('testuser123', 'abc', 'abc');
  await expect(registerPage.getFlashMessage())
    .toContainText('Password must be at least 4 characters long.');
});

test('Register with non matching passwords', async ({ page }) => {
  await registerPage.register('testuser123', 'Test1234!', 'Different1!');
  await expect(registerPage.getFlashMessage())
    .toContainText('Passwords do not match.');
});