
const { DataTypes } = require('sequelize');

module.exports = async (sequelize) => {
    const Slider = sequelize.define('Slider', {
        SLIDER_ID: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        SLIDER_NAME: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: "SLIDER_NAME can not be empty."
                },
                notEmpty: {
                    args: true,
                    msg: "SLIDER_NAME can not be empty."
                },
                len: {
                    args: [3, 255],
                    msg: 'SLIDER_NAME must start with a letter, and be 3 - 255 characters.'
                },
            },
        },
        SLIDER_IMAGE_URL: {
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
    }, { tableName: 'SLIDER' });
    return Slider;
};