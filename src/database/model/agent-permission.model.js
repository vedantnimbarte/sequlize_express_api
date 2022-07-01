const { DataTypes } = require('sequelize');

module.exports = async (sequelize) => {
    const Agentpermission = sequelize.define('AgentPermission', {
        AGENT_PERMISSION_ID: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        AGENT_PERMISSION_KEY: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: "AGENT_PERMISSION_KEY can not be empty."
                },
                notEmpty: {
                    args: true,
                    msg: "AGENT_PERMISSION_KEY can not be empty."
                },
                len: {
                    args: [3, 100],
                    msg: 'AGENT_PERMISSION_KEY must start with a letter, and be 3 - 100 characters.'
                },
            },
        },
        AGENT_PERMISSION_VALUE: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: "AGENT_PERMISSION_VALUE can not be empty."
                },
                notEmpty: {
                    args: true,
                    msg: "AGENT_PERMISSION_VALUE can not be empty."
                },
                len: {
                    args: [3, 255],
                    msg: 'AGENT_PERMISSION_VALUE must start with a letter, and be 3 - 255 characters.'
                },
            },
        },
        ISVIEW: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
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
        // We also want it to have a 'orchestraId' field, but we don't have to define it here.
		// It will be defined automatically when Sequelize applies the associations.
    }, { tableName: 'AGENTPERMISSION' });
    return Agentpermission;
};