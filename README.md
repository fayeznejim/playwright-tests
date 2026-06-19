# Playwright Test Suite

Automated E2E test suite built with Playwright + TypeScript.

## What's tested

| Feature | Tests |
|---|---|
| Login | Valid credentials, invalid username, invalid password |
| Register | Valid registration, empty fields, short username, short password, passwords not matching |
| Secure Area | Redirect when not logged in, access after login |

## Tech stack

- Playwright
- TypeScript
- GitHub Actions (CI)

## Run locally

npm install
npx playwright test --project=chromium