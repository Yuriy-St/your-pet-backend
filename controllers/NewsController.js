const News = require('../models/News');
const asyncHandler = require('../helpers/asyncHandler');

class NewsController {
  getAllNews = asyncHandler(async (req, res, next) => {
    const { page = 1, limit = 6, q = '' } = req.query;
    const skip = (page - 1) * limit;
    const allNewsTotal = await News.find({
      title: { $regex: new RegExp(q, 'i') },
    });
    const allNews = await News.find(
      { title: { $regex: new RegExp(q, 'i') } },
      '',
      {
        skip,
        limit,
      }
    );
    res
      .status(200)
      .json({ status: 200, total: allNewsTotal.length, data: allNews });
  });
}
const newsController = new NewsController();
module.exports = newsController;
