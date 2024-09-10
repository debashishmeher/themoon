const mongoose=require("mongoose")

const foodSchma=new mongoose.Schema({
    name:{
        type:String,
        unique:[true,"item name must be unique"],
        required:[true,"item name must be required"]
    },
    photo:[],
    price:{
        type:Number,
        required:[true,"item price must be required"]
    },
    discount:{
        type:Number,
        min:0,
        max:100
    },
    catagory:{
        type:String,
        default:"food"
    },
    weight:{
        type:Number,
    },
    ingredients:[],
    calories:{
        type:Number
    },
    desc:{
        type:String,
        default:"Our Spaghetti Aglio e Olio is a timeless Italian favorite. Al dente spaghetti tossed in fragrant garlic-infused olive oil, red pepper flakes, and fresh parsley. Simple, flavorful, and oh-so-satisfying!"
    },
    rateing:{
        type:Number,
        min:1,
        max:5,
        default:1
    }
},{
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  })

  foodSchma.virtual("reviews", {
    ref: "Review",
    foreignField: "food",
    localField: "_id",
  });

const Food=mongoose.model("Food",foodSchma)
module.exports=Food;