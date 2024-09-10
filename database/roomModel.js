const mongoose=require("mongoose")
const roomSchema=new mongoose.Schema({
    roomNo:{
        type:Number,
        required:[true,"room number most be required."],
        unique:[true,"room number must be unique."]
    },
    roomType:{
        type:String,
        required:[true,"room type must be required."],
        enum:["executive suite","junior suite","single room"]
    },
    comfort:{
        type:String,
        default:"non-ac",
        enum:["ac","non-ac"]
    },
    price:{
        type:Number,
        required:[true,"price must be required."]
    },
    capacity:{
        type:Number,
        required:[true,"capacity must be required"],
        min: [1, 'Amount must be larger than or equal to 1'],
    },
    description:{
        type:String,
        default:"Hotel The Moon offers a celestial escape like no other. Our rooms are thoughtfully designed to immerse you in a dreamy atmosphere. From cozy single rooms with moonlit courtyard views to spacious suites adorned with constellations on the ceiling, each space is a sanctuary. Plush bedding, elegant furnishings, and modern amenities ensure a comfortable stay under the stars."
    }
})

const Room=mongoose.model("Room",roomSchema)
module.exports=Room;