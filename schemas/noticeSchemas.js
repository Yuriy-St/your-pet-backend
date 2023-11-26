const Joi = require('joi').extend(require('@joi/date'));

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
  name: Joi.alternatives().conditional('category', {
    not: 'found',
    then: Joi.string().min(2).max(16).required(),
    otherwise: Joi.string().allow('').optional(),
  }),
  type: Joi.string().min(2).max(16).required(),
  birthDate: Joi.alternatives().conditional('category', {
    not: 'found',
    then: Joi.date().format(['DD-MM-YYYY']).required(),
    otherwise: Joi.date().allow('').optional(),
  }),
  sex: Joi.string().valid('male', 'female').required(),
  comments: Joi.string().max(120).allow('').optional(),
});

const updateNoticeSchema = Joi.object({
  category: Joi.string().valid('sell', 'lost', 'found', 'good-hands').allow(''),
  location: Joi.alternatives().conditional('category', {
    is: 'sell',
    then: Joi.string().required(),
    otherwise: Joi.string().allow(''),
  }),
  price: Joi.alternatives().conditional('category', {
    is: 'sell',
    then: Joi.number().greater(0),
    otherwise: Joi.number().allow(''),
  }),
  name: Joi.string().min(2).max(16).allow(''),
  type: Joi.string().min(2).max(16).allow(''),
  birthDate: Joi.alternatives().conditional('category', {
    not: 'found',
    then: Joi.date().format(['DD-MM-YYYY']),
    otherwise: Joi.date().allow(''),
  }),
  sex: Joi.string().valid('male', 'female').allow(''),
  comments: Joi.string().max(120).allow(''),
});

module.exports = {
  addNoticeSchema,
  updateNoticeSchema,
};
