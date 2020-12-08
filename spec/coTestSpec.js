const expect = require('chai').expect;
const CarInsurance = require('../src/models/car-insurance');
const Product = require('../src/models/product');
describe("Co Test", function () {
  //Normal update
  it("should update normal product price", function () {
    const coTest = new CarInsurance([new Product("foo", 0, 2)]);
    const products = coTest.updatePrice();
    expect(products[0].price).equal(1);
  });
  //Once the sell by date has passed, price degrades twice as fast.
  it("should update normal product price twice as fast", function () {
    const coTest = new CarInsurance([new Product("foo", -1, 4)]);
    const products = coTest.updatePrice();
    expect(products[0].price).equal(2);
  });
  //A product can never have its price increase above 50
  it("should update product price and not be above 50", function () {
    const coTest = new CarInsurance([new Product("Full Coverage", 0, 50)]);
    const products = coTest.updatePrice();
    expect(products[0].price).equal(50);
  });
  //The price of a product is never negative.
  it("should update normal product price and not be negative", function () {
    const coTest = new CarInsurance([new Product("foo", 0, 0)]);
    const products = coTest.updatePrice();
    expect(products[0].price).equal(0);
  });
  //"Full Coverage" actually increases in price the older it gets.
  it("should update Full Coverage product price", function () {
    const coTest = new CarInsurance([new Product("Full Coverage", 0, 4)]);
    const products = coTest.updatePrice();
    expect(products[0].price).equal(5);
  });
  //"Mega Coverage", being a legendary product, never has to be sold or decreases in price.
  //"Mega Coverage" is a legendary product and as such its price is 80 and it never alters.
  it("should not update Mega Coverage product price nor sellIn values", function () {
    const coTest = new CarInsurance([new Product("Mega Coverage", 1, 80)]);
    const products = coTest.updatePrice();
    expect(products[0].price).equal(80);
    expect(products[0].sellIn).equal(1);
  });
  //"Special Full Coverage", like full coverage, increases in price as its sellIn value approaches:
  // price increases by 2 when there are 10 days or less and by 3 when there are 5 days or less but.
  // price drops to 0 when no more days left (and the product is not valid anymore).
  it("should update Special Full Coverage product price nor sellIn values", function () {
    const coTest = new CarInsurance([new Product("Special Full Coverage", 10, 0)]);
    let products = coTest.updatePrice();
    expect(products[0].price).equal(1);
    expect(products[0].sellIn).equal(9);
    //price increases by 2 when there are 10 days or less
    products = coTest.updatePrice();
    expect(products[0].price).equal(3);
    products = coTest.updatePrice();
    expect(products[0].price).equal(5);
    products = coTest.updatePrice();
    expect(products[0].price).equal(7);
    //price increases by 3 when there are 5 days or less but.
    products = coTest.updatePrice();
    expect(products[0].price).equal(10);
    expect(products[0].sellIn).equal(5);
    products = coTest.updatePrice();
    expect(products[0].sellIn).equal(4);
    products = coTest.updatePrice();
    expect(products[0].sellIn).equal(3);
    products = coTest.updatePrice();
    expect(products[0].sellIn).equal(2);
    products = coTest.updatePrice();
    expect(products[0].sellIn).equal(1);
    // price drops to 0 when no more days left (and the product is not valid anymore).
    products = coTest.updatePrice();
    expect(products[0].sellIn).equal(0);
    expect(products[0].price).equal(0);
  });

  //"Super Sale" Products degrade in price twice as fast as normal Products.
  it("should not update Super Sale product price nor sellIn values", function () {
    const coTest = new CarInsurance([new Product("Super Sale", 1, 4)]);
    const products = coTest.updatePrice();
    expect(products[0].price).equal(4);
    expect(products[0].sellIn).equal(1);
  });

});
