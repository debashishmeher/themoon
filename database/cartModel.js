const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  food: {
    type: mongoose.Schema.ObjectId,
    ref: "Food",
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  quantity: {
    type: Number,
    default: 1,
  },
  addedAt:{
    type:Date,
    default:Date.now()
  }
});


cartSchema.pre(/^find/, function (next) {
    this.populate({
      path: "food",
    });
    next();
  });
cartSchema.pre(/^find/, function (next) {
    this.populate({
      path: "user",
    });
    next();
  });

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
