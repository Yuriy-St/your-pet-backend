const path = require('path');
const asyncHandler = require('../helpers/asyncHandler');
const AuthService = require('../services/AuthService');
const fileController = require('./FileController');
const parse = require('date-fns/parse');

class AuthController {
  register = asyncHandler(async (req, res) => {
    await AuthService.register({
      ...req.body,
      avatarURL: process.env.AVATAR_DEFAULT_URL,
      avatarId: `${req.body.name}_${Date.now()}`,
    });
    const user = await AuthService.login(req.body);

    res.status(201).json({
      code: 201,
      message: 'User registered successfully.',
      data: {
        user: {
          name: user.name,
          email: user.email,
          birthday: user.birthday || '',
          phone: user.phone || '',
          city: user.city,
          avatarURL: user.avatarURL,
        },
        token: user.token,
      },
    });
  });

  login = asyncHandler(async (req, res) => {
    const user = await AuthService.login(req.body);

    res.status(200).json({
      code: 200,
      message: 'User logged in successfully',
      data: {
        user: {
          name: user.name,
          email: user.email,
          birthday: user.birthday || '',
          phone: user.phone || '',
          city: user.city,
          avatarURL: user.avatarURL,
        },
        token: user.token,
      },
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
    const { user } = req;
    res.status(200).json({
      code: 200,
      message: 'OK',
      data: {
        user: {
          name: user.name,
          email: user.email,
          birthday: user.birthday || '',
          phone: user.phone || '',
          city: user.city,
          avatarURL: user.avatarURL,
        },
      },
    });
  });

  update = asyncHandler(async (req, res) => {
    const { user, body, file } = req;
    if (body?.birthday) {
      body.birthday = parse(body.birthDate, 'dd-MM-yyyy', new Date());
    }
    if (file?.path) {
      const { secure_url, public_id } = await fileController.upload(
        file.path,
        'avatars',
        user.avatarId
      );
      body.avatarURL = secure_url;
      body.avatarId = public_id ? path.parse(public_id).name : null;
    }

    const updUser = await AuthService.update(user._id, body);

    res.status(200).json({
      code: 200,
      message: 'User updated successfully',
      data: {
        user: {
          name: updUser.name,
          email: updUser.email,
          birthday: updUser.birthday || '',
          phone: updUser.phone || '',
          city: updUser.city,
          avatarURL: updUser.avatarURL,
        },
      },
    });
  });

  // add a notice to the favorite list
  addFavorite(owner, noticeId) {}

  // get the favorite list
  getFavorites() {}

  // remove a notice from the favorite list
  removeFavorite(owner, noticeId) {}
}

const authController = new AuthController();
module.exports = authController;
