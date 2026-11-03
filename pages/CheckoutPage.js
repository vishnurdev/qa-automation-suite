const { expect } = require('@playwright/test');

class CheckoutPage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    this.page = page;
    // step one – your information
    this.firstName = page.getByTestId('firstName');
    this.lastName = page.getByTestId('lastName');
    this.postalCode = page.getByTestId('postalCode');
    this.continueButton = page.getByTestId('continue');
    this.error = page.getByTestId('error');
    // step two – overview
    this.subtotal = page.locator('.summary_subtotal_label');
    this.tax = page.locator('.summary_tax_label');
    this.total = page.locator('.summary_total_label');
    this.finishButton = page.getByTestId('finish');
    // complete
    this.completeHeader = page.locator('.complete-header');
  }

  async fillInformation({ firstName, lastName, postalCode }) {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.postalCode.fill(postalCode);
    await this.continueButton.click();
  }

  async readAmounts() {
    const num = async (loc) => Number((await loc.textContent()).replace(/[^0-9.]/g, ''));
    return { subtotal: await num(this.subtotal), tax: await num(this.tax), total: await num(this.total) };
  }

  async finish() {
    await this.finishButton.click();
    await expect(this.completeHeader).toHaveText('Thank you for your order!');
  }
}

module.exports = { CheckoutPage };
