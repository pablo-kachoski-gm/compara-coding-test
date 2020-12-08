const Product = require("./product");
const PRODUCT_TYPES = require("../types/product-types")

const MAX_PRODUCT_PRICE = 50
const MIN_PRODUCT_PRICE = 0
class SpecialCoverage extends Product {
    constructor(sellIn, price) {
        if (price > MAX_PRODUCT_PRICE || price < MIN_PRODUCT_PRICE) throw Error("Invalid arguments")
        super(PRODUCT_TYPES.SPECIAL_COVERAGE, sellIn, price)
    }

    _getValidMaxPrice(newPrice) {
        return newPrice >= MAX_PRODUCT_PRICE ? MAX_PRODUCT_PRICE : newPrice
    }
    _updatePrice() {
        if (this.sellIn <= 0) {
            this.price = MIN_PRODUCT_PRICE
            return
        }
        if (this.price === MAX_PRODUCT_PRICE) {
            return
        }
        if (this.sellIn > 0 && this.sellIn <= 5) {
            this.price = this._getValidMaxPrice(this.price + 3)
        } else if (this.sellIn > 5 && this.sellIn <= 10) {
            this.price = this._getValidMaxPrice(this.price + 2)
        } else {
            this.price += 1;
        }
    }

    update() {
        super._updateSellIn()
        this._updatePrice()
    }
}

module.exports = SpecialCoverage
