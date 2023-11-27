const filters = (req, res, next) => {
  const { filter } = req.query;

  req.filters = {
    ...filter,
  };

  next();
};

module.exports = filters;
