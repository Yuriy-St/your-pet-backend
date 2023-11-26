const filters = (req, res, next) => {
  const { filter } = req.q;

  req.filters = {
    ...filter,
  };

  next();
};

module.exports = filters;
