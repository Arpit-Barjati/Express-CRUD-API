const validate = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly:false });
    if (error) {
        res.status(400).send(error.details.map((item) => item.message));
    } else {
        return next();
    }
};

module.exports = validate;
