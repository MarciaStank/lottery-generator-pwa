# Automated Test Cases

| ID | Scenario | Expected Result |
| --- | --- | --- |
| CT01 | Open the lottery home page | 60 numbers displayed, first value 1, last value 60, draw button enabled |
| CT02 | Draw lottery numbers | Result page displays six unique integers between 1 and 60 |
| CT03 | Open registration from the home page | Name and email fields visible, submit button disabled |
| CT04 | Submit a valid name and email | User added to the list, fields cleared, submit button disabled |
| CT05 | Enter an invalid name, then an invalid email | Corresponding validation messages displayed, submission disabled, no user added |

## Specifications and Implementation

- [Gherkin scenarios](features/lottery.feature)
- [Playwright tests](../tests/lottery.spec.ts)
- [Page Objects](../tests/pages/)

Gherkin documents the scenarios. Playwright executes the TypeScript tests.

## Execution Evidence

The HTML report includes Given/When/Then steps and attached screenshots.
Failure screenshots and traces are retained automatically.

GitHub Actions publishes reports and failure evidence in the
`playwright-results` artifact, retained for 14 days.

## Coverage Limits

The suite covers selected UI flows on Chromium. It does not assess
offline PWA behavior, installation, accessibility, performance,
or security.
