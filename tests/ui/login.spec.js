const { test, expect } = require('../../fixtures');
const { users } = require('../../utils/testData');

test.describe('Login', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('standard user can log in @smoke', async ({ loginPage, inventoryPage }) => {
    await loginPage.login(users.standard);
    await inventoryPage.expectLoaded();
  });

  test('locked out user sees an error', async ({ loginPage }) => {
    await loginPage.login(users.lockedOut);
    await loginPage.expectError('Sorry, this user has been locked out.');
  });

  test('wrong credentials are rejected', async ({ loginPage, page }) => {
    await loginPage.login(users.invalid);
    await loginPage.expectError('Username and password do not match any user in this service');
    await expect(page).not.toHaveURL(/inventory/);
  });

  const missing = [
    { case: 'username', creds: { username: '', password: 'secret_sauce' }, msg: 'Username is required' },
    { case: 'password', creds: { username: 'standard_user', password: '' }, msg: 'Password is required' },
  ];
  for (const m of missing) {
    test(`missing ${m.case} shows validation message`, async ({ loginPage }) => {
      await loginPage.login(m.creds);
      await loginPage.expectError(m.msg);
    });
  }

  test('user can log out', async ({ loginPage, inventoryPage }) => {
    await loginPage.login(users.standard);
    await inventoryPage.expectLoaded();
    await inventoryPage.logout();
    await expect(loginPage.loginButton).toBeVisible();
  });

  test('protected page redirects to login when not signed in', async ({ page, loginPage }) => {
    await page.goto('/inventory.html');
    await loginPage.expectError("You can only access '/inventory.html' when you are logged in.");
  });
});
