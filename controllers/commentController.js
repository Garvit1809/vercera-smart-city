const Comment = require("../models/commentModel");
const Issue = require("../models/issueModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.postComment = catchAsync(async (req, res, next) => {
    const issueId = req.params.id;
    const userId = req.user.id;
    const { comment } = req.body;

    if (!comment) {
        return next(new AppError('Please specify your comment message!!'))
    }

    const newComment = await Comment.create({
        commentedBy: userId,
        comment
    })

    if (!newComment) {
        return next(new AppError('Comment couldnt be created'))
    }

    const updateIssue = await Issue.findByIdAndUpdate(issueId, {
        $push: { comments: newComment }
    }, {
        new: true,
        runValidators: true,
    });

    if (!updateIssue) {
        return next(new AppError('couldnt update issue'));
    }

    res.status(201).json({
        status: 'success',
        newComment,
        updateIssue
    })
})