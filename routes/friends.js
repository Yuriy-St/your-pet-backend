const express = require('express');
const router = express.Router();
const friendController = require('../controllers/FriendsController');
friendController;

router.get('/', friendController.getAll);

module.exports = router;
