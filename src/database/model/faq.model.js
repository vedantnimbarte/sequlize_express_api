const { DataTypes } = require('sequelize');


module.exports = async (sequelize) => {
    const Faq = sequelize.define('Faq', {
        FAQ_ID: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        QUESTION: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: "QUESTION can not be empty."
                },
                notEmpty: {
                    args: true,
                    msg: "QUESTION can not be empty."
                },
                len: {
                    args: [3, 255],
                    msg: 'QUESTION must start with a letter, have no spaces, and be 3 - 255 characters.'
                },
            },
        },
        ANSWER: {
            type: DataTypes.TEXT,
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
    }, { tableName: 'FAQ' });
    return Faq;
};