const express = require('express');
const router = express.Router();
const friendController = require('../controllers/FriendsController');
const paging = require('../middleware/paging');

router.get('/', paging, friendController.getAll);

module.exports = router;
