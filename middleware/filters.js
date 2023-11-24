const filters = (req, res, next) => {
  const { filter, category } = req.query;

  const filters = {
    ...filter,
  };

  if (category) {
    filters.category = category;
  }

  req.filters = filters;

  next();
};

module.exports = filters;
