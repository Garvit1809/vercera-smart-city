const mongoose = require("mongoose");

const helperDraftSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  socialWorkDone: [
    {
        type: String,
        required: [true, 'Tell us what good things u have done for society!!']
    }
  ],
  reason: {
    type: String,
    required: [true, 'Reason for becoming a helper!!']
  },
  alternatePhoneNumber: {
    type: String,
    required: [true, "Provide an additional contact number"],
  },
});

const HelperDraft = mongoose.model("HelperDraft", helperDraftSchema);

module.exports = HelperDraft;
