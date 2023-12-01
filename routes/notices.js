const noticeController = require('../controllers/NoticeController');
const authenticate = require('../middleware/authenticate');
const filters = require('../middleware/filters');
const getImage = require('../middleware/getImage');
const isValidId = require('../middleware/isValidId');
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

// add to favorites
router.post(
  '/favorites/:id',
  authenticate,
  isValidId,
  noticeController.toggleFavorites
);

// get favorites
router.get('/favorite', authenticate, paging, noticeController.findFavorites);

// remove a notice
router.delete('/:id', authenticate, isValidId, noticeController.remove);

// get the own notices list
router.get('/own', authenticate, paging, noticeController.findAllOwn);

// get the notices list by category
router.get('/:category', paging, noticeController.findByCategory);

// find a notice
router.get('/id/:id', isValidId, noticeController.findById);

module.exports = router;
