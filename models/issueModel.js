const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema({
  issueContent: {
    type: String,
    required: [true, "You must tll us something about the issue"],
  },
  issuePics: [
    {
      type: String,
      required: [
        true,
        "You must show some pics for the issue to be worked on!!",
      ],
    },
  ],
  locationAddressFirstLine: {
    type: String,
    required: [true, "You must specify the location of the issue!!"],
  },
  locationAddressSecondLine: {
    type: String,
    required: [true, "You must specify the location of the issue!!"],
  },
  locationCity: {
    type: String,
    required: [true, "You must specify the city!!"],
  },
  postalCode: {
    type: String,
    required: [true, "Sopecify the postal code where the issue!!"],
  },
  issueRaisedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  issueApprovedBy: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Helper",
    },
  ],
  issueClosedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "Helper",
  },
});

const Issue = mongoose.model("Issue", issueSchema);

module.exports = Issue;
