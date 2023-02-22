const Issue = require("../models/issueModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.approveIssue = catchAsync(async (req, res, next) => {
    const issueId = req.params.issueId;
    const helperId = req.helper.id;

    const issue = await Issue.findById(issueId);

    if (issue.isIssueApproved) {
        return next(new AppError('Issue has already been approved!!'))
    }

    const approvedIssue = await Issue.findByIdAndUpdate(issueId, {
        issueApprovedBy: helperId,
        isIssueApproved: true
    }, {
        new: true,
        runValidators: true,
    })

    if (!approvedIssue) {
        return next(new AppError('couldnt approve issue!!'))
    }

    res.status(201).json({
        status: 'success',
        approvedIssue
    })
});

exports.closeIssue = catchAsync(async (req, res, next) => {
    const issueId = req.params.issueId;
    const helperId = req.helper.id;

    const issue = await Issue.findById(issueId);

    if (!issue.isIssueApproved) {
        return next(new AppError('Issue has not been approved!!'))
    }

    if (issue.isIssueResolved) {
        return next(new AppError('Issue has already been closed!!'))
    }

    if (issue.issueUpdates.length === 0) {
        return next(new AppError('Give updates to close the issue'))
    }

    const closedIssue = await Issue.findByIdAndUpdate(issueId, {
        issueClosedBy: helperId,
        isIssueResolved: true
    }, {
        new: true,
        runValidators: true,
    })

    if (!closedIssue) {
        return next(new AppError('couldnt close issue!!'))
    }

    res.status(201).json({
        status: 'success',
        closedIssue
    })
});