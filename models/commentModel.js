const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    commentedBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    comment: {
        type: String,
        required: [true, 'should specify comment!!']
    }
}, {
    timestamps: true
});

CommentSchema.pre(/^find/, function (next) {
    this.populate({
        path: "commentedBy",
        select: "name photo",
    })
    next();
});

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
