const { DataTypes } = require('sequelize');

module.exports = async (sequelize) => {
    const Menu = sequelize.define('Menu', {
        MENU_ID: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        MENU_NAME: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: "MENU_NAME can not be empty."
                },
                notEmpty: {
                    args: true,
                    msg: "MENU_NAME can not be empty."
                },
                len: {
                    args: [3, 255],
                    msg: 'MENU_NAME must start with a letter, and be 3 - 255 characters.'
                },
            },
        },
        MENU_SLUG: {
            type: DataTypes.TEXT,
            allowNull: false
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
    }, { tableName: 'MENU' });
    return Menu;
};