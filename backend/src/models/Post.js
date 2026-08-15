const { DataTypes } = require('sequelize');
const sequelize = require("../config/db.js");

const Post = sequelize.define('Post',
    {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        game_id: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        image_url: {
            type: DataTypes.STRING(255)
        },
        is_pinned: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        status: {
            type: DataTypes.ENUM('visible', 'deleted'),
            defaultValue: 'visible'
        }
    },
    {
        tableName: 'posts',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }

);

module.exports = Post;