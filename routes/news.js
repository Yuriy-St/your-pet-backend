const router = require('express').Router();
const newsController = require('../controllers/NewsController');

router.get('/', newsController.getAllNews);

module.exports = router;
