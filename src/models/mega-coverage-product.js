const Product = require("./product");
const PRODUCT_TYPES = require("../types/product-types")

const _MAX_PRICE = 80
class MegaCoverage extends Product {
    constructor(sellIn) {
        super(PRODUCT_TYPES.MEGA_COVERAGE, sellIn, _MAX_PRICE)
        Object.setPrototypeOf(this, MegaCoverage.prototype);
    }
    _updatePrice() {
    }
    update() {
        super._updateSellIn()
        this._updatePrice()
    }
}

module.exports = MegaCoverage
