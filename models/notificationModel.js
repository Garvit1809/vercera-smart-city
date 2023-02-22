const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
    notifiedBy: {
        type: mongoose.Schema.ObjectId,
        ref: "Helper",
    },
    message: {
        type: String,
        required: [true, 'notification is required!!']
    }
}, {
    timestamps: true
});

notificationSchema.pre(/^find/, function (next) {
    this.populate({
      path: "notifiedBy",
      select: "name",
    })
    next();
  });

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
