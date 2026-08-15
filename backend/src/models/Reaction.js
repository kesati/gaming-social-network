const { DataTypes } = require('sequelize');
const sequelize = require("../config/db.js");

const Reaction = sequelize.define('Reaction',
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
        reaction_type: {
            type: DataTypes.ENUM('like'),
            defaultValue: 'like'
        }
    },
    {
        tableName: 'reactions',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: false,
        indexes: [
            {
                unique: true,
                fields: ['post_id', 'user_id']
            }
        ]
    }

);

module.exports = Reaction;