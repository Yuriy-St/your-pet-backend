const fs = require('fs/promises');
const cloudinaryService = require('../services/CloudinaryService');

class FileController {
  upload = async (initPath, destFolder) => {
    const { secure_url: secureURL, public_id: publicId } =
      await cloudinaryService.uploadResource(initPath, destFolder);
    fs.unlink(initPath);

    return { secureURL, publicId };
  };

  delete = async id => {
    const response = await cloudinaryService.deleteImage(id);

    return response;
  };
}

const fileController = new FileController();
module.exports = fileController;
