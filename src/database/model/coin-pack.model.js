const { DataTypes } = require('sequelize');

module.exports = async (sequelize) => {
    const Coinpack = sequelize.define('Coinpack', {
        PACK_ID: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        PACK_NAME: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: "PACK_NAME can not be empty."
                },
                notEmpty: {
                    args: true,
                    msg: "PACK_NAME can not be empty."
                },
                len: {
                    args: [3, 255],
                    msg: 'QUESTION must start with a letter, and be 3 - 255 characters.'
                },
            },
        },
        MAGESTIC_POINTS: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        MAGESTIC_COINS:  {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        BUY_AMOUNT:  {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        DISCOUNT: {
            type: DataTypes.DOUBLE,
            allowNull: false  
        },
        ISOFFER: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
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
    }, { tableName: 'COINPACK' });
    return Coinpack;
};