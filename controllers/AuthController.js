const asyncHandler = require('../helpers/asyncHandler');
const AuthService = require('../services/AuthService');
const fileController = require('./FileController');

class AuthController {
  register = asyncHandler(async (req, res) => {
    const { name, email, birthday, phone, city, avatarURL } =
      await AuthService.register({
        ...req.body,
        avatarURL: process.env.AVATAR_DEFAULT_URL,
      });
    const { token } = await AuthService.login(req.body);

    res.status(201).json({
      code: 201,
      message: 'User registered successfully.',
      data: {
        user: { name, email, birthday, phone, city, avatarURL },
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
    // const { name, email, birthday, phone, city, avatarURL } =
    //   await AuthService.update(req.user._id, req.body);
    // res.status(200).json({
    //   code: 200,
    //   message: 'User updated successfully',
    //   data: { name, email, birthday, phone, city, avatarURL },
    // });
    res.status(500).json({
      code: 500,
      message: 'User update under consturction',
    });
  });

  updateAvatar = asyncHandler(async (req, res) => {
    // const { _id } = req.user;
    // const { path: tmpPath, originalname } = req.file;
    // const filename = `${_id}_${originalname}`;

    // const avatarURL = fileController();
    // await AuthService.update(_id, { avatarURL });

    // res.status(200).json({
    //   code: 200,
    //   message: 'User avatar updated successfully',
    //   data: { avatarURL },
    // });

    res.status(500).json({
      code: 500,
      message: 'User avatar update under consturction',
    });
  });
}

module.exports = new AuthController();
