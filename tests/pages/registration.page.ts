import { type Locator, type Page } from '@playwright/test';

export class RegistrationPage {
  readonly heading: Locator;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly submitButton: Locator;
  readonly invalidNameMessage: Locator;
  readonly invalidEmailMessage: Locator;
  readonly registeredCells: Locator;

  constructor(private readonly page: Page) {
    this.heading = page.getByRole('heading', {
      name: 'Cadastro de Usuário',
      exact: true,
    });

    this.nameInput = page.getByLabel('Nome:', { exact: true });
    this.emailInput = page.getByLabel('Email:', { exact: true });

    this.submitButton = page.getByRole('button', {
      name: 'Enviar',
      exact: true,
    });

    this.invalidNameMessage = page.getByText(
      'Digite um nome válido sem números.',
      { exact: true }
    );

    this.invalidEmailMessage = page.getByText(
      'Digite um email válido.',
      { exact: true }
    );

    this.registeredCells = page.getByRole('cell');
  }

  async open() {
    await this.page.goto('/cadastro');
  }

  async fillForm(name: string, email: string) {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
  }

  async submit() {
    await this.submitButton.click();
  }

  userRow(email: string): Locator {
    return this.page.getByRole('row').filter({ hasText: email });
  }
}