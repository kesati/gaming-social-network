const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Message = sequelize.define("Message",
    {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        room_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        sender_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        content: {
            type: DataTypes.STRING(1000),
            allowNull: false,
        },
    },
    {
        tableName: "messages",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: false,
    }
);

module.exports = Message;