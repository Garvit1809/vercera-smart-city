// create issue
// get all issues --> for dev
// get approved issues
// get completed issues
// get unapproved issues

// update issues
// protect issue

const Issue = require("../models/issueModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.getAllIssues = catchAsync(async (req,res,next) => {
    const allIssues = Issue.find();

    res.status(200).json({
        status: 'success',
        allIssues
    })
})

exports.createIssue = catchAsync(async (req, res, next) => {
    const {issueContent, issuePics, locationAddressFirstLine, locationAddressSecondLine, locationCity, postalCode} = req.body;

    const issueRaisedBy = req.user.id;

    const newIssue = await Issue.create({
        issueContent,
        issuePics,
        locationAddressFirstLine,
        locationAddressSecondLine,
        locationCity,
        postalCode,
        issueRaisedBy
    })

    if (!newIssue) {
        return next(new AppError('Issue couldnt be created, Try Again!!'))
    }

    res.status(201).json({
        status: 'success',
        newIssue
    })
})

let issues = [];

const issueError = () => {
    if (!issues) {
        return next(new AppError('Try Again!!!'))
    }
}

exports.getIssuesForFilter = catchAsync(async(req,res,next) => {
    issues = await Issue.find();
    next();
})

exports.getUnapprovedIssues = catchAsync(async (req, res, next) => {

    issueError();

    issues.filter(issue => {
        !issue.isIssueApproved && issue.issueApprovedBy.length === 0
    })

    res.status(200).json({
        sttaus: 'success',
        issues
    })
})

exports.getApprovedIssues = catchAsync(async (req, res, next) => {
    issueError();

    issues.filter(issue => {
        issue.isIssueApproved && issue.issueApprovedBy.length > 0 && !issue.isIssueResolved
    })

    res.status(20).json({
        status: 'success',
        issues
    })
})

exports.getResolvedIssues = catchAsync(async (req, res, next) => {
    issueError();

    issues.filter(issue => {
        issue.isIssueApproved && issue.issueApprovedBy.length > 0 && issue.isIssueResolved
    })

    res.status(20).json({
        status: 'success',
        issues
    })
});


