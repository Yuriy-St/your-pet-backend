const Joi = require('joi');

const addNoticeSchema = Joi.object({
  category: Joi.string().required(),
  title: Joi.string().required(),
  location: Joi.string().required(),
  price: Joi.alternatives().conditional('category', {
    is: 'sell',
    then: Joi.number().required(),
  }),
  name: Joi.string().required(),
  type: Joi.string().required(),
  birthDate: Joi.alternatives().conditional('category', {
    not: 'found',
    then: Joi.number().required(),
    otherwise: Joi.number().optional(),
  }),
  sex: Joi.string(),
  comments: Joi.string(),
});

const updateNoticeSchema = Joi.object({
  category: Joi.string(),
  name: Joi.string(),
  type: Joi.string(),
  birthDate: Joi.date(),
  sex: Joi.string(),
  comments: Joi.string(),
});

module.exports = {
  addNoticeSchema,
  updateNoticeSchema,
};
