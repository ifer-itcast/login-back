const Joi = require('@hapi/joi');

module.exports = schema => (req, res, next) => {
    const { error } = Joi.object(schema).validate(req.body);
    if (error) {
        throw error;
    }
    next();
};