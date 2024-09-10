const express = require("express");
const app = express();
const path = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: path.join(__dirname, "../config.env") });

// mongodb files require
import("../database/connection.js");

// REQUIREING module
const globalErrorHandelling = require("../controller/globalErrorHandeling.js");
const AppError = require("../utility/AppError.js");
const cookieParser = require("cookie-parser");
const webPush = require("web-push");
const bodyParser = require("body-parser");
const pug = require("pug");

// middleware
const userRouter = require("../router/userRouter.js");
const roomRouter = require("../router/roomRouter.js");
const roomBookingRouter = require("../router/roomBookingRouter.js");
const viewRouter = require("../router/viewRouter.js");
const adminRouter = require("../router/adminRouter.js");
const foodRouter = require("../router/foodRouter.js");
const foodOrderRouter = require("../router/foodOrderRouter.js");
const cartRouter = require("../router/cartRouter.js");
const Notification = require("../database/notificationModel.js");
const catchAsync = require("../utility/catchAsync.js");

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// set view engine
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "../views"));

// render static file
app.use("/", viewRouter);
const staticpath = path.join(__dirname, "../public");
app.use(express.static(staticpath));

// router
app.use("/", userRouter);
app.use("/admin", adminRouter);
app.use("/admin/room", roomRouter);
app.use("/roomBooking", roomBookingRouter);
app.use("/food", foodRouter);
app.use("/foodOrder", foodOrderRouter);
app.use("/cart", cartRouter);

// push notification............

// const vapidKeys = webPush.generateVAPIDKeys();

const publicVapidKey =
  "BGx8a9-bGaQeKUuW-lsQb3LGIIH1OL9w9eq-ERdK7HrtIHbAmcn2yBxO32E8d8KaqrAYA3BXgMXSDXaGJzxzays";
const privateVapidKey = "wd3-Y8CYkztOMMlithbRR7DFq-2_U1A2vHELx2BhbWA";

webPush.setVapidDetails(
  "mailto:debashishmeher955@gmail.com",
  publicVapidKey,
  privateVapidKey
);

// ?routes
app.post(
  "/subscribe",
  catchAsync(async (req, res) => {
    const suscription = req.body;
    let user;
    if (res.locals.user) {
      user = res.locals.user;  
    }
    const match = await Notification.find({ notification: suscription });
    if (match.length > 0) {
      return next(new AppError("notification already exist", 404));
    }
    const notifications = new Notification({
      user: user.id,
      notification: suscription,
      role:user.role
    });
    await notifications.save();

    res.status(201).json({
      status: "success",
      message: "sending notification",
    });

    const payload = JSON.stringify({
      title: "push testing",
      url: "google.com",
    });

    webPush.sendNotification(suscription, payload).catch((err) => {});
  })
);

app.all("*", (req, res, next) => {
  return next(new AppError(`${req.originalUrl} not found on the server`, 404));
});

app.use(globalErrorHandelling);

app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`server listening at port no ${process.env.PORT}`);
});
