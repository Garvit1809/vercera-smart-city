//  get my profile
// get user profile
// helper proposal

const HelperDraft = require("../models/helperDraft");
const Helper = require("../models/helperModel");
const User = require("../models/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.getMe = catchAsync(async (req, res, next) => {
    if (req.helper !== undefined) {
        req.params.id = req.helper.id
    } else {
        req.params.id = req.user.id;
    }
    next();
});

exports.getUser = catchAsync(async (req, res, next) => {

    console.log('get my proile');

    const helper = await Helper.findById(req.params.id);

    if (helper) {
        res.status(200).json({
            status: 'success',
            helper
        })
    } else {

        const user = await User.findById(req.params.id);

        if (!user) {
            return next(new AppError("No user found with that ID", 404));
        }

        res.status(200).json({
            status: "success",
            user
        });
    }
})

exports.getAllUsers = catchAsync(async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        status: 'success',
        totalUsers: users.length,
        users
    })
})

exports.helperProposal = catchAsync(async (req, res, next) => {
    const { socialWorkDone, reason, alternatePhoneNumber } = req.body;
    const userId = req.user.id;

    console.log("lolllll");

    const helperDraft = await HelperDraft.create({
        user: userId,
        socialWorkDone,
        reason,
        alternatePhoneNumber
    })

    if (!helperDraft) {
        return next(new AppError('Helper Draft couldnt be created'))
    }

    const draft = await HelperDraft.findById(helperDraft.id).populate('user')

    res.status(201).json({
        status: 'success',
        draft
    })
})

exports.getAllDrafts = catchAsync(async (req, res, next) => {
    console.log("jrenrvrenv");
    const drafts = await HelperDraft.find();

    res.status(200).json({
        status: 'success',
        drafts
    })
})