const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
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
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords are not the same!",
    },
  },
  occupation: {
    type: String,
    required: [true, 'What u do for living!!']
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
  phoneNumber: {
    type: String,
    required: [true, "Please enter your contact number"],
    trim: true,
  },
  addharCardNumber: {
    type: String,
    required: [true, "You must enter your Aadhar card no.!!"],
  },
  aadharCard: {
    type: String,
    required: [true, "You must enter your Aadhar card no. for verification!!"],
  },
  isHelper: {
    type: Boolean,
    default: false,
  },
});

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
