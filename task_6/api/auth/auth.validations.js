const joi = require('@hapi/joi');
const { Segments } = require('celebrate');

exports.authUserValidation = {
    [Segments.BODY]: {
        email: joi.string().email().required(),
        password: joi.string().min(6).max(20).required(),
    }
};