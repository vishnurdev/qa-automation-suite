const { test, expect } = require('../../fixtures');
const { products, customer } = require('../../utils/testData');

test.describe('Checkout', () => {
  test('complete purchase end to end, with correct totals @smoke', async ({ loggedIn, cartPage, checkoutPage }) => {
    const chosen = [products.backpack, products.boltTShirt];
    for (const p of chosen) await loggedIn.addToCart(p.slug);

    await loggedIn.openCart();
    await cartPage.expectLoaded();
    await cartPage.expectItems(chosen.map((p) => p.name));
    await cartPage.checkout();

    await checkoutPage.fillInformation(customer);

    const { subtotal, tax, total } = await checkoutPage.readAmounts();
    const expectedSubtotal = chosen.reduce((sum, p) => sum + p.price, 0);
    expect(subtotal).toBeCloseTo(expectedSubtotal, 2);
    expect(tax).toBeGreaterThan(0);
    expect(total).toBeCloseTo(subtotal + tax, 2);

    await checkoutPage.finish();
  });

  test('checkout requires first name', async ({ loggedIn, cartPage, checkoutPage }) => {
    await loggedIn.addToCart(products.backpack.slug);
    await loggedIn.openCart();
    await cartPage.checkout();
    await checkoutPage.fillInformation({ ...customer, firstName: '' });
    await expect(checkoutPage.error).toContainText('First Name is required');
  });

  test('checkout requires postal code', async ({ loggedIn, cartPage, checkoutPage }) => {
    await loggedIn.addToCart(products.backpack.slug);
    await loggedIn.openCart();
    await cartPage.checkout();
    await checkoutPage.fillInformation({ ...customer, postalCode: '' });
    await expect(checkoutPage.error).toContainText('Postal Code is required');
  });
});
