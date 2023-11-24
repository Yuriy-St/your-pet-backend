const router = require('express').Router();
const { getAllNews } = require('../controllers/NewsController');

router.get('/', getAllNews);

module.exports = router;
