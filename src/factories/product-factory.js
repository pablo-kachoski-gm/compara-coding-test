const Product = require("../models/product");
const FullCoverage = require("../models/full-coverage-product");
const MegaCoverage = require("../models/mega-coverage-product");
const SpecialCoverage = require("../models/special-coverage-product");
const SuperSale = require("../models/super-sale-product");
const PRODUCT_TYPES = require("../types/product-types");

class ProductFactory {
  create(name, sellIn, price) {
    switch (name) {
      case PRODUCT_TYPES.FULL_COVERAGE:
        return new FullCoverage(sellIn, price);
      case PRODUCT_TYPES.MEGA_COVERAGE:
        return new MegaCoverage(sellIn);
      case PRODUCT_TYPES.SPECIAL_FULL_COVERAGE:
        return new SpecialCoverage(sellIn, price);
      case PRODUCT_TYPES.SUPER_SALE:
        return new SuperSale(sellIn, price);
      default:
        return new Product(name, sellIn, price);
    }
  }
}

module.exports = new ProductFactory();
