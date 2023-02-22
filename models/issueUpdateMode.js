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
  updateImages: [
    {
        type: String
    }
  ]
});

const IssueUpdate = mongoose.model("IssueUpdate", issueUpdateSchema);

module.exports = IssueUpdate;
