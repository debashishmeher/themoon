const Room=require("../database/roomModel")
const RoomBooking=require("../database/roomBookingModel")
const catchAsync = require("../utility/catchAsync");
const AppError = require("../utility/AppError");

// room booking section-----------------------------------------

exports.createBooking=catchAsync(async(req,res,next)=>{
    req.body.room=req.params.roomId;
    const avl=await (await RoomBooking.find({room:req.params.roomId,entryTime:{$lt:Date.now()},expireTime:{$gt:Date.now()}})).length
    if(avl>=1){
        return next(new AppError("room already booked",404))
    }
    const room=await Room.findById(req.params.roomId)
    req.body.amount=room.price * req.body.day
    const booking=await (await RoomBooking.create(req.body)).populate("room")
    res.status(201).json({
        status:"success",
        message:"booking successfully",
        booking,
    })
})

exports.allbooking=catchAsync(async(req,res,next)=>{
    const booking=await RoomBooking.find()
    res.status(200).json({
        status:"success",
        booking
    })
})

exports.oneBooking=catchAsync(async(req,res,next)=>{
    const bookingId=req.params.bookingId
    const booking=await RoomBooking.findById(bookingId)
    res.status(200).json({
        success:"success",
        booking
    })
})
exports.updateBooking=catchAsync(async(req,res,next)=>{
    const bookingId=req.params.bookingId
    const booking=await RoomBooking.findById(bookingId)
    booking.day=req.body.day
    booking.amount=booking.room.price * req.body.day
    await booking.save()
    res.status(200).json({
        success:"success",
        message:"booking day updated",
    })
})
exports.deleteBooking=catchAsync(async(req,res,next)=>{
    const bookingId=req.params.bookingId
    await RoomBooking.findByIdAndDelete(bookingId)
    res.status(200).json({
        status:"success",
        message:"room booking cancel."
    })
})

exports.searchRoom=catchAsync(async(req,res,next)=>{
    const checkin=req.body.checkin;
    const checkout=req.body.checkout;
    const isAvailable=await RoomBooking.find({expireTime:{$lt:Date.now()}})
    if(isAvailable.length==0){
        return next(new AppError("room not available",404))
    }
    res.status(200).json({
        status:'success',
        message:"room available"
    })
})
