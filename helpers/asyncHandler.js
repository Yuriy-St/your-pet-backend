module.exports = clb => async (req, res, next) => {
  try {
    return await clb(req, res, next);
  } catch (error) {
    next(error);
  }
};
