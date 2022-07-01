
const { DataTypes } = require('sequelize');
const Sequelize = require("sequelize")
module.exports = async (sequelize) => {
    const PlayerTransaction = sequelize.define('PlayerTransaction', {
        TRANSACTION_ID: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        CREATE_DATE: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        UPDATE_DATE: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        MAGESTIC_POINTS: {
            type: DataTypes.DOUBLE
        },
        MAGESTIC_COINS: {
            type: DataTypes.DOUBLE
        },
        ISREVOKE: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        TYPE: Sequelize.ENUM("WITHDRAW", "DEPOSIT"),
    }, { tableName: 'PLAYERTRANSACTION' });
    return PlayerTransaction;
};