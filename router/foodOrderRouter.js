const express = require("express");
const Router = express.Router();
const foodOrderController = require("../controller/foodOrderController");
const authController = require("../controller/authController");
const viewController = require("../controller/viewController");
const notificationController = require("../controller/notificationController");
Router.route("/").get(
  authController.protect,
  authController.accessTo("admin"),
  foodOrderController.allOrders
);

Router.route("/order").post(
  authController.protect,
  notificationController.sendtoadmin,
  foodOrderController.createOrder
);
Router.route("/checkout").get(
  authController.protect,
  foodOrderController.checkout
);

Router.route("/:orderId")
  .get(foodOrderController.OneOrders)
  .patch(
    authController.protect,
    authController.accessTo("admin"),
    foodOrderController.updateOrders
  )
  .delete(
    authController.protect,
    authController.accessTo("admin"),
    foodOrderController.deleteOrders
  );

module.exports = Router;
