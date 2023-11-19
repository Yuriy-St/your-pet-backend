const asyncHandler = require('../helpers/asyncHandler');
const AuthService = require('../services/AuthService');
const fs = require('fs/promises');
const path = require('path');

class AuthController {
  avatarsDir = path.join(__dirname, '..', 'public', 'avatars');

  register = asyncHandler(async (req, res) => {
    const { name, email, avatarURL } = await AuthService.register({
      ...req.body,
      avatarURL: "https://res.cloudinary.com/dfltmvg4t/image/upload/v1700298149/avatars/placeholder.jpg",
    });

    res.status(201).json({
      code: 201,
      message: 'User registered successfully.',
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

  current = asyncHandler((req, res) => {
    const { name, email, birthday, phone, city, avatarURL } = req.user;
    res.status(200).json({
      code: 200,
      message: 'OK',
      data: { name, email, birthday, phone, city, avatarURL },
    });
  });

  update = asyncHandler(async (req, res) => {
    const { name, email, birthday, phone, city, avatarURL } =
      await AuthService.update(req.user._id, req.body);
    res.status(200).json({
      code: 200,
      message: 'User updated successfully',
      data: { name, email, birthday, phone, city, avatarURL },
    });
  });

  updateAvatar = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { path: tempDir, originalname } = req.file;
    const filename = `${_id}_${originalname}`;
    const avatarPath = path.join(this.avatarsDir, filename);
    await fs.rename(tempDir, avatarPath);
    const avatarURL = path.join('avatars', filename);
    await AuthService.update(_id, { avatarURL });

    res.status(200).json({
      code: 200,
      message: 'User avatar updated successfully',
      data: { avatarURL },
    });
  });
}

module.exports = new AuthController();
