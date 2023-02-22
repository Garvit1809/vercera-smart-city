const mongoose = require("mongoose");

const issueUpdateSchema = new mongoose.Schema({
  updatedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "Helper",
  },
  updateContent: {
    type: String,
    required: [true, 'Update content is required!!']
  },
  updateImages:
  {
    type: String
  }
}, {
  timestamps: true
});

issueUpdateSchema.pre(/^find/, function (next) {
  this.populate({
    path: "updatedBy",
    select: "name photo",
  })
  next();
});

const IssueUpdate = mongoose.model("IssueUpdate", issueUpdateSchema);

module.exports = IssueUpdate;
