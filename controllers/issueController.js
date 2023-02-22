// create issue
// get all issues --> for dev
// get approved issues
// get completed issues
// get unapproved issues

// update issues
// protect issue

const Issue = require("../models/issueModel");
const IssueUpdate = require("../models/issueUpdateModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.getAllIssues = catchAsync(async (req, res, next) => {
  const allIssues = Issue.find();

  res.status(200).json({
    status: "success",
    allIssues,
  });
});

exports.createIssue = catchAsync(async (req, res, next) => {
  const {
    issueContent,
    issuePics,
    locationAddressFirstLine,
    locationAddressSecondLine,
    locationCity,
    postalCode,
  } = req.body;

  const issueRaisedBy = req.user.id;

  const newIssue = await Issue.create({
    issueContent,
    issuePics,
    locationAddressFirstLine,
    locationAddressSecondLine,
    locationCity,
    postalCode,
    issueRaisedBy,
  });

  if (!newIssue) {
    return next(new AppError("Issue couldnt be created, Try Again!!"));
  }

  res.status(201).json({
    status: "success",
    newIssue,
  });
});

let issues = [];

const issueError = () => {
  if (!issues) {
    return next(new AppError("Try Again!!!"));
  }
};

exports.getIssuesForFilter = catchAsync(async (req, res, next) => {
  issues = await Issue.find();
  next();
});

exports.getUnapprovedIssues = catchAsync(async (req, res, next) => {
  issueError();

  issues.filter((issue) => {
    !issue.isIssueApproved && issue.issueApprovedBy.length === 0;
  });

  res.status(200).json({
    sttaus: "success",
    issues,
  });
});

exports.getApprovedIssues = catchAsync(async (req, res, next) => {
  issueError();

  issues.filter((issue) => {
    issue.isIssueApproved &&
      issue.issueApprovedBy.length > 0 &&
      !issue.isIssueResolved;
  });

  res.status(20).json({
    status: "success",
    issues,
  });
});

exports.getResolvedIssues = catchAsync(async (req, res, next) => {
  issueError();

  issues.filter((issue) => {
    issue.isIssueApproved &&
      issue.issueApprovedBy.length > 0 &&
      issue.isIssueResolved;
  });

  res.status(20).json({
    status: "success",
    issues,
  });
});

exports.protectIssue = catchAsync(async (req, res, next) => {
  const helperId = req.helper.id;

  if (helperId) {
    next();
  } else return next(new AppError("Updates can be given by only Helpers!!"));
});

exports.updateIssue = catchAsync(async (req, res, next) => {
  const helperId = req.helper.id;
  const issueId = req.params.issueId;

  const { updateContent, updateImages } = req.body;

  const update = await IssueUpdate.create({
    updatedBy: helperId,
    updateContent,
    updateImages,
  });

  if (!update) {
    return next(new AppError("Unable to update the issue!!"));
  }

  const updatedIssue = await Issue.findByIdAndUpdate(
    issueId,
    {
      $push: { issueUpdates: update.id },
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updatedIssue) {
    return next(new AppError('Update couldnt be added!!'));
  }

  res.status(201).json({
    status: 'success',
    update,
    updatedIssue
  })
});
