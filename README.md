# Playwright Automation Test Suite

![CI](https://github.com/fayeznejim/playwright-tests/actions/workflows/playwright.yml/badge.svg)

Automated test suite built with Playwright + TypeScript, covering UI and API testing with a CI pipeline via GitHub Actions.

## Tech Stack

- **Language:** TypeScript
- **Testing tool:** Playwright
- **CI/CD:** GitHub Actions
- **Test site:** [practice.expandtesting.com](https://practice.expandtesting.com)

## Test Coverage

| File | Feature | Tests |
|---|---|---|
| `example.spec.ts` | Login | Valid login, invalid username, invalid password |
| `register.spec.ts` | Register | Valid, empty fields, short username, short password, mismatched passwords |
| `secure.spec.ts` | Secure Area | Redirect without login, access after login |
| `api.spec.ts` | API | Health check, register, login, profile auth, notes CRUD |

**Total: 11 automated tests**

## Project Structure

```
playwright-tests/
  tests/
  pages/
  .github/workflows/
  playwright.config.ts
```

## Run Locally

```bash
npm install
npx playwright install chromium
npx playwright test --project=chromium
npx playwright show-report
```