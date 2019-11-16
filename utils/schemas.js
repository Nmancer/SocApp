const Joi = require("@hapi/joi");
const schemas = {
  loginSchema: Joi.object().keys({
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string().required()
  }),
  registrationSchema: Joi.object().keys({
    username: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .required(),

    password: Joi.string(),
    name: Joi.string()
      .alphanum()
      .min(2)
      .max(64)
      .required(),
    avatar: Joi.string()
      .min(4)
      .max(64)
      .allow(""),

    about: Joi.string()
      .alphanum()
      .min(2)
      .max(150)
      .allow(""),
    email: Joi.string()
      .email({
        minDomainSegments: 2
      })
      .required()
  }),
  commentSchema: Joi.object().keys({
    text: Joi.string()

      .min(2)
      .max(150)
      .required()
  }),
  postSchema: Joi.object().keys({
    title: Joi.string()

      .min(2)
      .max(100)
      .required(),

    body: Joi.string()

      .min(6)
      .max(1000)
      .required()
  })
};

module.exports = schemas;
