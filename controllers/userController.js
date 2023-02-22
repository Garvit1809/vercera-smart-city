//  get my profile
// get user profile
// helper proposal

const HelperDraft = require("../models/helperDraft");
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");

exports.getMe = catchAsync(async (req, res, next) => {
    req.params.id = req.user.id;
    next();
  });

exports.getUser = catchAsync(async (req,res,next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new AppError("No user found with that ID", 404));
      }
  
      res.status(200).json({
        status: "success",
        user
      });
})

exports.getAllUsers = catchAsync(async (req,res,next) => {
    const users = await User.find();

    res.status(200).json({
        status: 'success',
        totalUsers: users.length,
        users
    })
})

exports.helperProposal = catchAsync(async (req,res,next) => {
    const { socialWorkDone, reason } = req.body;
    const userId = req.user.id;

    const helperDraft = await HelperDraft.create({
        user: userId,
        socialWorkDone,
        reason
    })

    res.statsus(201).json({
        status: 'success',
        helperDraft
    })
})