import { test, expect } from '@playwright/test';

test('CT01 - displays the lottery home page', async ({ page }) => {
  await page.goto('/');

  await expect(
    page.getByRole('heading', { name: 'Números Disponíveis:' })
  ).toBeVisible();

  await expect(
    page.getByRole('button', { name: 'Sortear Números', exact: true })
  ).toBeEnabled();

  await expect(page.locator('.number-button')).toHaveCount(60);

  await expect(page.locator('.number-button').first()).toHaveText('1');
  await expect(page.locator('.number-button').last()).toHaveText('60');
});

test('CT02 - draws six unique numbers between 1 and 60', async ({ page }) => {
  await page.goto('/');

  await page
    .getByRole('button', { name: 'Sortear Números', exact: true })
    .click();

  await expect(page).toHaveURL(/\/result\?numbers=/);

  await expect(
    page.getByRole('heading', { name: 'Resultado do Sorteio' })
  ).toBeVisible();

  const resultButtons = page.locator('.result-button');

  await expect(resultButtons).toHaveCount(6);

  const numbers = (await resultButtons.allTextContents())
    .map(text => Number(text.trim()));

  expect(new Set(numbers).size).toBe(6);

  for (const number of numbers) {
    expect(Number.isInteger(number)).toBe(true);
    expect(number).toBeGreaterThanOrEqual(1);
    expect(number).toBeLessThanOrEqual(60);
  }
});

test('CT03 - navigates to the registration page', async ({ page }) => {
  await page.goto('/');

  await page
    .getByRole('button', { name: 'Cadastrar', exact: true })
    .click();

  await expect(page).toHaveURL(/\/cadastro$/);

  await expect(
    page.getByRole('heading', { name: 'Cadastro de Usuário', exact: true })
  ).toBeVisible();

  await expect(page.getByLabel('Nome:', { exact: true })).toBeVisible();
  await expect(page.getByLabel('Email:', { exact: true })).toBeVisible();

  await expect(
    page.getByRole('button', { name: 'Enviar', exact: true })
  ).toBeDisabled();
});

test('CT04 - registers a valid user and displays it in the list', async ({ page }) => {
  await page.goto('/cadastro');

  await page.getByLabel('Nome:', { exact: true }).fill('Maria Teste');
  await page.getByLabel('Email:', { exact: true }).fill('maria@example.com');

  const submitButton = page.getByRole('button', {
    name: 'Enviar',
    exact: true,
  });

  await expect(submitButton).toBeEnabled();
  await submitButton.click();

  const registeredUser = page
    .getByRole('row')
    .filter({ hasText: 'maria@example.com' });

  await expect(registeredUser).toHaveCount(1);
  await expect(registeredUser).toContainText(/Maria Teste/i);
  await expect(registeredUser).toContainText('maria@example.com');

  await expect(page.getByLabel('Nome:', { exact: true })).toBeEmpty();
  await expect(page.getByLabel('Email:', { exact: true })).toBeEmpty();
  await expect(submitButton).toBeDisabled();
});

test('CT05 - rejects an invalid name and email', async ({ page }) => {
  await page.goto('/cadastro');

  const nameInput = page.getByLabel('Nome:', { exact: true });
  const emailInput = page.getByLabel('Email:', { exact: true });
  const submitButton = page.getByRole('button', {
    name: 'Enviar',
    exact: true,
  });

  // Nome inválido com e-mail válido.
  await nameInput.fill('Maria123');
  await emailInput.fill('maria@example.com');

  await expect(
    page.getByText('Digite um nome válido sem números.', { exact: true })
  ).toBeVisible();

  await expect(submitButton).toBeDisabled();

  // Nome válido com e-mail inválido.
  await nameInput.fill('Maria Teste');
  await emailInput.fill('email-invalido');
  await nameInput.click();

  await expect(
    page.getByText('Digite um email válido.', { exact: true })
  ).toBeVisible();

  await expect(submitButton).toBeDisabled();
  await expect(page.getByRole('cell')).toHaveCount(0);
});