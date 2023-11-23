const filters = (req, res, next) => {
  // const filter = req.query;
  const category = req.query.category.split(',').join(' ');
  const { _id: owner } = req.user;

  return {
    owner,
    category: category,
  };
};

module.exports = filters;
