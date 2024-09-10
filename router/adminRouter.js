const express = require("express");
const Router = express.Router();
const roomController = require("../controller/roomController");
const authController=require("../controller/authController")
const viewController=require("../controller/viewController")
Router.use(authController.protect,authController.accessTo("admin"))

Router.route("/createRoom")
  .post(roomController.createRoom)
Router.get("/",viewController.adminSetting)
  
Router.route("/rooms").get(viewController.adminroom)
Router.route("/rooms/:roomId/booking").get(viewController.bookingForm)
Router.route("/room/create").get(viewController.createRoomForm)

  
// Router.route("/rooms")


module.exports=Router;
