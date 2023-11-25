const HttpError = require('../helpers/HttpError');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY } = process.env;

class AuthService {
  async register(body) {
    const { email, password } = body;
    const competitor = await User.findOne({ email });
    if (competitor) {
      throw HttpError(409, 'Email in use');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      ...body,
      password: hashedPassword,
    });

    return newUser;
  }

  async login({ email, password }) {
    const candidate = await User.findOne({ email });
    if (!candidate) {
      throw HttpError(401, 'Email or password is invalid', 'LoginError');
    }

    const isMatch = await bcrypt.compare(password, candidate.password);
    if (!isMatch) {
      throw HttpError(401, 'Email or password is invalid', 'LoginError');
    }

    const payload = {
      id: candidate._id,
    };

    const accessToken = jwt.sign(payload, ACCESS_SECRET_KEY, {
      expiresIn: '2m',
    });
    const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, {
      expiresIn: '744h',
    });

    const user = await User.findByIdAndUpdate(
      candidate._id,
      { accessToken, refreshToken },
      { new: true }
    );

    return user;
  }

  async refresh({ refreshToken: token }) {
    try {
      const { id } = jwt.verify(token, REFRESH_SECRET_KEY);
      const isExist = await User.findOne({refreshToken: token});
      if (!isExist) {
        throw HttpError(403, 'Refresh token invalid');
      }

      const payload = {
        id,
      };

      const accessToken = jwt.sign(payload, ACCESS_SECRET_KEY, {
        expiresIn: '2m',
      });
      const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, {
        expiresIn: '744h',
      });

      const user = await User.findByIdAndUpdate(
        id,
        { accessToken, refreshToken },
        { new: true }
      );
      return user;
    } catch (error) {
      throw HttpError(403, error.message);
    }
  }

  async authenticate(accessToken) {
    const { id } = jwt.verify(accessToken, ACCESS_SECRET_KEY);
    const candidate = await User.findById(id);
    return candidate;
  }

  async logout({ _id }) {
    const response = await User.findByIdAndUpdate(_id, {
      accessToken: null,
      refreshToken: null,
    });
    return response;
  }

  async update(id, body = {}) {
    try {
      const candidate = await User.findByIdAndUpdate(id, body, { new: true });
      return candidate;
    } catch (err) {
      throw HttpError(304, err.message);
    }
  }
}

module.exports = new AuthService();
