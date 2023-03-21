const Joi = require('joi');

const schema = Joi.object()
    .keys({
        login: Joi.string().email().required(),
        password: Joi.string().alphanum().required(),
        age: Joi.number().min(4).max(130).required()
    });

module.exports = schema;
