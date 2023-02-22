const express = require('express');

const authController = require('../controllers/authController');
const userController = require('../controllers/userController');


const router = express.Router();

router.use(authController.protect);

router.get('/allusers', userController.getAllUsers)
router.get('/me', userController.getMe, userController.getUser);
router.get('/alldrafts', userController.getAllDrafts);
router.post('/helper', userController.helperProposal);

router.get('/:id', userController.getUser);

module.exports = router;
