const express = require('express');

const validateBody = require('../middleware/validateBody');
const schemas = require('../schemas/petSchemas');
const petController = require('../controllers/PetController');
const authenticate = require('../middleware/authenticate');
const upload = require('../middleware/upload');
const getImage = require('../middleware/getImage');
const isPetUnique = require('../middleware/isPetUnique');

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

// get the a single pet
router.get('/:id', authenticate, petController.getOne);

// get the all pet list
router.get('/', authenticate, petController.findAll);

// update a pet
router.patch(
  '/:id',
  authenticate,
  upload.single('image'),
  getImage,
  validateBody(schemas.updatePetSchema),
  petController.update
);

module.exports = router;
