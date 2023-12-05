const path = require("path");
const asyncHandler = require("../helpers/asyncHandler");
const AuthService = require("../services/AuthService");
const fileController = require("./FileController");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

class AuthController {
  responseUserSchema = (user) => ({
    _id: user._id,
    name: user.name,
    email: user.email,
    birthday: user.birthday || "",
    phone: user.phone || "",
    city: user.city,
    avatarURL: user.avatarURL,
  });

  register = asyncHandler(async (req, res) => {
    await AuthService.register({
      ...req.body,
      avatarURL: process.env.AVATAR_DEFAULT_URL,
      avatarId: `${req.body.name}_${Date.now()}`,
    });
    const user = (await AuthService.log) in req.body;

    res.status(201).json({
      code: 201,
      message: "User registered successfully.",
      data: {
        user: {
          name: user.name,
          email: user.email,
          birthday: user.birthday || "",
          phone: user.phone || "",
          city: user.city,
          avatarURL: user.avatarURL,
        },
        accessToken: user.accessToken,
        refreshToken: user.refreshToken,
      },
    });
  });

  login = asyncHandler(async (req, res) => {
    const user = await AuthService.login(req.body);

    res.status(200).json({
      code: 200,
      message: "User logged in successfully",
      data: {
        user: {
          name: user.name,
          email: user.email,
          birthday: user.birthday || "",
          phone: user.phone || "",
          city: user.city,
          avatarURL: user.avatarURL,
        },
        accessToken: user.accessToken,
        refreshToken: user.refreshToken,
      },
    });
  });

  refresh = asyncHandler(async (req, res) => {
    const { accessToken, refreshToken } = await AuthService.refresh(req.body);
    res.status(200).json({
      code: 200,
      message: "Access token refresh successfully",
      data: {
        accessToken,
        refreshToken,
      },
    });
  });

  logout = asyncHandler(async (req, res) => {
    await AuthService.logout(req.user);
    res.status(200).json({
      code: 200,
      message: "User logged out successfully",
    });
  });

  current = asyncHandler((req, res) => {
    const { user } = req;
    res.status(200).json({
      code: 200,
      message: "OK",
      data: {
        user: this.responseUserSchema(user),
      },
    });
  });

  update = asyncHandler(async (req, res) => {
    const { user, body, file } = req;
    if (file?.path) {
      const { secure_url, public_id } = await fileController.upload(
        file.path,
        "avatars",
        user.avatarId
      );
      body.avatarURL = secure_url;
      body.avatarId = public_id ? path.parse(public_id).name : null;
    }

    const updUser = await AuthService.update(user._id, body);

    res.status(200).json({
      code: 200,
      message: "User updated successfully",
      data: {
        user: this.responseUserSchema(updUser),
      },
    });
  });

  googleAuth = asyncHandler(async (req, res) => {
    console.log(req);
    const { _id: id } = req.user;
    const payload = { id };
    const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET_KEY, {
      expiresIn: "30s",
    });
    const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET_KEY, {
      expiresIn: "744h",
    });
    await User.findByIdAndUpdate(id, { accessToken, refreshToken });
    res.redirect(
      `http://localhost:5173/YourPet/user?accessToken=${accessToken}&refreshToken=${refreshToken}`
    );
  });
}

const authController = new AuthController();
module.exports = authController;
