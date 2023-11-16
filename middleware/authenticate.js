const HttpError = require('../helpers/HttpError');
const authService = require('../services/AuthService');

const authenticate = async (req, res, next) => {
  // add your code here
  next();
};

module.exports = authenticate;
