
const { DataTypes } = require('sequelize');

module.exports = async (sequelize) => {
    const AgentTransaction = sequelize.define('AgentTransaction', {
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
        MAGESTIC_COINS:  {
            type: DataTypes.DOUBLE
        },
        BUY_AMOUNT:  {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        DISCOUNT: {
            type: DataTypes.DOUBLE,
            defaultValue: 0
        },
        ISOFFER: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        ISREVOKE: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, { tableName: 'AGENTTRANSACTION' });
    return AgentTransaction;
};