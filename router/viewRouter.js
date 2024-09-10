const express = require("express");
const Router = express.Router();
const viewController = require("../controller/viewController");
const authControl = require("../controller/authController");

Router.use(authControl.isLogin)

Router.route("/login").get(viewController.login);
Router.route("/forgot").get(viewController.forgot);
Router.route("/resetPassword/:resetToken").get(viewController.resetpassword);

Router.get("/", authControl.isLogin, viewController.home);
Router.get("/events",viewController.events)
Router.get("/about",viewController.about)
Router.get("/place",viewController.place)
Router.get("/rooms",viewController.rooms)
Router.get("/restaurant",viewController.resturent)
 Router.get("/me",authControl.protect,viewController.me)
 Router.get("/checkout-page",authControl.protect,viewController.checkout)

module.exports = Router;
