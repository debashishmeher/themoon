const express = require("express");
const Router = express.Router();
const foodController = require("../controller/foodController");
const authController = require("../controller/authController");
const viewController = require("../controller/viewController");

Router.route("/")
  .post(
    authController.protect,
    authController.accessTo("admin"),
    foodController.foodPhoto,
    foodController.processimg,
    foodController.createFood
  )
  .get(foodController.getAllFood);

Router.route("/:foodId")
  .get(foodController.getOneFood)
  .patch(
    authController.protect,
    authController.accessTo("admin"),
    foodController.updateFood
  )
  .delete(
    authController.protect,
    authController.accessTo("admin"),
    foodController.deleteFood
  );

Router.route("/:foodId/review").post(
  authController.protect,
  foodController.createReview
);
Router.route("/:foodId/review/:id").patch(
  authController.protect,
  // authController.checkUser("Review"),
  foodController.editReview
);

module.exports = Router;
