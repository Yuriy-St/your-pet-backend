const Joi = require('joi').extend(require('@joi/date'));

const addPetSchema = Joi.object({
  category: Joi.string().required(),
  name: Joi.string().required(),
  type: Joi.string().required(),
  birthDate: Joi.date().format(['DD-MM-YYYY']).required(),
  sex: Joi.string(),
  comments: Joi.string().allow(''),
});

const updatePetSchema = Joi.object({
  category: Joi.string(),
  name: Joi.string(),
  type: Joi.string(),
  birthDate: Joi.date(),
  sex: Joi.string(),
  comments: Joi.string(),
});

module.exports = {
  addPetSchema,
  updatePetSchema,
};
