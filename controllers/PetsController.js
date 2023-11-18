const asyncHandler = require('../helpers/asyncHandler');
const PetsService = require('../services/PetsService');
const fs = require('fs/promises');
const path = require('path');

class PetsController {
  avatarsDir = path.join(__dirname, '..', 'public', 'avatars');

  addPet = asyncHandler(async (req, res) => {
    const { _id, name, birth, type, comments, petAvatarURL } =
      await PetsService.addPet(req.body);

    res.status(201).json({
      code: 201,
      message: 'Pet add successfully.',
      data: { _id, name, birth, type, comments, petAvatarURL },
    });
  });

  delPet = asyncHandler(async (req, res) => {
    await PetsService.delPet(req.params);

    res.status(200).json({
      code: 200,
      message: 'Pet successfully delete.',
      data: null,
    });
  });

  updatePetPhoto = asyncHandler(async (req, res) => {
    //! TODO fix this mthod
    const { name } = req.params;
    const { path: tempDir, originalname } = req.file;
    const filename = `${name}_${originalname}`;
    const petPhotoPath = path.join(this.avatarsDir, filename);
    await fs.rename(tempDir, petPhotoPath);
    const petAvatarURL = path.join('avatars', filename);
    await PetsService.updatePet(name, { petAvatarURL });

    res.status(200).json({
      code: 200,
      message: 'Pet photo updated successfully',
      data: { petAvatarURL },
    });
  });
}

module.exports = new PetsController();
