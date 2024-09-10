const Food=require("../database/foodModel")
const catchAsync = require("../utility/catchAsync")
const multer=require("multer")
const sharp=require("sharp")
const Review=require("../database/reviewModel")

// multer configuration------------------------------

const multerstorage=multer.memoryStorage()
const multerfilter=(req,file,cb)=>{
  if(file.mimetype.startsWith("image")){
    cb(null,true)
  }else{
    cb(new AppError("not an image! please check.",400),false)
  }
}
const upload=multer({
    storage:multerstorage,
    fileFilter:multerfilter
  })
exports.foodPhoto=upload.array("photo")  


exports.processimg=catchAsync(async(req,res,next)=>{
    const images=req.files;
    console.log("this is processing");
    console.log(images);
    const photoName=[]
    for (let i = 0; i < images.length; i++) {
        const el = images[i];
        const name=`food-${i}-${Date.now()}.jpeg`
        await sharp(el.buffer)
            .resize(500,500)
            .toFormat("jpeg")
            .jpeg({quality:90}).toFile(`./public/image/upload/${name}`)
        console.log("phote created",i);
        photoName.push(name)
    }
    req.body.photo=photoName
    next()
  })
  


// create food------------------------------------------------------------------
exports.createFood=catchAsync(async(req,res,next)=>{
    const food=await Food.create(req.body)
    console.log(food);
    res.status(201).json({
        status:"success",
        message:"item create successful",
        food
    })
})


// get all foods------------------------------------------------------------------
exports.getAllFood=catchAsync(async(req,res,next)=>{
    const foods=await Food.find()
    const number=foods.length
    res.status(200).render("foods",{foods,number})
})


// get one food---------------------------------------------------------
exports.getOneFood=catchAsync(async(req,res,next)=>{
    const foodId=req.params.foodId
    const food=await Food.findById(foodId).populate("reviews")
    const foods=await Food.find({catagory:food.catagory})
    res.status(200).render("foodItem",{food,foods})
})

// update food------------------------------------------------------------------
exports.updateFood=catchAsync(async(req,res,next)=>{
    const foodId=req.params.foodId
    const food=await Food.findByIdAndUpdate(foodId,req.body)
    console.log("this is update");
    res.status(200).json({
        status:"success",
        message:"food update successful",
        food
    })
})


// delete food----------------------------------------------------------------
exports.deleteFood=catchAsync(async(req,res,next)=>{
    const foodId=req.params.foodId
    await Food.findByIdAndDelete(foodId)

    res.status(200).json({
        status:"success",
        message:'food has been deleted'
    })
})


// review-controller-------------------------------------------
exports.createReview=catchAsync(async(req,res,next)=>{
    if(!req.body.user) req.body.user=req.user.id;
    if(!req.body.food) req.body.food=req.params.foodId
    console.log(req.user);
    const review= await Review.create(req.body)

    res.status(201).json({
        status:"success",
        message:"review post successfully",
        review
    })
})
exports.editReview=catchAsync(async(req,res,next)=>{
    const id=req.params.id
    const review= await Review.findByIdAndUpdate(id,req.body)

    res.status(201).json({
        status:"success",
        message:"review update successfully",
        review
    })
})