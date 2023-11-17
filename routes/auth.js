const express = require('express');

const validateBody = require('../middleware/validateBody');
const schemas = require('../schemas/userSchemas');
const authController = require('../controllers/AuthController');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

router.post(
  '/register',
  validateBody(schemas.registerSchema),
  authController.register
);

router.post('/login', validateBody(schemas.loginSchema), authController.login);

router.post('/logout', authenticate, authController.logout);

module.exports = router;
