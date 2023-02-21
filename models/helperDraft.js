const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const helperDraftSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  socialWorkDone: [
    {
        typr: String,
        required: [true, 'Tell us what good things u have done for society!!']
    }
  ],
  reason: {
    type: String,
    required: [true, 'Reason for becoming a helper!!']
  },
});

const HelperDraft = mongoose.model("HelperDraft", helperDraftSchema);

module.exports = HelperDraft;
