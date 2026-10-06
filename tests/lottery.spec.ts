import { test, expect } from '@playwright/test';
import { LotteryPage } from './pages/lottery.page';
import { RegistrationPage } from './pages/registration.page';

test('CT01 - displays the lottery home page', async ({ page }) => {
  const lottery = new LotteryPage(page);

  await test.step('Given the lottery application is available', async () => {
    await lottery.open();
    await expect(page).toHaveURL('http://127.0.0.1:4200/');
  });

  await test.step('When the user views the home page', async step => {
    await expect(lottery.heading).toBeVisible();

    await step.attach('Home page', {
      body: await page.screenshot({ fullPage: true }),
      contentType: 'image/png',
    });
  });

  await test.step('Then 60 available numbers and an enabled draw button are displayed', async step => {
    await expect(lottery.drawButton).toBeEnabled();
    await expect(lottery.availableNumbers).toHaveCount(60);
    await expect(lottery.availableNumbers.first()).toHaveText('1');
    await expect(lottery.availableNumbers.last()).toHaveText('60');

    await step.attach('Available numbers and draw button', {
      body: await page.screenshot({ fullPage: true }),
      contentType: 'image/png',
    });
  });
});

test('CT02 - draws six unique numbers between 1 and 60', async ({ page }) => {
  const lottery = new LotteryPage(page);

  await test.step('Given the user is on the lottery home page', async step => {
    await lottery.open();
    await expect(lottery.drawButton).toBeEnabled();

    await step.attach('Home page', {
      body: await page.screenshot({ fullPage: true }),
      contentType: 'image/png',
    });
  });

  await test.step('When the user draws lottery numbers', async step => {
    await lottery.drawNumbers();

    await expect(page).toHaveURL(/\/result\?numbers=/);
    await expect(lottery.resultHeading).toBeVisible();
    await expect(lottery.resultNumbers).toHaveCount(6);

    await step.attach('Draw result', {
      body: await page.screenshot({ fullPage: true }),
      contentType: 'image/png',
    });
  });

  await test.step('Then six unique integers between 1 and 60 are displayed', async step => {
    const numbers = await lottery.getDrawnNumbers();

    expect(new Set(numbers).size).toBe(6);

    for (const number of numbers) {
      expect(Number.isInteger(number)).toBe(true);
      expect(number).toBeGreaterThanOrEqual(1);
      expect(number).toBeLessThanOrEqual(60);
    }

    await step.attach('Validated numbers', {
      body: await page.screenshot({ fullPage: true }),
      contentType: 'image/png',
    });
  });
});

test('CT03 - navigates to the registration page', async ({ page }) => {
  const lottery = new LotteryPage(page);
  const registration = new RegistrationPage(page);

  await test.step('Given the user is on the lottery home page', async step => {
    await lottery.open();
    await expect(lottery.registerButton).toBeVisible();

    await step.attach('Home page', {
      body: await page.screenshot({ fullPage: true }),
      contentType: 'image/png',
    });
  });

  await test.step('When the user opens registration', async step => {
    await lottery.openRegistration();

    await expect(page).toHaveURL(/\/cadastro$/);
    await expect(registration.heading).toBeVisible();

    await step.attach('Registration page', {
      body: await page.screenshot({ fullPage: true }),
      contentType: 'image/png',
    });
  });

  await test.step('Then the registration fields are visible and submission is disabled', async step => {
    await expect(registration.nameInput).toBeVisible();
    await expect(registration.emailInput).toBeVisible();
    await expect(registration.submitButton).toBeDisabled();

    await step.attach('Empty registration form', {
      body: await page.screenshot({ fullPage: true }),
      contentType: 'image/png',
    });
  });
});

test('CT04 - registers a valid user and displays it in the list', async ({ page }) => {
  const registration = new RegistrationPage(page);

  await test.step('Given the user has entered a valid name and email', async step => {
    await registration.open();
    await registration.fillForm('Maria Teste', 'maria@example.com');

    await expect(registration.submitButton).toBeEnabled();

    await step.attach('Valid registration data', {
      body: await page.screenshot({ fullPage: true }),
      contentType: 'image/png',
    });
  });

  await test.step('When the user submits the registration', async step => {
    await registration.submit();

    await expect(
      registration.userRow('maria@example.com')
    ).toHaveCount(1);

    await step.attach('Submitted registration', {
      body: await page.screenshot({ fullPage: true }),
      contentType: 'image/png',
    });
  });

  await test.step('Then the user is listed and the form is cleared', async step => {
    const registeredUser = registration.userRow('maria@example.com');

    await expect(registeredUser).toContainText(/Maria Teste/i);
    await expect(registeredUser).toContainText('maria@example.com');

    await expect(registration.nameInput).toBeEmpty();
    await expect(registration.emailInput).toBeEmpty();
    await expect(registration.submitButton).toBeDisabled();

    await step.attach('Registered user and cleared form', {
      body: await page.screenshot({ fullPage: true }),
      contentType: 'image/png',
    });
  });
});

test('CT05 - rejects an invalid name and email', async ({ page }) => {
  const registration = new RegistrationPage(page);

  await test.step('Given the user is on the registration page', async step => {
    await registration.open();
    await expect(registration.heading).toBeVisible();

    await step.attach('Registration page', {
      body: await page.screenshot({ fullPage: true }),
      contentType: 'image/png',
    });
  });

  await test.step('When the user enters an invalid name and a valid email', async step => {
    await registration.fillForm('Maria123', 'maria@example.com');

    await expect(registration.invalidNameMessage).toBeVisible();

    await step.attach('Invalid name', {
      body: await page.screenshot({ fullPage: true }),
      contentType: 'image/png',
    });
  });

  await test.step('Then a name validation message is displayed and submission is disabled', async step => {
    await expect(registration.invalidNameMessage).toBeVisible();
    await expect(registration.submitButton).toBeDisabled();

    await step.attach('Submission blocked for invalid name', {
      body: await page.screenshot({ fullPage: true }),
      contentType: 'image/png',
    });
  });

  await test.step('When the user enters a valid name and an invalid email', async step => {
    await registration.fillForm('Maria Teste', 'email-invalido');
    await registration.nameInput.click();

    await expect(registration.invalidEmailMessage).toBeVisible();

    await step.attach('Invalid email', {
      body: await page.screenshot({ fullPage: true }),
      contentType: 'image/png',
    });
  });

  await test.step('Then an email validation message is displayed and no user is registered', async step => {
    await expect(registration.invalidEmailMessage).toBeVisible();
    await expect(registration.submitButton).toBeDisabled();
    await expect(registration.registeredCells).toHaveCount(0);

    await step.attach('Submission blocked and user list empty', {
      body: await page.screenshot({ fullPage: true }),
      contentType: 'image/png',
    });
  });
});