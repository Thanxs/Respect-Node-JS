const joi = require("@hapi/joi");
const { Segments } = require("celebrate");

exports.registerUserValidation = {
  [Segments.BODY]: {
    email: joi.string().email().required(),
    password: joi.string().min(6).max(20).required(),
  },
};