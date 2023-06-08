const Cart = require("./Cart");
const Category = require("./Category");
const Product = require("./Product");
const ProductImg = require("./ProductImg");
const Purchase = require("./Purchase");
const User = require("./User");

Category.hasMany(Product);
Product.belongsTo(Category);

Product.hasMany(ProductImg);
ProductImg.belongsTo(Product);

Product.hasMany(Cart);
Cart.belongsTo(Product);

User.hasMany(Cart);
Cart.belongsTo(User);

Purchase.belongsTo(User);
User.hasMany(Purchase);

Purchase.belongsTo(Product);
Product.hasMany(Purchase);

//! Product tiene muchos carritos
//! Carrito solamente tiene un producto, producto del carrito solo hace refernecia a un producto

// Cart.belongsTo(user);
//Cart.belongsTo(Product);