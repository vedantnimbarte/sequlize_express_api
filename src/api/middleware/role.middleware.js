
/**
 * Validate that a resource being POSTed or PUT
 * has a valid shape, else return 400 Bad Request
 * @param {*} resourceSchema is a yup schema
 */
const validateResourceMW = (resourceSchema) => async (req, res, next) => {
    const resource = req.body;
    try {
        var data = await resourceSchema.validate(resource, { stripUnknown: true, abortEarly: true });
        req.body = data;
        next();
    } catch (e) {
        console.error(e.errors.join(', '));
        res.status(400).json({ status: false, msg: e.errors.join(', ') });
    }
};



/**
 * Validate that a resource being POSTed or PUT
 * has a valid shape, else return 400 Bad Request
 * @param {*} resourceSchema is a yup schema
 */
const validateResourceUpdateMW = (resourceSchema) => async (req, res, next) => {
    const resource = req.body;
    req.body.ROLE_ID = req.params.id;
    try {
        var data = await resourceSchema.validate(resource, { stripUnknown: true, abortEarly: true });
        req.body = data;
        next();
    } catch (e) {
        console.error(e.errors.join(', '));
        res.status(400).json({ status: false, msg: e.errors.join(', ') });
    }
};


/**
 * Validate that a resource being POSTed or PUT
 * has a valid shape, else return 400 Bad Request
 * @param {*} resourceSchema is a yup schema
 */
const validateResourceDeleteMW = (resourceSchema) => async (req, res, next) => {
    req.body.ROLE_ID = req.params.id;
    const resource = req.body;
    try {
        var data = await resourceSchema.validate(resource, { stripUnknown: true, abortEarly: true });
        req.body = data;
        next();
    } catch (e) {
        console.error(e.errors.join(', '));
        res.status(400).json({ status: false, msg: e });
    }
};

module.exports = { validateResourceMW, validateResourceUpdateMW, validateResourceDeleteMW };