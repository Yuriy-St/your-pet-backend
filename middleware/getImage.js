const fileController = require('../controllers/FileController');
const HttpError = require('../helpers/HttpError');

const getImage = async (req, res, next) => {
  if (!req.file) {
    return next(HttpError(400, 'Attached file not found'));
  }
  const { path: tmpDir } = req.file;
  const { secure_url, public_id } = await fileController.upload(
    tmpDir,
    'images'
  );

  req.body.imageURL = secure_url;
  req.body.imageId = public_id;

  next();
};

module.exports = getImage;
