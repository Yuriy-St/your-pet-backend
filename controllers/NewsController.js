const News = require('../models/News');
const asyncHandler = require('../helpers/asyncHandler');

const getAllNews = async (req, res, next) => {
  const { page = 1, limit = 6 } = req.query;
  console.log(req.query);
  const skip = (page - 1) * limit;
  const allNews = await News.find({}, '', {
    skip,
    limit,
  });
  res.status(200).json({ status: 200, data: allNews });
};

module.exports = {
  getAllNews: asyncHandler(getAllNews),
};
