const express = require('express');

const validateBody = require('../middleware/validateBody');
const schemas = require('../schemas/userSchemas');
const authController = require('../controllers/AuthController');
const authenticate = require('../middleware/authenticate');
const upload = require('../middleware/upload');
const passport = require('../middleware/passport');

const router = express.Router();

router.post(
  '/register',
  validateBody(schemas.registerSchema),
  authController.register
);
router.get('/google', passport.authenticate("google", { scope: ["email", "profile"] }))

router.get('/google/callback', passport.authenticate("google", {session:false}), authController.googleAuth)

router.post('/login', validateBody(schemas.loginSchema), authController.login);

router.post('/logout', authenticate, authController.logout);

router.get('/current', authenticate, authController.current);

router.patch(
  '/',
  authenticate,
  upload.single('avatar'),
  validateBody(schemas.updateSchema),
  authController.update
);

module.exports = router;
