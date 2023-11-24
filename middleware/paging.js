const paging = (req, _, next) => {
  const { page = 1, limit = 10 } = req.query;
  const skip = limit * (page - 1);
  req.paging = { skip, limit };
  next();
};

module.exports = paging;
