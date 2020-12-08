class CarInsurance {
    constructor(products = []) {
        this.products = products;
    }
    updatePrice() {
        this.products.forEach(product => product.update());
        return this.products;
    }
}
module.exports = CarInsurance