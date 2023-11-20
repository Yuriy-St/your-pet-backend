const cloudinary = require('cloudinary').v2;

cloudinary.config({
  secure: true,
});

console.log(cloudinary.config);

class CloudinaryService {
  #options = {
    use_filename: true,
    unique_filename: true,
    overwrite: true,
    invalidate: true,
  };

  async uploadResource(resourcePath, opts = {}) {
    const result = await cloudinary.uploader.upload(resourcePath, {
      ...this.#options,
      ...opts,
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
