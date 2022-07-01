
const { DataTypes } = require('sequelize');

module.exports = async (sequelize) => {
    const MenuPermission = sequelize.define('MenuPermission', {
        MENU_PERMISSION_ID: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        ISVIEW: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: false,
        },
        ISUPDATE: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
        },
        ISNEW: {
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
        }
    }, { tableName: 'MENUPERMISSION' });
    return MenuPermission;
};