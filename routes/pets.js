const express = require('express');

const validateBody = require('../middleware/validateBody');
const schemas = require('../schemas/petSchemas');
const petController = require('../controllers/PetController');
const authenticate = require('../middleware/authenticate');
const upload = require('../middleware/upload');
const getImage = require('../middleware/getImage');
const paging = require('../middleware/paging');
const filters = require('../middleware/filters');

const router = express.Router();

// add a pet
router.post(
  '/',
  authenticate,
  upload.single('image'),
  validateBody(schemas.addPetSchema),
  getImage,
  petController.add
);

// remove a pet
router.delete('/:id', authenticate, petController.remove);

// get the all pet list
router.get('/', authenticate, filters, paging, petController.findAll);

// get the all own pet list
router.get('/own', authenticate, paging, petController.findAllOwn);

// get the a single pet
router.get('/:id', authenticate, petController.getOne);

// update a pet
router.patch(
  '/:id',
  authenticate,
  upload.single('image'),
  validateBody(schemas.updatePetSchema),
  getImage,
  petController.update
);

module.exports = router;
