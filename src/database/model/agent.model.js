
const { DataTypes } = require('sequelize');

module.exports = async (sequelize) => {
    const Agent = sequelize.define('Agent', {
        AGENT_ID: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        AGENT_USERNAME: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                args: true,
                msg: 'User-Name must be unique.'
            },
            validate: {
                notNull: {
                    args: true,
                    msg: "User can not be empty."
                },
                notEmpty: {
                    args: true,
                    msg: "User can not be empty."
                },
                len: {
                    args: [3, 50],
                    msg: 'User must start with a letter, have no spaces, and be 3 - 50 characters.'
                },
            },
        },
        AGENT_NAME: {
            type: DataTypes.STRING
        },
        AGENT_EMAIL: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        AGENT_PHONE: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        PASSWORD: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ADDRESS: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        AGENT_PERMISSION_IDS: {
            type: DataTypes.STRING,
            allowNull: true
        },
        GAMEGROUP_IDS: {
            type: DataTypes.STRING,
            allowNull: true
        },
        ISACTIVE: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
        },
        ISDELETE: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
        },
        CREATE_DATE: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        UPDATE_DATE: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        LOGIN_DATE: {
            type: DataTypes.DATE
        },
        ISBLOCK: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        ACCESS_TOKEN_SECRET: {
            type: DataTypes.TEXT
        },
        REFRESH_TOKEN_SECRET: {
            type: DataTypes.TEXT
        },
        CURRENT_MAGESTIC_POINTS: {
            type: DataTypes.DOUBLE,
            defaultValue: 0
        },
        CURRENT_MAGESTIC_COINS:  {
            type: DataTypes.DOUBLE,
            defaultValue: 0
        }
    }, { tableName: 'AGENT' });
    return Agent;
};