const catchAsync = require("../utility/catchAsync");
const Rooms = require("../database/roomModel");
const RoomBooking = require("../database/roomBookingModel");
const Food = require("../database/foodModel");
const FoodOrder=require("../database/foodOrderModel")
const Cart=require('../database/cartModel')
const Address=require("../database/addressModel")

exports.login = (req, res, next) => {
  res.status(200).render("login");
};
exports.forgot = (req, res, next) => {
  res.status(200).render("forgotpass");
};
exports.adminroom = catchAsync(async (req, res, next) => {
  const rooms = await Rooms.find({}, { roomNo: 1 });
  const booking = await RoomBooking.find({
    entryTime: { $lt: Date.now() },
    expireTime: { $gt: Date.now() },
  });
  let arr1 = [];
  let arr2 = [];
  for (let i = 0; i < booking.length; i++) {
    arr1.push(booking[i].room.roomNo);
  }
  for (i = 0; i < rooms.length; i++) {
    arr2.push(rooms[i].roomNo);
  }
  const filteredArray = arr2.filter((item) => !arr1.includes(item));
  const avlRoom = await Rooms.find({ roomNo: { $in: filteredArray } });
  res.status(200).render("adminRoom", { avlRoom, booking });
});
exports.adminSetting = (req, res, next) => {
  res.status(200).render("adminSetting");
};

exports.createRoom = (req, res, next) => {
  res.status(200).render("adminCreateRoom");
};
exports.resetpassword = (req, res, next) => {
  res.status(200).render("passwordReset");
};

exports.home = (req, res, next) => {
  let user;
  if (res.locals.user) {
    user = res.locals.user;
  }

  res.status(200).render("home", { user });
};
exports.events = (req, res, next) => {
  res.status(200).render("events");
};
exports.about = (req, res, next) => {
  res.status(200).render("about");
};
exports.place = (req, res, next) => {
  res.status(200).render("place");
};
exports.rooms = (req, res, next) => {
  res.status(200).render("room");
};
exports.bookingForm = (req, res, next) => {
  const roomId = req.params.roomId;
  res.status(200).render("bookingForm", { roomId });
};
exports.createRoomForm = (req, res, next) => {
  res.status(200).render("roomCreate");
};
exports.resturent = catchAsync(async (req, res, next) => {
  const foods = await Food.find();
  res.status(200).render("resturent",{foods});
});
exports.me=catchAsync(async(req,res,next)=>{
  const user=req.user;
  console.log(user.id);
  const orderfood=await FoodOrder.find({user:user.id}).limit(5)
  const roombooking=await RoomBooking.find({email:user.email}).limit(5)
  // console.log(orderfood[0].status);
  res.status(200).render("me",{user,orderfood,roombooking})
})
exports.checkout=catchAsync(async(req,res,next)=>{
  const userId=req.user.id;
  const items=await Cart.find({user:userId})
  const address=await Address.find({user:userId})
  let total=0;
  let sipping=20;
  items.forEach(el => {
      total=total + (el.food.price * el.quantity)
  });
  if(total >= 500){
      sipping=0
  }
  console.log(address);
  res.status(200).render("checkout",{items,address,total,sipping})
})
