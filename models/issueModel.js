const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema({
  issueContent: {
    type: String,
    required: [true, "You must tll us something about the issue"],
  },
  issuePics: {
    type: String,
    required: [true, "You must show some pics for the issue to be worked on!!"],
  },
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
  isIssueResolved: {
    type: Boolean,
    default: false
  },
  isIssueApproved: {
    type: Boolean,
    default: false
  },
  issueApprovedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "Helper",
    default: null
  },
  issueClosedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "Helper",
    default: null
  },
  issueUpdates: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'IssueUpdate'
    }
  ],
  comments: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Comment'
    }
  ]
});

issueSchema.pre(/^find/, function (next) {
  this.populate({
    path: "issueRaisedBy",
    select: "name photo",
  }).populate({
    path: "issueApprovedBy",
    select: "name photo",
  }).populate({
    path: 'issueClosedBy',
    select: 'name photo'
  })
  next();
});

const Issue = mongoose.model("Issue", issueSchema);

module.exports = Issue;
