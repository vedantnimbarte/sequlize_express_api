const { DataTypes } = require('sequelize');

module.exports = async (sequelize) => {
    const Roles = sequelize.define('Roles', {
        ROLE_ID: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        ROLE_NAME: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: {
                args: true,
                msg: 'Role-Name must be unique.'
            },
            validate: {
                notNull: {
                    args: true,
                    msg: "Role-Name can not be empty."
                },
                notEmpty: {
                    args: true,
                    msg: "Role-Name can not be empty."
                },
                len: {
                    args: [3, 50],
                    msg: 'Role-Name must start with a letter, have no spaces, and be 3 - 50 characters.'
                },
                is: {
                    args: /^[A-Za-z][A-Za-z0-9-_]+$/i, // must start with letter and only have letters, numbers, dashes
                    msg: 'Role-Name must start with a letter, have no spaces, and be 3 - 50 characters.'
                }
            },
        },
        ROLE_PARENT_ID: {
            type: DataTypes.STRING,
            allowNull: true
        },
        DESCRIPTION: {
            type: DataTypes.STRING(100),
            allowNull: true,
            validate: {
                len: {
                    args: [2, 100],
                    msg: 'The descrption must contain between 2 and 100 characters.'
                }
            }
        },
        ISACTIVE: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        ISDELETE: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        CREATE_DATE: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        UPDATE_DATE: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, {
        tableName: 'ROLES'
    });
    return Roles;
};