const Joi = require('joi');

const schema = Joi.object()
    .keys({
        id: Joi.string().uuid(),
        login: Joi.string().email(),
        password: Joi.string().alphanum(),
        age: Joi.number().min(4).max(130),
        isDeleted: Joi.boolean()
    });

module.exports = schema;
