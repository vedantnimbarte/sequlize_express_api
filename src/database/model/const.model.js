const { DataTypes } = require('sequelize');

module.exports = async (sequelize) => {
    const Const = sequelize.define('Const', {
        CONST_ID: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        CONST_NAME: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: "Name can not be empty."
                },
                notEmpty: {
                    args: true,
                    msg: "Name can not be empty."
                },
                len: {
                    args: [3, 255],
                    msg: 'Name must start with a letter, and be 3 - 255 characters.'
                },
            },
        },
        CONST_VALUE: {
            type: DataTypes.TEXT
        },
        CREATE_DATE: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        UPDATE_DATE: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, { tableName: 'CONST' });
    return Const;
};