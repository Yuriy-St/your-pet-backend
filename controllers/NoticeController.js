const asyncHandler = require('../helpers/asyncHandler');
const petService = require('../services/PetService');
const fs = require('fs/promises');
const path = require('path');
const fileController = require('./FileController');
const parse = require('date-fns/parse');

class NoticeController {
  // notice response schema
  responseSchema(notice) {
    return {
      _id: notice._id,
      category: notice.category,
      title: notice.title,
      location: notice.location || '',
      name: notice.name,
      type: notice.type,
      birthDate: notice.birthDate || Date.now(),
      sex: notice.sex,
      comments: notice.comments,
      imageURL: notice.imageURL,
      inFavorites: notice.inFavorites,
      owner: notice.owner,
    };
  }

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
        notice: this.responseSchema(newNotice),
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

  // get own notice list
  findByCategory = asyncHandler(async (req, res) => {
    const { filters, paging } = req;
    const { category } = req.params;
    const { q } = req.query;
    const notices = await petService.findNoticesByCategory({
      filter: {
        category,
        title: { $regex: new RegExp(q, 'i') },
      },
      options: { ...paging },
    });
    res.status(200).json({
      code: 200,
      message: 'ok',
      qty: notices.length,
      data: {
        notices,
      },
    });
  });

  // find a notice by ID
  findById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const notice = await petService.findNoticeById(id);

    res.status(200);
    res.json({
      code: 200,
      message: 'Ok',
      data: {
        notice: this.responseSchema(notice),
      },
    });
  });

  // get all own user's notices
  findAllOwn = asyncHandler(async (req, res) => {
    const { paging } = req;
    const { _id: owner } = req.user;
    const notices = await petService.findAllOwnNotices({
      owner,
      options: { ...paging },
    });

    res.status(200);
    res.json({
      code: 200,
      message: 'Ok',
      data: {
        qty: notices.length,
        notices,
      },
    });
  });

  // update notice
  update = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const notice = petService.getById(id);
    const { user, body, file } = req;
    if (file?.path) {
      const { secure_url, public_id } = await fileController.upload(
        file.path,
        'images',
        notice.imageId
      );
      body.imageURL = secure_url;
      body.imageId = public_id ? path.parse(public_id).name : null;
    }

    let updated = await PetService.update(pet._id, body);

    res.status(200);
    res.json({
      code: 200,
      message: 'Notice updated successfully',
      data: {
        notice: this.responseSchema(updated),
      },
    });
  });

  // find by category and/or by matching title
  getByFilter() {}

  // add/remove from favorites list
  addToFavorites = asyncHandler(async (req, res) => {
    // const { _id: owner } = req.body;
    // const { id: noticeId, favorite } = req.query;
  });
}

const noticeController = new NoticeController();
module.exports = noticeController;
