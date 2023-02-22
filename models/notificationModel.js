const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
    notifiedBy: {
        type: mongoose.Schema.ObjectId,
        ref: "Helper",
    },
    notification: {
        type: String,
        required: [true, 'notification is required!!']
    }
}, {
    timestamps: true
});

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
