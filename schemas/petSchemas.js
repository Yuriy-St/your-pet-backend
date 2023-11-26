const Joi = require('joi').extend(require('@joi/date'));

const addPetSchema = Joi.object({
  category: Joi.string().valid('own').required(),
  name: Joi.string().min(2).max(16).required(),
  type: Joi.string().min(2).max(16).required(),
  birthDate: Joi.date().format(['DD-MM-YYYY']),
  sex: Joi.string().valid('male', 'female', ''),
  comments: Joi.string().max(120).allow(''),
});

const updatePetSchema = Joi.object({
  category: Joi.string().valid('own'),
  name: Joi.string().min(2).max(16),
  type: Joi.string().min(2).max(16),
  birthDate: Joi.date().format(['DD-MM-YYYY']),
  sex: Joi.string().valid('male', 'female'),
  comments: Joi.string().max(120),
});

module.exports = {
  addPetSchema,
  updatePetSchema,
};
