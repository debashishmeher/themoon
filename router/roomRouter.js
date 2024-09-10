const express = require("express");
const Router = express.Router();
const roomController = require("../controller/roomController");
const authController=require("../controller/authController")
const viewController=require("../controller/viewController")

Router.use(authController.protect,authController.accessTo("admin"))

Router.route("/")
  .post(roomController.createRoom)
  .get(roomController.getAllRooms);
  
Router.route("/:roomId")
  .get(roomController.getOneRoom)
  .patch(roomController.updateOneRoom)
  .delete(roomController.deleteOneRoom);
  


module.exports=Router;
