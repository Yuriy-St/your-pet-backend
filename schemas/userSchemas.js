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
  name: Joi.string(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: false,
  }),
  birthday: Joi.date().format('DD-MM-YYYY'),
  phone: Joi.string(),
  city: Joi.string(),
});

module.exports = {
  registerSchema,
  loginSchema,
  updateSchema,
};
