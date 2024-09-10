const mongoose = require("mongoose");
const validator = require("validator");

// const fooditem = new mongoose.Schema({
//   foodId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Food",
//     required: [true, "atleast one food item required"],
//   },
//   quantity: {
//     type: Number,
//   },
// });

const foodOrderSchema = new mongoose.Schema({
  food: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cart",
    required: [true, "food must be required required"],
  
  }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "user must be required required"],
  },
  address: {
    type: "string",
  },
  price: {
    type: String,
    required: [true, "price must be required"],
  },
  discount: {
    type: Number,
    min: 0,
    default: 0,
    max: 100,
  },
  status: {
    type: String,
    enum: ["ordered", "initiate", "on-way", "delivered"],
    default: "ordered",
  },
  payType: {
    type: String,
    enum: ["cod", "online"],
    default: "cod",
  },
  phone: {
    type: Number,
    required: [true, "phone no must be required"],
    validate: {
      validator: function (val) {
        return val.toString().length === 10;
      },
      message: (val) => `${val.value} has to be 10 digits`,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});


foodOrderSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
  });
  next();
});
foodOrderSchema.pre(/^find/, function (next) {
  this.populate({
    path: "food",
  });
  next();
});

const FoodOrder = mongoose.model("FoodOrder", foodOrderSchema);
module.exports = FoodOrder;
