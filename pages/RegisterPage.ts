import { Page } from '@playwright/test';

export class RegisterPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('https://practice.expandtesting.com/register');
  }

  async register(username: string, password: string, confirmPassword: string) {
    await this.page.getByLabel('Username').fill(username);
  await this.page.getByLabel('Password', { exact: true }).fill(password);
    await this.page.getByLabel('Confirm Password', { exact: true }).fill(confirmPassword);
    await this.page.getByRole('button', { name: 'Register' }).click();
  }

getFlashMessage() {
  return this.page.locator('#flash');
}
}