const asyncHandler = require('../helpers/asyncHandler');
const AuthService = require('../services/AuthService');
const fileController = require('./FileController');

class AuthController {
  register = asyncHandler(async (req, res) => {
    const { name, email, birthday, phone, city, avatarURL } =
      await AuthService.register({
        ...req.body,
        avatarURL: process.env.AVATAR_DEFAULT_URL,
        avatarId: `${req.body.name}_${Date.now()}`,
      });
    const { token } = await AuthService.login(req.body);

    res.status(201).json({
      code: 201,
      message: 'User registered successfully.',
      data: {
        user: { name, email, avatarURL },
        token,
      },
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

  current = asyncHandler((req, res) => {
    const { name, email, birthday, phone, city, avatarURL } = req.user;
    res.status(200).json({
      code: 200,
      message: 'OK',
      data: { name, email, birthday, phone, city, avatarURL },
    });
  });

  update = asyncHandler(async (req, res) => {
    const { user, body, file } = req;
    if (file?.path) {
      const { secure_url, public_id } = await fileController.upload(
        file.path,
        null,
        user.avatarId
      );
      body.avatarURL = secure_url;
      body.avatarId = public_id;
    }

    let { name, email, birthday, phone, city, avatarURL } =
      await AuthService.update(user._id, body);

    res.status(200).json({
      code: 200,
      message: 'User updated successfully',
      data: { name, email, birthday, phone, city, avatarURL },
    });
  });
}

const authController = new AuthController();
module.exports = authController;
