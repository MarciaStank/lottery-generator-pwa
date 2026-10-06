import { type Locator, type Page } from '@playwright/test';

export class LotteryPage {
  readonly heading: Locator;
  readonly drawButton: Locator;
  readonly registerButton: Locator;
  readonly availableNumbers: Locator;
  readonly resultHeading: Locator;
  readonly resultNumbers: Locator;

  constructor(private readonly page: Page) {
    this.heading = page.getByRole('heading', {
      name: 'Números Disponíveis:',
    });

    this.drawButton = page.getByRole('button', {
      name: 'Sortear Números',
      exact: true,
    });

    this.registerButton = page.getByRole('button', {
      name: 'Cadastrar',
      exact: true,
    });

    this.availableNumbers = page.locator('.number-button');

    this.resultHeading = page.getByRole('heading', {
      name: 'Resultado do Sorteio',
    });

    this.resultNumbers = page.locator('.result-button');
  }

  async open() {
    await this.page.goto('/');
  }

  async drawNumbers() {
    await this.drawButton.click();
  }

  async openRegistration() {
    await this.registerButton.click();
  }

  async getDrawnNumbers(): Promise<number[]> {
    const texts = await this.resultNumbers.allTextContents();
    return texts.map(text => Number(text.trim()));
  }
}