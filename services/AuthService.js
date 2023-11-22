const HttpError = require('../helpers/HttpError');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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
    const { SECRET_KEY } = process.env;
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

    const token = jwt.sign(payload, SECRET_KEY, {
      expiresIn: '744h',
    });
    const user = await User.findByIdAndUpdate(candidate._id, { token });

    return user;
  }

  async authenticate(token) {
    const { SECRET_KEY } = process.env;
    const { id } = jwt.verify(token, SECRET_KEY);
    const candidate = await User.findById(id);
    return candidate;
  }

  async logout({ _id }) {
    const response = await User.findByIdAndUpdate(_id, { token: null });
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
