# 🧪 Playwright TodoMVC Test Automation Project

This project is a **data-driven automation framework** built using [Playwright](https://playwright.dev/) with **TypeScript**, following the **Page Object Model (POM)** and Playwright’s built-in **test runner**. It is enhanced to support test execution in multiple browsers, tagging, reporting, and advanced debug capabilities.

---

## 📖 Overview

This project structure is inspired by enterprise-level test architecture. It separates test logic from test data and supports reusable workflows, tags, and environment-driven behavior.

While this demo focuses on the [TodoMVC Angular App](https://todomvc.com/examples/angular/dist/browser/#/all), it is adaptable to UI, API (REST/SOAP), and DB test automation.

---

## ✨ Features

- ✅ UI Automation using Playwright & TypeScript
- ✅ Cross-browser support: Chromium, Firefox, WebKit
- ✅ Mobile device emulation (iPhone, Pixel)
- ✅ Tag-based test filtering (`@positive`, `@negative`, `@regression`, `@smoke`)
- ✅ Playwright HTML Reports, screenshots & video on failure
- ✅ Extensible for API testing, Excel-driven data, PDF handling, and CI/CD integration
- ✅ Test run integration with Qase (CaseIO)

---

## 📁 Project Structure

```
📂 tests/                → All test cases (positive, negative, mobile, debug-tagged)
📂 page-objects/         → Page object models
📂 utils/                → Reusable helper functions (e.g., navigation)
📂 test-data/            → External JSON or Excel-style data (JSON used here)
playwright.config.ts     → Browser/device/project configuration
.env                     → Environment-based settings
```

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/Bogdan-QA/todo-app.git
cd todo-app
```

### 2. Install dependencies

```bash
npm init playwright@latest
```

---

## 🧪 Running Tests

### 🔹 Run all tests in default projects

```bash
npx playwright test
```

### 🔹 Run tests by browser

```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### 🔹 Run mobile emulation tests

```bash
npx playwright test --project=mobileSafari
npx playwright test --project=mobileChrome
```

### 🔹 Run by tag

```bash
npx playwright test --grep='@positive'
npx playwright test --grep='@negative'
npx playwright test --grep='@smoke'
npx playwright test --grep='@regression'
```

---

## 📦 Qase (CaseIO) Integration

This project integrates with [Qase.io](https://qase.io) to log automated test results.

### 🔹 Qase Setup

1. Install the reporter:
```bash
npm install playwright-qase-reporter
```

2. Create a `.env` file and add:
```
QASE_TOKEN=your-qase-api-token
QASE_PROJECT=YOUR_PROJECT_CODE
```

3. Reporter is already configured in `playwright.config.ts`. When you run:
```bash
npx playwright test
```

✅ A new test run will be created in Qase with results uploaded automatically.

> Note: Tests can be linked to Qase cases using `@QASE_ID=123` in test names, but it's optional.

---

## 🧾 Reports & Logs

- View HTML report after test run:
```bash
npx playwright show-report
```

- Reports & logs:
```
test-results/results/index.html     ← Playwright HTML report
```

---

## 📌 Future-Ready

- Supports Excel-driven data sets (e.g., Regression.xlsx)
- Easy integration with Allure Reports
- CI-ready with Jenkins/GitHub Actions

---

## 📋 Sample Command Summary

| Task                            | Command Example                                      |
|---------------------------------|------------------------------------------------------|
| Run all tests                   | `npx playwright test`                                |
| Run in Chrome                   | `npx playwright test --project=chromium`             |
| Run mobile tests                | `npx playwright test --project=mobileSafari`         |
| Run only in debug mode          | `npx playwright test --project=chromium --debug`     |
| Run tagged tests                | `npx playwright test --grep='@positive'`             |
| View HTML report                | `npx playwright show-report`                         |

---

Happy Testing! 🚀