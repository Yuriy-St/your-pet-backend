const Joi = require('joi');

const addPepSchema = Joi.object({
  name: Joi.string().required(),
  birth: Joi.string().required(),
  type: Joi.string().required(),
  comments: Joi.string(),
  petAvatarURL: Joi.string()
});

module.exports = {
  addPepSchema
};
