# 🎰 Lottery Generator & Results Tracker (PWA)

## 📌 About the Project

This project is a Progressive Web App (PWA) that simulates a lottery system, allowing users to generate random bets ("quick pick"), view generated numbers, and register with name and email validation.

It was developed with a focus not only on functionality, but also on software quality, usability, and testability.

The original academic application now includes an educational test automation suite using Playwright and TypeScript.

## 🚀 Live Demo

- 🔗 [Live Application](https://marciastank.github.io/loteria2-pwa/)
- 🎥 [Demo Video](https://www.youtube.com/watch?v=cGQqVQhZM1U)
- 🎨 [Original Prototype (Figma)](https://www.figma.com/file/jB8tebTpq9ss0eA9RARj7T)

The automated tests run against the local application source. The published demo may differ from the current source.

## ✨ Features

- Generate six unique random lottery numbers between 1 and 60
- Display generated lottery results
- Register users with name and email validation
- Display registered users in an in-memory list
- Input validation with regex
- Responsive UI
- Navigation via routes
- Data binding and component communication
- Simulated asynchronous lottery service
- Dynamic list rendering with ngFor and ngIf
- Data formatting using pipes

## 🧪 Quality & Testing

This project applies QA practices through:

- Functional scenarios documented in Gherkin
- Positive and negative automated UI tests
- Input validation and error feedback
- Playwright automation with TypeScript
- Page Object Model
- Given/When/Then steps in execution reports
- Screenshots attached to report steps
- Screenshots and traces retained on failure
- Continuous integration with GitHub Actions

### Automated Scenarios

| ID | Scenario | Main Validation |
| --- | --- | --- |
| CT01 | Display the lottery home page | 60 available numbers, first and last values, and enabled draw button |
| CT02 | Generate lottery numbers | Six unique integers between 1 and 60 |
| CT03 | Navigate to registration | Visible fields and disabled submission for an empty form |
| CT04 | Register a valid user | User listed and form cleared after submission |
| CT05 | Reject invalid registration data | Validation messages, disabled submission, and empty user list |

Random results are validated through their count, uniqueness, integer values, and range rather than specific numbers.

Each test runs in an isolated browser context.

### Gherkin Specifications

The scenarios are documented in [lottery.feature](docs/features/lottery.feature).

The `.feature` file serves as a specification. Automated execution uses Playwright Test with TypeScript and Given/When/Then report steps.

### Running the Tests

Install project dependencies and Chromium:

```bash
npm ci
npx playwright install chromium
```

Run all automated tests:

```bash
npx playwright test
```

Run with a visible browser:

```bash
npx playwright test --headed
```

Open the latest HTML report:

```bash
npx playwright show-report
```

Playwright automatically starts the Angular development server at `http://127.0.0.1:4200`. Locally, it can reuse an existing server at that address.

### GitHub Actions

The workflow runs on:

- Pushes to `main` and `feat/playwright-tests`
- Pull requests targeting `main`
- Manual execution once the workflow is available on the default branch

The workflow installs dependencies and Chromium, starts the application through Playwright, and executes the suite.

The HTML report and failure evidence are uploaded as the `playwright-results` artifact and retained for 14 days. Downloading artifacts requires signing in to GitHub.

### Scope and Limitations

- The lottery service simulates asynchronous generation locally and does not call an external HTTP API.
- Registered users are stored in memory and are lost when the page is reloaded.
- The suite currently runs on Chromium.
- Offline PWA behavior, installation, accessibility, and performance are outside the current automated scope.
- Local and CI execution have succeeded on Windows with Node.js 24.15.0. However, Node.js 24 is outside Angular 16's official compatibility range.
- Known dependency vulnerabilities reported by npm audit require separate analysis. Functional test results do not assess application security.

## 🛠️ Tech Stack

- Angular 16
- TypeScript
- HTML / CSS
- Playwright Test
- GitHub Actions
- Gherkin for scenario documentation
- JSON Server (planned)

## 📂 Project Structure

| Path | Purpose |
| --- | --- |
| `src/` | Application source code |
| `tests/lottery.spec.ts` | Five automated UI scenarios |
| `tests/pages/` | Lottery and registration Page Objects |
| `docs/` | Requirements and test documentation |
| `docs/features/lottery.feature` | Gherkin specifications |
| `playwright.config.ts` | Browser, reports, evidence, and server configuration |
| `.github/workflows/playwright.yml` | Continuous integration workflow |

Generated reports and execution evidence are excluded from Git and uploaded as CI artifacts.

## 📈 Future Improvements

- Persist registration data using JSON Server
- Improve UX and accessibility
- Review legacy dependencies and Node.js compatibility

## 🎓 Academic Context

This project was originally developed in 2022 as part of the Frameworks course during a Postgraduate Specialization in Java.

It has been improved and structured to demonstrate software quality practices, testing approach, and front-end development skills.

The Playwright suite was added as a practical learning project to extend the original application with maintainable automated tests and continuous integration.

## 👩‍💻 Author

- Developed by Marcia Stankiwich
- QA Engineer with experience in mobile testing, automation, and agile teams
