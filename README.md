# QA Automation Suite

[![tests](https://github.com/vishnurdev/qa-automation-suite/actions/workflows/tests.yml/badge.svg)](https://github.com/vishnurdev/qa-automation-suite/actions/workflows/tests.yml)
![Playwright](https://img.shields.io/badge/Playwright-tested-45ba4b?logo=playwright)
![License](https://img.shields.io/badge/license-MIT-green)

**End-to-end UI and API test automation built with [Playwright](https://playwright.dev), using the Page Object Model, custom fixtures, HTML reports and CI.**

It tests two public practice targets:

- 🛒 **[SauceDemo](https://www.saucedemo.com)**: a demo online shop (login, products, cart, checkout)
- 🔌 **[JSONPlaceholder](https://jsonplaceholder.typicode.com)**: a fake REST API (GET, POST, PUT, PATCH, DELETE)

## What's covered (29 tests)

| Area | Tests |
|---|---|
| **Login** | valid login, locked-out user, wrong password, missing username/password, logout, protected-page redirect |
| **Products** | product count & prices, sort by price (both ways), sort by name |
| **Cart** | add/remove items and badge count, cart persists after reload |
| **Checkout** | full purchase end to end with **subtotal + tax = total** check, required-field validation |
| **API** | status codes, response schema, 404 handling, query filters, create/update/patch/delete, response time |
| **Mobile** | `@smoke` tests re-run on a Pixel 7 viewport |

## Highlights

- **Page Object Model**: selectors live in `pages/`, tests read like plain English
- **Custom fixtures**: a `loggedIn` fixture starts tests on the products page, with no repeated login code
- **Data-driven tests**: login validation cases generated from a table
- **Tags**: `@smoke` marks the critical-path tests
- **Debug-friendly**: screenshots, videos and traces saved automatically when a test fails
- **CI**: GitHub Actions runs everything on every push **and daily**, and uploads the HTML report

## Project structure

```
├── pages/                  # Page objects (LoginPage, InventoryPage, CartPage, CheckoutPage)
├── tests/
│   ├── ui/                 # login, inventory, checkout specs
│   └── api/                # REST API specs
├── utils/testData.js       # users, customer details, products
├── fixtures.js             # custom Playwright fixtures
├── playwright.config.js    # projects: chromium, mobile-chrome, api
└── .github/workflows/      # CI pipeline
```

## Run it locally

Requires **Node.js 18+**.

```bash
git clone https://github.com/vishnurdev/qa-automation-suite.git
cd qa-automation-suite
npm install
npx playwright install chromium

npm test              # run everything
npm run test:ui       # UI tests only
npm run test:api      # API tests only
npm run test:headed   # watch the browser while tests run
npm run report        # open the HTML report
```

Run only smoke tests:

```bash
npx playwright test --grep @smoke
```

## CI report

Every GitHub Actions run uploads a **playwright-report** artifact. Open the run under the **Actions** tab, download it, and open `index.html`.

## Need test automation for your product?

I build UI, API and regression test suites, and set up CI pipelines for them. Reach out via my [GitHub profile](https://github.com/vishnurdev).

## License

MIT
