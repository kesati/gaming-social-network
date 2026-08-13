const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const UserProfile = sequelize.define(
    "UserProfile",
    {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },

        user_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            unique: true,
        },

        avatar_url: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },

        bio: {
            type: DataTypes.STRING(300),
            allowNull: true,
        },

        favorite_game: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },

        main_rank: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },

        play_time: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },

        preferred_role: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
    },
    {
        tableName: "user_profiles",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
);

module.exports = UserProfile;