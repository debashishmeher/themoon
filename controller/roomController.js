const Room=require("../database/roomModel")
const RoomBooking=require("../database/roomBookingModel")
const catchAsync = require("../utility/catchAsync")

exports.createRoom=catchAsync(async(req,res,next)=>{
    const room=await Room.create(req.body)

    res.status(201).json({
        status:"success",
        message:`Room No. ${room.roomNo} created`,
        room
    })
})
exports.getAllRooms=catchAsync(async(req,res,next)=>{
    const rooms=await Room.find();

    res.status(200).render("adminRoomMain",{rooms})
})
exports.getOneRoom=catchAsync(async(req,res,next)=>{
    const roomId=req.params.roomId
    const room=await Room.findById(roomId);

    res.status(200).json({
        status:"success",
        message:"room find",
        room
    })
})
exports.updateOneRoom=catchAsync(async(req,res,next)=>{
    const roomId=req.params.roomId
    const room=await Room.findByIdAndUpdate(roomId,req.body);

    res.status(200).json({
        status:"success",
        message:"room find",
        room
    })
})
exports.deleteOneRoom=catchAsync(async(req,res,next)=>{
    const roomId=req.params.roomId
    const room=await Room.findByIdAndDelete(roomId);

    res.status(200).json({
        status:"success",
        message:"room find",
        room
    })
})

