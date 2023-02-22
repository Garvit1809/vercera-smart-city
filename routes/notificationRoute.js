const express = require('express');
const { protect } = require('../controllers/authController');
const notificationController = require('../controllers/notificationController');

const router = express.Router();

router.get('/', notificationController.getAllNotifications)
router.post('/', protect, notificationController.protectNotification, notificationController.createNotification)

module.exports = router;
