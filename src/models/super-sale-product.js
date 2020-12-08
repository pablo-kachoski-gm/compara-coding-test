const Product = require("./product");
const PRODUCT_TYPES = require("../types/product-types")

const MIN_PRODUCT_PRICE = 0
class SuperSale extends Product {
    constructor(sellIn, price) {
        if (price < MIN_PRODUCT_PRICE) throw Error("Invalid arguments")
        super(PRODUCT_TYPES.SUPER_SALE, sellIn, price)

    }
    _updatePrice() {
        if (this.price <= MIN_PRODUCT_PRICE) return
        this.price -= super.getDegradeValue() * 2
    }
    _updateSellIn() {
        this.sellIn -= 1
    }
    update() {
        super._updateSellIn()
        this._updatePrice()
    }
}

module.exports = SuperSale
