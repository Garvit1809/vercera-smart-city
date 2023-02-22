const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const helperSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell us your name!"],
    trim: true,
    max: [40, "kitna bda naame h be!!"],
    min: [2, "user name must be more than 2 characters"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  photo: String,
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 6,
    select: false,
  },
  addressFirstLine: {
    type: String,
    required: [true, "We need your address!!"],
    trim: true,
  },
  addressSecondLine: {
    type: String,
    required: [true, "We need your address!!"],
    trim: true,
  },
  postalCode: {
    type: String,
    required: [true, "you need to specify your postal code"],
    trim: true,
  },
  city: {
    typ: String,
    required: [true, 'City is requuired']
  },
  phoneNumber: {
    type: String,
    required: [true, "Please enter your contact number"],
    trim: true,
  },
  alternatePhoneNumber: {
    type: String,
    required: [true, "Provide an additional contact number"],
  },
  aadhaarCardNumber: {
    type: String,
    required: [true, "You must enter your Aadhar card no.!!"],
  },
  aadhaarCard: {
    type: String,
    required: [true, "You must enter your Aadhar card no. for verification!!"],
  },
  issuesApproved: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Issue",
    },
  ],
  issuesClosed: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Issue",
    },
  ],
});

helperSchema.methods.correctPassword = async function (
  candidatePassword,
  helperPassword
) {
  return await bcrypt.compare(candidatePassword, helperPassword);
};

const Helper = mongoose.model("Helper", helperSchema);

module.exports = Helper;
