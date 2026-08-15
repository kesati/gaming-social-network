const { DataTypes } = require('sequelize');
const sequelize = require("../config/db.js");

const Comment = sequelize.define('Comment',
    {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        post_id: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        user_id: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        content: {
            type: DataTypes.STRING(500),
            allowNull: false
        }
    },
    {
        tableName: 'comments',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }

);

module.exports = Comment;