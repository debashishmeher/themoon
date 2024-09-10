const mongoose = require("mongoose");
const validator = require("validator");

const roomBookingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name must be required."],
    },
    phone: {
      type: Number,
      required: [true, "phone no must be required"],
      validate: {
        validator: function (val) {
          return val.toString().length === 10;
        },
        message: (val) => `${val.value} has to be 10 digits`,
      },
    },
    adhar: {
      type: Number,
      validate: {
        validator: function (val) {
          return val.toString().length === 12;
        },
        message: (val) => `${val.value} has to be 12 digits`,
      },
    },
    email: {
      type: String,
      validate: [validator.isEmail, "please provide a valid email"],
    },

    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: [true, "room must be required."],
    },
    member:{
      type:Number,
      required: [true, "member must be required."],

    },
    amount: {
      type: Number,
      required: [true, "amount must be required."],
    },
    entryTime: {
      type: Date,
      default: Date.now(),
    },
    day: {
      type: Number,
      default: 1,
    },
    expireTime: {
      type: Date,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

roomBookingSchema.pre("save", function (next) {
  const entry = this.entryTime;
  const increase = this.day * (1000 * 60 * 60 * 24);
  this.expireTime = entry.getTime() + increase;
  next();
});

roomBookingSchema.pre(/^find/, function (next) {
  this.populate({
    path: "room",
  });
  next();
});

const RoomBooking = mongoose.model("RoomBooking", roomBookingSchema);

module.exports = RoomBooking;
