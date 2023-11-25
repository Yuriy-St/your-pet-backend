const noticeController = require('../controllers/NoticeController');
const authenticate = require('../middleware/authenticate');
const filters = require('../middleware/filters');
const getImage = require('../middleware/getImage');
const paging = require('../middleware/paging');
const upload = require('../middleware/upload');
const validateBody = require('../middleware/validateBody');
const schemas = require('../schemas/noticeSchemas');

const router = require('express').Router();

// add notice
router.post(
  '/',
  authenticate,
  upload.single('image'),
  validateBody(schemas.addNoticeSchema),
  getImage,
  noticeController.add
);

// get the own notices list
router.get(
  '/query',
  authenticate,
  filters,
  paging,
  noticeController.getFilteredList
);

module.exports = router;
