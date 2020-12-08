const CarInsurance = require("./models/car-insurance");
const productFactory = require("./factories/product-factory");

const productsAtDayZero = [
  productFactory.create("Medium Coverage", 10, 20),
  productFactory.create("Full Coverage", 2, 0),
  productFactory.create("Low Coverage", 5, 7),
  productFactory.create("Mega Coverage", 0, 80),
  productFactory.create("Mega Coverage", -1, 80),
  productFactory.create("Special Full Coverage", 15, 20),
  productFactory.create("Special Full Coverage", 10, 49),
  productFactory.create("Special Full Coverage", 5, 49),
  productFactory.create("Super Sale", 3, 6),
];

const carInsurance = new CarInsurance(productsAtDayZero);
const productPrinter = function (product) {
  console.log(`${product.name}, ${product.sellIn}, ${product.price}`);
};

for (let i = 1; i <= 30; i += 1) {
  console.log(`Day ${i}`);
  console.log("name, sellIn, price");
  carInsurance.updatePrice().forEach(productPrinter);
  console.log("");
}
