const asyncHandler = require('../helpers/asyncHandler');
const petService = require('../services/PetService');
const fs = require('fs/promises');
const path = require('path');
const fileController = require('./FileController');
const HttpError = require('../helpers/HttpError');

class PetController {
  // add by user
  add = asyncHandler(async (req, res, next) => {
    const { _id: owner } = req.user;
    const newPet = await petService.add({
      ...req.body,
      owner,
    });

    res.status(201).json({
      code: 201,
      message: 'Pet successfully added',
      data: {
        _id: newPet._id,
        name: newPet.name,
        type: newPet.type,
        birthDate: newPet.birthDate,
        sex: newPet.sex,
        comments: newPet.comments,
        category: newPet.category,
        imageURL: newPet.imageURL,
      },
    });
  });

  // remove a pet
  remove = asyncHandler(async (req, res) => {
    const { _id: owner } = req.user;
    const { id } = req.params;
    const { imageId } = await petService.getById(id, 'imageId');
    await petService.remove({ id, owner });
    await fileController.delete(imageId);

    res.status(200).json({
      code: 200,
      message: 'Resource successfully deleted',
      data: null,
    });
  });

  // get all pet
  findAll = asyncHandler(async (req, res) => {
    const { filter, paging = {}, noRes } = req;
    const pets = await petService.findAll({
      filter,
      projection: 'name category birthDate type comments imageURL',
      options: { ...paging },
    });

    if (noRes) {
      return pets;
    }

    res.status(200);
    res.json({
      code: 200,
      message: 'Resource successfully retrieved',
      qty: pets.length,
      data: {
        pets,
      },
    });
  });

  // update pet
  update = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const pet = petService.getById(id);
    const { user, body, file } = req;
    if (file?.path) {
      const { secure_url, public_id } = await fileController.upload(
        file.path,
        'images',
        pet.imageId
      );
      body.imageURL = secure_url;
      body.imageId = public_id ? path.parse(public_id).name : null;
    }

    let updated = await PetService.update(pet._id, body);

    res.status(200);
    res.json({
      code: 200,
      message: 'Pet updated successfully',
      data: {
        name: updated.name,
        birthDate: updated.birthDate,
        sex: updated.sex,
        type: updated.type,
        comments: updated.comments,
        imageURL: updated.imageURL,
      },
    });
  });

  // get a single pet
  getOne = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const pet = await petService.getById(id);

    res.status(200);
    res.json({
      code: 200,
      message: 'Ok',
      data: {
        name: updated.name,
        birthDate: updated.birthDate,
        sex: updated.sex,
        type: updated.type,
        comments: updated.comments,
        imageURL: updated.imageURL,
      },
    });
  });
}

const petController = new PetController();
module.exports = petController;
