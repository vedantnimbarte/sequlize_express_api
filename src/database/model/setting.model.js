const { DataTypes } = require('sequelize');


module.exports = async (sequelize) => {
    const Setting = sequelize.define('Setting', {
        SETTING_ID: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        PAGETITLE: {
            type: DataTypes.STRING,
            allowNull: false
        },
        TITLE: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        DESCRIPTION: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        SLUG_URL: {
            type: DataTypes.STRING,
            allowNull: true,
        }, 
        CREATE_DATE: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        UPDATE_DATE: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, { tableName: 'SETTING' });
    return Setting;
};