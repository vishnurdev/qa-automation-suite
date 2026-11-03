// Public demo credentials published on https://www.saucedemo.com (not real accounts)
const PASSWORD = 'secret_sauce';

const users = {
  standard: { username: 'standard_user', password: PASSWORD },
  lockedOut: { username: 'locked_out_user', password: PASSWORD },
  invalid: { username: 'not_a_user', password: 'wrong_password' },
};

const customer = { firstName: 'Test', lastName: 'Buyer', postalCode: '500001' };

const products = {
  backpack: { slug: 'sauce-labs-backpack', name: 'Sauce Labs Backpack', price: 29.99 },
  bikeLight: { slug: 'sauce-labs-bike-light', name: 'Sauce Labs Bike Light', price: 9.99 },
  boltTShirt: { slug: 'sauce-labs-bolt-t-shirt', name: 'Sauce Labs Bolt T-Shirt', price: 15.99 },
};

module.exports = { users, customer, products };
