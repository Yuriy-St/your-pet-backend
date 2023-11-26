const asyncHandler = require('../helpers/asyncHandler');
const petService = require('../services/PetService');
const fs = require('fs/promises');
const path = require('path');
const fileController = require('./FileController');
const HttpError = require('../helpers/HttpError');

class NoticeController {
  // add by user
  add = asyncHandler(async (req, res, next) => {
    const { _id: owner } = req.user;
    const newNotice = await petService.add({
      ...req.body,
      owner,
    });

    res.status(201).json({
      code: 201,
      message: 'Notice successfully added',
      data: {
        notice: {
          _id: newNotice._id,
          category: newNotice.category,
          title: newNotice.title,
          location: newNotice.location || '',
          name: newNotice.name,
          type: newNotice.type,
          birthDate: newNotice.birthDate || new Date.now(),
          sex: newNotice.sex,
          comments: newNotice.comments,
          imageURL: newNotice.imageURL,
        },
      },
    });
  });

  // remove a notice
  remove = asyncHandler(async (req, res) => {
    const { _id: owner } = req.user;
    const { id } = req.params;
    const { imageId } = await petService.getById(id, 'imageId');
    await fileController.delete(imageId);
    await petService.remove({ id, owner });

    res.status(200).json({
      code: 200,
      message: 'Resource successfully deleted',
      data: null,
    });
  });

  // get all notices
  getAll = asyncHandler(async (req, res) => {
    const { category } = req.body;
    const result = await petService.getAll({ projection: category });

    res.status(200);
    res.json({
      code: 200,
      message: 'Notices successfully retrieved',
      qty: result.length,
      data: {
        result,
      },
    });
  });

  // get own notice list
  getFilteredList = asyncHandler(async (req, res) => {
    const { filter, paging } = req;
    const data = await petService.getAll(filter, { ...paging });
    res.status(200).json({
      code: 200,
      message: 'ok',
      qty: data.length,
      data,
    });
  });

  // update notice
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
        category: updated.category,
        birthDate: updated.birthDate,
        sex: updated.sex,
        type: updated.type,
        comments: updated.comments,
        imageURL: updated.imageURL,
        title: updated.title,
        location: updated.location,
        inFavorites: updated.inFavorites,
      },
    });
  });

  // find by category and/or by matching title
  getByFilter() {}

  // get a single notice
  getOne(id) {}

  // add to favorites list
  addToFavorites(userId, noticeId) {}

  // remove a notice from the favorite list
  removeFromFavorites(userId, noticeId) {}
}

const noticeController = new NoticeController();
module.exports = noticeController;
