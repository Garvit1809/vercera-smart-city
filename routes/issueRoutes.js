const express = require('express');

const authController = require('../controllers/authController');
const issueController = require('../controllers/issueController');
const issueUpdateRouter = require('./issueUpdateRoutes')

const router = express.Router();

router.use("/:issueId", issueUpdateRouter);

router.get('/', issueController.getAllIssues);
router.post('/', authController.protect, issueController.createIssue);

router.use(issueController.getIssuesForFilter);

router.get('/unapproved', issueController.getUnapprovedIssues);
router.get('/approved', issueController.getApprovedIssues);
router.get('/completed', issueController.getResolvedIssues);

module.exports = router;
