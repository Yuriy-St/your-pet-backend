const Joi = require('joi');

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
  name: Joi.string(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: false,
  }),
  birthday: Joi.string(),
  phone: Joi.string(),
  city: Joi.string(),
  avatar: Joi.binary(),
});

module.exports = {
  registerSchema,
  loginSchema,
  updateSchema,
};
