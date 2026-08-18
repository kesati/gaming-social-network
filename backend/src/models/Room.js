const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Room = sequelize.define("Room",
    {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        host_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        game_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING(150),
            allowNull: false,
        },
        server: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        rank_target: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        max_members: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM("open", "closed", "hidden"),
            defaultValue: "open",
        },
    },
    {
        tableName: "rooms",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
);

module.exports = Room;