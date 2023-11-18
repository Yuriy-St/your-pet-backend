const express = require('express');

const validateBody = require('../middleware/validateBody');
const schemas = require('../schemas/petSchemas');
const petsController = require('../controllers/PetsController');
const authenticate = require('../middleware/authenticate');
const upload = require('../middleware/upload');

const router = express.Router();

router.post('/add-pet', authenticate, validateBody(schemas.addPepSchema), petsController.addPet);
router.post('/del-pet/:name', authenticate, petsController.delPet);
router.patch(
    '/pet-photo/:name',
    authenticate,
    upload.single('petPhoto'),
    petsController.updatePetPhoto
  );

module.exports = router;
