const Cart = require("../database/cartModel");
const catchAsync = require("../utility/catchAsync");
const AppError = require("../utility/AppError");

exports.addItem = catchAsync(async (req, res, next) => {
  if (!req.body.user) req.body.user = req.user.id;
  if (!req.body.food) req.body.food = req.params.foodId;
  const food = await Cart.find({ user: req.user.id });
  for (let i = 0; i < food.length; i++) {
    const el = food[i];
    if (el.food.id == req.body.food) {
      return next(new AppError("atem already in your cart", 404));
    }
  }

  const item = await Cart.create(req.body);
  res.status(201).json({
    status: "success",
    message: "item added to cart",
    item,
  });
});

exports.getUserItems = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const items = await Cart.find({ user: userId });
  let total = 0;
  let sipping = 20;
  items.forEach((el) => {
    total = total + el.food.price * el.quantity;
  });
  if (total >= 500) {
    sipping = 0;
  }
  res.status(200).render("cart", { items, total, sipping });
});
exports.updateUserItems = catchAsync(async (req, res, next) => {
  const itemId = req.params.itemId;
  const items = await Cart.findById(itemId);
  items.quantity = req.body.quantity;
  await items.save();
  res.status(200).json({
    status: "success",
    message: "quantaty update successful",
    items,
  });
});
exports.deleteUserItems = catchAsync(async (req, res, next) => {
  const itemId = req.params.itemId;
  await Cart.findByIdAndDelete(itemId);

  res.status(200).json({
    status: "success",
    message: "quantaty deleted successful",
  });
});
