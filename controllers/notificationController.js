const Notification = require("../models/notificationModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.getAllNotifications = catchAsync(async (req,res,next) => {
    const notifications = await Notification.find();

    res.statsu(200).json({
        status: 'success',
        notifications
    })
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