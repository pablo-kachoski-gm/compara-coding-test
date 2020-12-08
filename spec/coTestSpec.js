const expect = require("chai").expect;
const CarInsurance = require("../src/models/car-insurance");
const productFactory = require("../src/factories/product-factory");

describe("Co Test", function () {
  it("should create car insurance without errors", function () {
    const coTest = new CarInsurance();
    const products = coTest.updatePrice();
    expect(products.length).equal(0);
  });
  //Normal update
  it("should update normal product price", function () {
    const coTest = new CarInsurance([productFactory.create("foo", 1, 2)]);
    const products = coTest.updatePrice();
    expect(products[0].price).equal(1);
  });
  //Once the sell by date has passed, price degrades twice as fast.
  it("should update normal product price twice as fast", function () {
    const coTest = new CarInsurance([productFactory.create("foo", -1, 4)]);
    const products = coTest.updatePrice();
    expect(products[0].price).equal(2);
  });
  //A product can never have its price increase above 50
  it("should update product price and not be above 50", function () {
    const coTest = new CarInsurance([
      productFactory.create("Full Coverage", 0, 50),
    ]);
    const products = coTest.updatePrice();
    expect(products[0].price).equal(50);
  });
  //The price of a product is never negative.
  it("should update normal product price and not be negative", function () {
    const coTest = new CarInsurance([productFactory.create("foo", 0, 0)]);
    const products = coTest.updatePrice();
    expect(products[0].price).equal(0);
  });
  //"Full Coverage" actually increases in price the older it gets.
  it("should update Full Coverage product price", function () {
    const coTest = new CarInsurance([
      productFactory.create("Full Coverage", 1, 4),
    ]);
    let products = coTest.updatePrice();
    expect(products[0].price).equal(5);
    products = coTest.updatePrice();
    expect(products[0].price).equal(7);
  });
  //"Mega Coverage", being a legendary product, never has to be sold or decreases in price.
  //"Mega Coverage" is a legendary product and as such its price is 80 and it never alters.
  it("should not update Mega Coverage product price nor sellIn values", function () {
    const coTest = new CarInsurance([
      productFactory.create("Mega Coverage", 1, 80),
    ]);
    const products = coTest.updatePrice();
    expect(products[0].price).equal(80);
    expect(products[0].sellIn).equal(0);
  });
  //"Special Full Coverage", like full coverage, increases in price as its sellIn value approaches:
  // price increases by 2 when there are 10 days or less and by 3 when there are 5 days or less but.
  // price drops to 0 when no more days left (and the product is not valid anymore).
  it("should update Special Full Coverage product price nor sellIn values", function () {
    const coTest = new CarInsurance([
      productFactory.create("Special Full Coverage", 12, 0),
    ]);
    let products = coTest.updatePrice();
    let expectedPrice = 1;
    let expectedSellIn = 11;
    expect(products[0].price).equal(expectedPrice);
    expect(products[0].sellIn).equal(expectedSellIn);
    //price increases by 2 when there are 10 days or less
    const from10to5 = [...Array(5).keys()];
    from10to5.forEach((_) => {
      products = coTest.updatePrice();
      expectedPrice += 2;
      expectedSellIn -= 1;
      expect(products[0].price).equal(expectedPrice);
      expect(products[0].sellIn).equal(expectedSellIn);
    });
    //price increases by 3 when there are 5 days or less.
    const from5to0 = [...Array(5).keys()];
    from5to0.forEach((_) => {
      products = coTest.updatePrice();
      expectedPrice += 3;
      expectedSellIn -= 1;
      expect(products[0].price).equal(expectedPrice);
      expect(products[0].sellIn).equal(expectedSellIn);
    });
    // price drops to 0 when no more days left (and the product is not valid anymore).
    products = coTest.updatePrice();
    expect(products[0].sellIn).equal(0);
    expect(products[0].price).equal(0);
  });

  //"Super Sale" Products degrade in price twice as fast as normal Products.
  it("should not update Super Sale product price nor sellIn values", function () {
    const coTest = new CarInsurance([
      productFactory.create("Super Sale", 1, 4),
    ]);
    let products = coTest.updatePrice();
    expect(products[0].price).equal(2);
    expect(products[0].sellIn).equal(0);
    //Twice product price degrade speed when negative
    products = coTest.updatePrice();
    expect(products[0].price).equal(0);
    expect(products[0].sellIn).equal(-1);
  });
});
