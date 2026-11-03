const { test, expect } = require('../../fixtures');
const { products } = require('../../utils/testData');

test.describe('Products & cart', () => {
  test('shows 6 products with names and prices @smoke', async ({ loggedIn }) => {
    await expect(loggedIn.items).toHaveCount(6);
    for (const price of await loggedIn.getPrices()) expect(price).toBeGreaterThan(0);
  });

  test('sort by price low → high', async ({ loggedIn }) => {
    await loggedIn.sortBy('lohi');
    const prices = await loggedIn.getPrices();
    expect(prices).toEqual([...prices].sort((a, b) => a - b));
  });

  test('sort by price high → low', async ({ loggedIn }) => {
    await loggedIn.sortBy('hilo');
    const prices = await loggedIn.getPrices();
    expect(prices).toEqual([...prices].sort((a, b) => b - a));
  });

  test('sort by name Z → A', async ({ loggedIn }) => {
    await loggedIn.sortBy('za');
    const names = await loggedIn.getNames();
    expect(names).toEqual([...names].sort().reverse());
  });

  test('add and remove items updates the cart badge @smoke', async ({ loggedIn }) => {
    await loggedIn.expectCartCount(0);
    await loggedIn.addToCart(products.backpack.slug);
    await loggedIn.addToCart(products.bikeLight.slug);
    await loggedIn.expectCartCount(2);
    await loggedIn.removeFromCart(products.backpack.slug);
    await loggedIn.expectCartCount(1);
  });

  test('cart keeps items after page reload', async ({ loggedIn, page, cartPage }) => {
    await loggedIn.addToCart(products.backpack.slug);
    await page.reload();
    await loggedIn.expectCartCount(1);
    await loggedIn.openCart();
    await cartPage.expectItems([products.backpack.name]);
  });
});
