const cloudinary = require('cloudinary').v2;

cloudinary.config({
  secure: true,
});

console.log(cloudinary.config);

class CloudinaryService {
  #options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  };

  async uploadResource(resourcePath, folder = '') {
    const result = await cloudinary.uploader.upload(resourcePath, {
      ...this.#options,
      folder,
    });

    return result;
  }

  async deleteImage(resourceId) {
    const result = await cloudinary.api.delete_resources([resourceId], {
      type: 'upload',
      resource_type: 'image',
    });

    return result;
  }
}

const cloudinaryService = new CloudinaryService();
module.exports = cloudinaryService;
