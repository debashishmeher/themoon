const mongoose = require("mongoose");
const validator = require("validator");

const bookingSchema = new mongoose.Schema(
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

    email: {
      type: String,
      validate: [validator.isEmail, "please provide a valid email"],
    },
    member:{
      type:Number,
      required: [true, "member must be required."],

    },
    entryTime: {
      type: Date,
      default: Date.now(),
    },
    day: {
      type: Number,
      default: 1,
    },

  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);



const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
