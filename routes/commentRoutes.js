const express = require('express');
const { protect } = require('../controllers/authController');
const commentController = require('../controllers/commentController');

const router = express.Router({ mergeParams: true });

router.post('/', protect, commentController.postComment);

module.exports = router;
