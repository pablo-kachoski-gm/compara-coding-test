const chai = require("chai");
const Product = require("../src/models/product");
const FullCoverage = require("../src/models/full-coverage-product");
const SuperSale = require("../src/models/super-sale-product");
const SpecialCoverage = require("../src/models/special-coverage-product");
const { expect } = chai;

describe("Product Test", function () {
  //Normal update
  it("should create ok", function () {
    const name = "Product1";
    const sellIn = 10;
    const price = 10;
    const product = new Product(name, sellIn, price);

    expect(product.name).equal(name);
    expect(product.sellIn).equal(sellIn);
    expect(product.price).equal(price);
  });
  it("should fail on new FullCoverage with invalid args", function () {
    const sellIn = 10;
    const price = -10;
    expect(function () {
      new FullCoverage(sellIn, price);
    }).to.throw("Invalid arguments");
  });
  it("should fail on new SpecialCoverage with invalid args", function () {
    const sellIn = 10;
    const price = -10;
    expect(function () {
      new SpecialCoverage(sellIn, price);
    }).to.throw("Invalid arguments");
  });
  it("should fail on new SuperSale with invalid args", function () {
    const sellIn = 10;
    const price = -10;
    expect(function () {
      new SuperSale(sellIn, price);
    }).to.throw("Invalid arguments");
  });
  it("should update Special Full Coverage with max allowed price value", function () {
    const product = new SpecialCoverage(5, 49);
    product.update();
    expect(product.price).equal(50);
  });
});
