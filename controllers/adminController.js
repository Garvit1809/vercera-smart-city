const HelperDraft = require("../models/helperDraft");
const Helper = require("../models/helperModel");
const User = require("../models/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.createHelper = catchAsync(async (req,res,next) => {

    // console.log('helper helper');
    const { draftID } = req.body;

    const helperDraft = await HelperDraft.findById(draftID);

    // console.log(helperDraft);

    if (!helperDraft) {
        return next(new AppError('Couldnt find the helperDraft!!'))
    }

    const userId = helperDraft.user;

    const user = await User.findById(userId);

    // console.log(user);

    if (!user) {
        return next(new AppError('Couldnt find the user!!'))
    }

    const newHelper = await Helper.create({
        name: user.name,
        email: user.email,
        photo: user.photo,
        password: user.password,
        phoneNumber: user.phoneNumber,
        alternatePhoneNumber: helperDraft.alternatePhoneNumber,
        aadhaarCardNumber: user.aadhaarCardNumber,
    })

    if (!newHelper) {
        return next(new AppError('Couldnt create the helper!!'))
    }

    const deleteUser = await User.findByIdAndDelete(userId);

    res.status(200).json({
        status: 'success',
        newHelper,
        deleteUser
    })
});