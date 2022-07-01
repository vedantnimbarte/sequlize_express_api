
const { DataTypes } = require('sequelize');

module.exports = async (sequelize) => {
    const Player = sequelize.define('Player', {
        PLAYER_ID: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        PLAYER_USERNAME: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                args: true,
                msg: 'Username must be unique.'
            },
            validate: {
                notNull: {
                    args: true,
                    msg: "Username can not be empty."
                },
                notEmpty: {
                    args: true,
                    msg: "Username can not be empty."
                },
                len: {
                    args: [3, 50],
                    msg: 'Username must start with a letter, have no spaces, and be 3 - 50 characters.'
                },
            },
        },
        PLAYER_NAME: {
            type: DataTypes.STRING
        },
        PLAYER_EMAIL: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        PLAYER_PHONE: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        PASSWORD: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        PLAYER_MAGESTIC_POINTS: {
            type: DataTypes.DOUBLE,
            defaultValue: 0
        }, 
        PLAYER_MAGESTIC_COINS : {
            type: DataTypes.DOUBLE,
            defaultValue: 0
        },
        ISACTIVE: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
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
    }, { tableName: 'PLAYER' });
    return Player;
};