const yup = require('yup');
const NAME_FORMAT = /^[A-Za-z][A-Za-z0-9-_]+$/;
const insertSchema = yup.object().shape({
    ROLE_PARENT_ID: yup.string().required('Agent-Type must have parent agent.').trim(),
    DESCRIPTION: yup.string().optional().nullable(true),
    ROLE_NAME: yup.string().matches(NAME_FORMAT, "Agent-Type must start with a letter, have no spaces, and be 3 - 50 characters.").min(3, 'Agent-Type name should be minimum 3 characters').max(50, 'Agent-Type name should be maximum 50 characters').required('Please Enter The Agent-Type')
});

const updateSchema = yup.object().shape({
    ROLE_ID: yup.number().required('Agent-Type is not present.'),
    ROLE_NAME: yup.string().min(3, 'Agent-Type name should be minimum 3 characters').max(50, 'Agent-Type should be maximum 50 characters').required('Please Enter The Agent-Type'),
    ROLE_PARENT_ID: yup.string().required('Agent-Type must have parent agent.'),
    DESCRIPTION: yup.string().optional()
});

const deleteSchema = yup.object().shape({
    ROLE_ID: yup.number().required('Agent-Type is not present.')
});

const pageSchema = yup.object().shape({
    PAGE_NUMBER: yup.number().required(),
    PAGE_LIMIT: yup.number().required(),
    ROLE_NAME: yup.string().optional()
});


module.exports = { insertSchema, updateSchema, deleteSchema, pageSchema };