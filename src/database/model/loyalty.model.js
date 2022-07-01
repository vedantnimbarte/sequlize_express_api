
const { DataTypes } = require('sequelize');

module.exports = async (sequelize) => {
    const Loyalty = sequelize.define('Loyalty', {
        LOYALTY_ID: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        LOYALTY_NAME: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: "LOYALTY_NAME can not be empty."
                },
                notEmpty: {
                    args: true,
                    msg: "LOYALTY_NAME can not be empty."
                },
                len: {
                    args: [3, 255],
                    msg: 'LOYALTY_NAME must start with a letter, and be 3 - 255 characters.'
                },
            },
        },
        LOYALTY_START_POINTS: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        LOYALTY_END_POINTS: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        LOYALTY_MULTIPLIER:  {
            type: DataTypes.DOUBLE,
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
    }, { tableName: 'LOYALTY' });
    return Loyalty;
};