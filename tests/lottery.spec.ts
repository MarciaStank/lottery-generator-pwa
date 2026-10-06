import { test, expect } from '@playwright/test';
import { LotteryPage } from './pages/lottery.page';
import { RegistrationPage } from './pages/registration.page';

test('CT01 - displays the lottery home page', async ({ page }) => {
  const lottery = new LotteryPage(page);

  await lottery.open();

  await expect(lottery.heading).toBeVisible();
  await expect(lottery.drawButton).toBeEnabled();
  await expect(lottery.availableNumbers).toHaveCount(60);
  await expect(lottery.availableNumbers.first()).toHaveText('1');
  await expect(lottery.availableNumbers.last()).toHaveText('60');
});

test('CT02 - draws six unique numbers between 1 and 60', async ({ page }) => {
  const lottery = new LotteryPage(page);

  await lottery.open();
  await lottery.drawNumbers();

  await expect(page).toHaveURL(/\/result\?numbers=/);
  await expect(lottery.resultHeading).toBeVisible();
  await expect(lottery.resultNumbers).toHaveCount(6);

  const numbers = await lottery.getDrawnNumbers();

  expect(new Set(numbers).size).toBe(6);

  for (const number of numbers) {
    expect(Number.isInteger(number)).toBe(true);
    expect(number).toBeGreaterThanOrEqual(1);
    expect(number).toBeLessThanOrEqual(60);
  }
});

test('CT03 - navigates to the registration page', async ({ page }) => {
  const lottery = new LotteryPage(page);
  const registration = new RegistrationPage(page);

  await lottery.open();
  await lottery.openRegistration();

  await expect(page).toHaveURL(/\/cadastro$/);
  await expect(registration.heading).toBeVisible();
  await expect(registration.nameInput).toBeVisible();
  await expect(registration.emailInput).toBeVisible();
  await expect(registration.submitButton).toBeDisabled();
});

test('CT04 - registers a valid user and displays it in the list', async ({ page }) => {
  const registration = new RegistrationPage(page);

  await registration.open();
  await registration.fillForm('Maria Teste', 'maria@example.com');

  await expect(registration.submitButton).toBeEnabled();
  await registration.submit();

  const registeredUser = registration.userRow('maria@example.com');

  await expect(registeredUser).toHaveCount(1);
  await expect(registeredUser).toContainText(/Maria Teste/i);
  await expect(registeredUser).toContainText('maria@example.com');

  await expect(registration.nameInput).toBeEmpty();
  await expect(registration.emailInput).toBeEmpty();
  await expect(registration.submitButton).toBeDisabled();
});

test('CT05 - rejects an invalid name and email', async ({ page }) => {
  const registration = new RegistrationPage(page);

  await registration.open();

  // Nome inválido com e-mail válido.
  await registration.fillForm('Maria123', 'maria@example.com');

  await expect(registration.invalidNameMessage).toBeVisible();
  await expect(registration.submitButton).toBeDisabled();

  // Nome válido com e-mail inválido.
  await registration.fillForm('Maria Teste', 'email-invalido');
  await registration.nameInput.click();

  await expect(registration.invalidEmailMessage).toBeVisible();
  await expect(registration.submitButton).toBeDisabled();
  await expect(registration.registeredCells).toHaveCount(0);
});