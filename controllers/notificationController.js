const Notification = require("../models/notificationModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.getAllNotifications = catchAsync(async (req,res,next) => {
    const notifications = await Notification.find();

    res.status(200).json({
        status: 'success',
        notifications
    })
});

exports.protectNotification = catchAsync(async (req, res, next) => {
    const helperId = req.helper.id;
  
    if (helperId) {
      next();
    } else return next(new AppError("Notifications can be given by only Helpers!!"));
  });

exports.createNotification = catchAsync(async(req,res,next) => {
    const helperId = req.helper.id;
    const { message } = req.body;

    if (!message) {
        return next(new AppError('Message is required!!'))
    }

    const newNotification = await Notification.create({
        notifiedBy: helperId,
        message
    });

    if (!newNotification) {
        return next(new AppError('couldnt create notification!!'))
    }

    res.status(200).json({
        status: 'success',
        newNotification
    })
})