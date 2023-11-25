const express = require('express');

const validateBody = require('../middleware/validateBody');
const schemas = require('../schemas/userSchemas');
const authController = require('../controllers/AuthController');
const authenticate = require('../middleware/authenticate');
const upload = require('../middleware/upload');

const router = express.Router();

router.post(
  '/register',
  validateBody(schemas.registerSchema),
  authController.register
);

router.post('/login', validateBody(schemas.loginSchema), authController.login);

router.post('/logout', authenticate, authController.logout);

router.get('/current', authenticate, authController.current);

router.post('/refresh', validateBody(schemas.refreshSchema), authController.refresh);

router.patch(
  '/',
  authenticate,
  validateBody(schemas.updateSchema),
  upload.single('avatar'),
  authController.update
);

module.exports = router;
