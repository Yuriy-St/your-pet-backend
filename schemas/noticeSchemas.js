const Joi = require('joi');

const addNoticeSchema = Joi.object({
  category: Joi.string()
    .valid('sell', 'lost', 'found', 'good-hands')
    .required(),
  title: Joi.string().required(),
  location: Joi.alternatives().conditional('category', {
    is: 'sell',
    then: Joi.string().required(),
    otherwise: Joi.string().allow('').optional(),
  }),
  price: Joi.alternatives().conditional('category', {
    is: 'sell',
    then: Joi.number().greater(0).required(),
    otherwise: Joi.number().allow('').optional(),
  }),
  name: Joi.string().min(2).max(16).required(),
  type: Joi.string().min(2).max(16).required(),
  birthDate: Joi.alternatives().conditional('category', {
    not: 'found',
    then: Joi.number().required(),
    otherwise: Joi.number().allow('').optional(),
  }),
  sex: Joi.string().valid('male', 'female').required(),
  comments: Joi.string().max(120).optional(),
});

const updateNoticeSchema = Joi.object({
  category: Joi.string().valid('sell', 'lost', 'found', 'good-hands'),
  location: Joi.alternatives().conditional('category', {
    is: 'sell',
    then: Joi.string().required(),
    otherwise: Joi.string().allow('').optional(),
  }),
  price: Joi.alternatives().conditional('category', {
    is: 'sell',
    then: Joi.number().greater(0),
    otherwise: Joi.number().allow('').optional(),
  }),
  name: Joi.string().min(2).max(16),
  type: Joi.string().min(2).max(16),
  birthDate: Joi.alternatives().conditional('category', {
    not: 'found',
    then: Joi.number(),
    otherwise: Joi.number().allow('').optional(),
  }),
  sex: Joi.string().valid('male', 'female'),
  comments: Joi.string().max(120).optional(),
});

module.exports = {
  addNoticeSchema,
  updateNoticeSchema,
};
