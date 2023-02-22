const HelperDraft = require("../models/helperDraft");
const Helper = require("../models/helperModel");
const User = require("../models/userModel");
const AppError = require("./appError");
const catchAsync = require("./catchAsync");

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });

  let draftID;
  
  readline.question('Enter Draft ID?', id => {
    console.log(`Entered Draft ID ${id}!`);
    draftID = id;
    readline.close();
  });

const createHelper = catchAsync(async (req,res,next) => {

    const helperDraft = await HelperDraft.findById(draftID);

    if (!helperDraft) {
        return next(new AppError('Couldnt find the helperDraft!!'))
    }

    const userId = helperDraft.user;

    const user = await User.findById(userId);

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

    console.log(newHelper);
});

createHelper();