const Product = require("./product");
const PRODUCT_TYPES = require("../types/product-types");

const MAX_PRODUCT_PRICE = 50;
class FullCoverage extends Product {
    constructor(sellIn, price) {
        if (price > MAX_PRODUCT_PRICE || price < 0) throw Error("Invalid arguments");
        super(PRODUCT_TYPES.FULL_COVERAGE, sellIn, price);
    }
    _updatePrice() {
        if (this.price >= MAX_PRODUCT_PRICE) return;
        this.price += 1;
    }
    update() {
        super._updateSellIn();
        this._updatePrice();
    }
}

module.exports = FullCoverage
