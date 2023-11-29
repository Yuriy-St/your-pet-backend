const asyncHandler = require('../helpers/asyncHandler');
const petService = require('../services/PetService');
const path = require('path');
const fileController = require('./FileController');
const { parse } = require('date-fns');
const HttpError = require('../helpers/HttpError');

class PetController {
  responsePetSchema = pet => ({
    _id: newPet._id,
    name: newPet.name,
    type: newPet.type,
    birthDate: newPet.birthDate,
    sex: newPet.sex,
    comments: newPet.comments,
    category: newPet.category,
    imageURL: newPet.imageURL,
  });

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
        pet: this.responsePetSchema(newPet),
      },
    });
  });

  // remove a pet
  remove = asyncHandler(async (req, res) => {
    const { _id: currentUser } = req.user;
    const { id } = req.params;
    const { owner, imageId } = await petService.getById(id, 'owner, imageId');
    if (currentUser !== owner) {
      throw HttpError(403);
    }
    await petService.remove(id);
    await fileController.delete(imageId);

    res.status(200).json({
      code: 200,
      message: 'Resource successfully deleted',
      data: null,
    });
  });

  // get all pet
  findAll = asyncHandler(async (req, res) => {
    const { filters, paging, noRes } = req;
    const pets = await petService.findAllPets({
      filter: filters,
      options: { ...paging },
    });

    if (noRes) {
      // for the case controller is called from middleware
      return pets;
    }

    res.status(200);
    res.json({
      code: 200,
      message: 'Ok',
      qty: pets.length,
      data: {
        pets,
      },
    });
  });

  // get all own user's pet
  findAllOwn = asyncHandler(async (req, res) => {
    // const { paging } = req;
    // const { _id: owner } = req.user;
    // const pets = await petService.findAllOwnPets({
    //   owner,
    //   options: { ...paging },
    // });
    const { paging } = req;
    const { _id: owner } = req.user;
    const total = await petService.countPets({ owner });

    let pets = [];

    if (total > 0) {
      pets = await petService.findAllOwnPets({
        owner,
        options: { ...paging },
      });
    }

    res.status(200);
    res.json({
      code: 200,
      message: 'Ok',
      data: {
        total,
        qty: pets.length,
        pets,
      },
    });
  });

  // update pet
  update = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const pet = petService.getById(id);
    const { user, body, file } = req;
    if (body?.birthDate) {
      body.birthDate = parse(body.birthDate, 'dd-MM-yyyy', new Date());
    }
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
        pet: this.responsePetSchema(updated),
      },
    });
  });

  // get a single pet by ID
  getOne = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const pet = await petService.getById(id);

    res.status(200);
    res.json({
      code: 200,
      message: 'Ok',
      data: {
        pet: this.responsePetSchema(pet),
      },
    });
  });
}

const petController = new PetController();
module.exports = petController;
