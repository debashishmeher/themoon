const express = require("express");
const Router = express.Router();
const roomBookingController = require("../controller/roomBookingController");
const authController = require("../controller/authController");
const viewController=require("../controller/viewController")

Router.use(authController.protect, authController.accessTo("admin"));
Router.route("/:roomId").post(roomBookingController.createBooking).get(viewController.bookingForm);
Router.route("/").get(roomBookingController.allbooking);
Router.route("/:bookingId")
  .get(roomBookingController.oneBooking)
  .patch(roomBookingController.updateBooking)
  .delete(roomBookingController.deleteBooking);

module.exports = Router;
