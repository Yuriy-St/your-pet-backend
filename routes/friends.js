const express = require('express');
const router = express.Router();
const friendController = require('../controllers/FriendsController');
const filters = require('../middleware/filters');
const paging = require('../middleware/paging');

router.get('/', filters, paging, friendController.getAll);

module.exports = router;
