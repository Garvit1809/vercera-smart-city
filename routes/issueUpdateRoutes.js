const express = require('express');
const authController = require('../controllers/authController');
const issueController = require('../controllers/issueController');


const router = express.Router({ mergeParams: true });

router.use(authController.protect);
router.use(issueController.protectIssue);

router.patch('/', issueController.updateIssue);

module.exports = router;
