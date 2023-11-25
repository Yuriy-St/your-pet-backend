const Joi = require('joi');

const addPetSchema = Joi.object({
  category: Joi.string().required(),
  name: Joi.string().required(),
  type: Joi.string().required(),
  birthDate: Joi.date().required(),
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
