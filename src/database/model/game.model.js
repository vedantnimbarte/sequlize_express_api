const { DataTypes } = require('sequelize');

module.exports = async (sequelize) => {
    const Game = sequelize.define('Game', {
        GAME_ID: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        GAME_NAME: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: "GAME_NAME can not be empty."
                },
                notEmpty: {
                    args: true,
                    msg: "GAME_NAME can not be empty."
                },
                len: {
                    args: [3, 255],
                    msg: 'GAME_NAME must start with a letter, and be 3 - 255 characters.'
                },
            },
        },
        GAME_URL: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        GAME_IMAGE: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        DESCRIPTION: {
            type: DataTypes.STRING(100),
            allowNull: true
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
        }
    }, { tableName: 'GAME' });
    return Game;
};