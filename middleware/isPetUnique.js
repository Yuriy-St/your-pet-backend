const petController = require('../controllers/PetController');
const HttpError = require('../helpers/HttpError');

const isPetUnique = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { name } = req.body;
  req.filter = { owner, name };
  req.noRes = true;
  const candidate = await petController.findAll(req, res);
  if (candidate) {
    return next(HttpError(409, 'You already have a pet with that name'));
  }
  next();
};

module.exports = isPetUnique;
