const express = require('express');

const authController = require('../controllers/authController');
const userController = require('../controllers/userController');


const router = express.Router();

router.use(authController.protect);

// for dev
router.get('/allusers', userController.getAllUsers)

router.get('/me', userController.getMe, userController.getUser);
router.get('/:id', userController.getUser);
router.post('/helper', userController.helperProposal);

module.exports = router;
