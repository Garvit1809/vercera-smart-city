const express = require('express');

const authController = require('../controllers/authController');
const issueController = require('../controllers/issueController');
const helperController = require('../controllers/helperController');
const commentRouter = require('./commentRoutes')

const router = express.Router();

router.use("/:id/comment", commentRouter);

router.get('/', issueController.getAllIssues);
router.post('/', authController.protect, issueController.createIssue);

router.get('/unapproved', issueController.getUnapprovedIssues);
router.get('/approved', issueController.getApprovedIssues);
router.get('/completed', issueController.getResolvedIssues);

router.get('/:issueId', issueController.getOneIssue);
router.patch('/:issueId', authController.protect, issueController.protectIssue, issueController.updateIssue)

router.patch('/:issueId/approve', authController.protect, issueController.protectIssue, helperController.approveIssue);
router.patch('/:issueId/close', authController.protect, issueController.protectIssue, helperController.closeIssue);

module.exports = router;
