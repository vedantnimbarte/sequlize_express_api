const yup = require('yup');
const NAME_FORMAT = /^[A-Za-z][A-Za-z0-9-_]+$/;

const insertSchema = yup.object().shape({
    DESCRIPTION: yup.string().optional().nullable(true),
    GAMEGROUP_NAME: yup.string().matches(NAME_FORMAT, "Game-Group-Name must start with a letter, have no spaces, and be 3 - 50 characters.").min(3, 'Game-Group-Name should be minimum 3 characters').max(50, 'Game-Group-Name should be maximum 50 characters').required('Please Enter The Game-Group-Name')
});

const updateSchema = yup.object().shape({
    ROLE_ID: yup.number().required('Role is not present.'),
    GAMEGROUP_NAME: yup.string().min(3, 'Game-Group-Name should be minimum 3 characters').max(50, 'Game-Group name should be maximum 50 characters').required('Please Enter The Game-Group-Name'),
    ROLE_PARENT_ID: yup.string().optional(),
    DESCRIPTION: yup.string().optional()
});

const deleteSchema = yup.object().shape({
    ROLE_ID: yup.number().required('Role is not present.')
});

const pageSchema = yup.object().shape({
    PAGE_NUMBER: yup.number().required(),
    PAGE_LIMIT: yup.number().required(),
    ROLE_NAME: yup.string().optional()
});


module.exports = { insertSchema, updateSchema, deleteSchema, pageSchema };