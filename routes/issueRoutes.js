const express = require('express');

const authController = require('../controllers/authController');
const issueController = require('../controllers/issueController');

const router = express.Router();

router.use(authController.protect);

router.get('/', issueController.getAllIssues);
router.post('/', issueController.createIssue);

router.use(issueController.getIssuesForFilter);

router.get('/unapproved', issueController.getUnapprovedIssues);
router.get('/approved', issueController.getApprovedIssues);
router.get('/completed', issueController.getResolvedIssues);

module.exports = router;
