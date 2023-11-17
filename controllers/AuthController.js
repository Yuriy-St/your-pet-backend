const asyncHandler = require('../helpers/asyncHandler');
const AuthService = require('../services/AuthService');
const gravatar = require('gravatar');
const fs = require('fs/promises');
const path = require('path');
const HttpError = require('../helpers/HttpError');

const { BASE_URL } = process.env;

class AuthController {
  avatarsDir = path.join(__dirname, '..', 'public', 'avatars');

  register = asyncHandler(async (req, res) => {
    const { name, email, avatarURL } = await AuthService.register({
      ...req.body,
      avatarURL: gravatar.url(req.body.email),
    });

    res.status(201).json({
      code: 201,
      message:
        'User registered successfully.',
      data: { name, email, avatarURL },
    });
  });

  login = asyncHandler(async (req, res) => {
    const { token } = await AuthService.login(req.body);

    res.status(200).json({
      code: 200,
      message: 'User logged in successfully',
      token,
    });
  });

  logout = asyncHandler(async (req, res) => {
    await AuthService.logout(req.user);
    res.status(200).json({
      code: 200,
      message: 'User logged out successfully',
    });
  });

}

module.exports = new AuthController();
