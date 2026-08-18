const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const RoomMember = sequelize.define("RoomMember",
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
        user_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM("pending", "accepted", "rejected", "left"),
            defaultValue: "pending",
        },
        requested_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        responded_at: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        tableName: "room_members",
        timestamps: false,
        indexes: [
            {
                unique: true,
                fields: ["room_id", "user_id"],
            },
        ],
    }
);

module.exports = RoomMember;