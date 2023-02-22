const Issue = require("../models/issueModel");
const IssueUpdate = require("../models/issueUpdateModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.getAllIssues = catchAsync(async (req, res, next) => {
  const allIssues = await Issue.find();

  res.status(200).json({
    status: "success",
    totalIssues: allIssues.length,
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

exports.getUnapprovedIssues = catchAsync(async (req, res, next) => {
  console.log('unapproved');
  const issues = await Issue.find().populate('comments');

  if (!issues) {
    return next(new AppError("Try Again!!!"));
  }

  // const unapprovedIssues = issues.filter((issue) => {
  //   !issue.isIssueApproved;
  //   console.log(issue.isIssueApproved);
  //   console.log(issue.postalCode);
  // });

  let unapprovedIssues = [];

  issues.forEach(issue => {
    if (!issue.isIssueApproved) {
      unapprovedIssues.push(issue)
    }
  });

  console.log(unapprovedIssues);

  res.status(200).json({
    status: "success",
    totalIssues: unapprovedIssues.length,
    unapprovedIssues,
  });
});

exports.getApprovedIssues = catchAsync(async (req, res, next) => {
  console.log('approved');
  const issues = await Issue.find().populate('comments');

  if (!issues) {
    return next(new AppError("Try Again!!!"));
  }

  // const approvedIssues = issues.filter((issue) => {
  //   issue.isIssueApproved && !issue.isIssueResolved;
  // });

  let approvedIssues = [];

  issues.forEach(issue => {
    if (issue.isIssueApproved && !issue.isIssueResolved) {
      approvedIssues.push(issue)
    }
  });

  res.status(200).json({
    status: "success",
    totalIssues: approvedIssues.length,
    approvedIssues,
  });
});

exports.getResolvedIssues = catchAsync(async (req, res, next) => {
  console.log('resolved');
  const issues = await Issue.find().populate('comments');

  if (!issues) {
    return next(new AppError("Try Again!!!"));
  }

  // let resolvedIssues = issues.filter((issue) => {
  //   issue.isIssueApproved && issue.isIssueResolved;
  // });

  let resolvedIssues = [];

  issues.forEach(issue => {
    if (issue.isIssueApproved && issue.isIssueResolved) {
      resolvedIssues.push(issue)
    }
  });

  res.status(200).json({
    status: "success",
    totalIssues: resolvedIssues.length,
    resolvedIssues,
  });
});

exports.protectIssue = catchAsync(async (req, res, next) => {
  const helperId = req.helper.id;

  if (helperId) {
    next();
  } else return next(new AppError("Updates can be given by only Helpers!!"));
});

exports.getOneIssue = catchAsync(async (req,res,next) => {
  const issueId = req.params.issueId;

  const issue = await Issue.findById(issueId).populate('comments');

  if (!issue) {
    return next(new AppError('No such issue exist!!'))
  }

  res.status(200).json({
    status: 'success',
    issue
  })
})

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
