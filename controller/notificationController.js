const Notification=require('../database/notificationModel')
const catchAsync = require('../utility/catchAsync')
const webPush=require('web-push')

exports.sendtoadmin=catchAsync(async(req,res,next)=>{
    const adminroot=await Notification.find({role:"admin"})
    for (let i = 0; i < adminroot.length; i++) {
        const el = adminroot[i];
        el.notification
        const payload = JSON.stringify({
            title: "push testing",
            url: "admin/order",
          });
      
          webPush.sendNotification(el.notification, payload).catch((err) => {
            console.log(err);
            
          });
    }
    next()
})