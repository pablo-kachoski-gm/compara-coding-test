const MIN_PRODUCT_PRICE = 0;
const PRICE_DEGRADE = 1;
class Product {
    constructor(name, sellIn, price) {
        if (price < MIN_PRODUCT_PRICE) throw Error("Invalid arguments");
        this.name = name;
        this.sellIn = sellIn;
        this.price = price;
    }
    _updatePrice() {
        if (this.price <= MIN_PRODUCT_PRICE) return;
        this.price -= this.getDegradeValue();
    }
    _updateSellIn() {
        this.sellIn -= 1;
    }
    update() {
        this._updateSellIn();
        this._updatePrice();
    }
    getDegradeValue() {
        return this.sellIn < 0 ? PRICE_DEGRADE * 2 : PRICE_DEGRADE;
    }
}

module.exports = Product
