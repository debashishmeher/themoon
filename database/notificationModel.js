const mongoose=require("mongoose");
const validator = require("validator");


const notificationSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId,
    },
    notification:{
        type:Object,
        required:[true,"notification subscription needed.."]
    },
   role: {
    type: String,
    enum: ["admin", "co-admin", "user"],
    // default: "user",
  },
})

const Notification=mongoose.model("Notification",notificationSchema)
module.exports=Notification