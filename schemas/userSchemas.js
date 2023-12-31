const Joi = require('joi').extend(require('@joi/date'));

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: false,
    })
    .required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: false,
    })
    .required(),
  password: Joi.string().min(6).required(),
});

const updateSchema = Joi.object({
  name: Joi.string().allow(''),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: false,
  }),
  birthday: Joi.date().format('DD-MM-YYYY'),
  phone: Joi.string().allow(''),
  city: Joi.string().allow(''),
});

const refreshSchema = Joi.object({
  refreshToken: Joi.string().required(),
});

module.exports = {
  registerSchema,
  loginSchema,
  updateSchema,
  refreshSchema,
};
