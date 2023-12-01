const fsp = require('fs/promises');
const cloudinaryService = require('../services/CloudinaryService');

class FileController {
  upload = async (srcPath, folder = '', id = '') => {
    const { secure_url, public_id } = await cloudinaryService.uploadResource(
      srcPath,
      {
        folder,
        public_id: id,
      }
    );
    fsp.unlink(srcPath);

    return { secure_url, public_id };
  };

  delete = async id => {
    const response = await cloudinaryService.deleteImage(id);
    return response;
  };
}

const fileController = new FileController();
module.exports = fileController;
