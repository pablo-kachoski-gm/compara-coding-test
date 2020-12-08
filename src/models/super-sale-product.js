const Product = require("./product");
const PRODUCT_TYPES = require("../types/product-types")

const MAX_PRODUCT_PRICE = 50
const MIN_PRODUCT_PRICE = 0
class SuperSale extends Product {
    constructor(sellIn, price) {
        if (price > MAX_PRODUCT_PRICE || price < MIN_PRODUCT_PRICE) throw Error("Invalid arguments")
        super(PRODUCT_TYPES.SUPER_SALE, sellIn, price)
    }
    _getValidMinPrice(newPrice) {
        return newPrice <= MIN_PRODUCT_PRICE ? MIN_PRODUCT_PRICE : newPrice
    }
    _updatePrice() {
        this.price = this._getValidMinPrice(this.price - super.getDegradeValue() * 2)
    }
    update() {
        super._updateSellIn()
        this._updatePrice()
    }
}

module.exports = SuperSale
