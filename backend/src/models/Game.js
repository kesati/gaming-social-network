const { DataTypes } = require('sequelize');
const sequelize = require("../config/db.js");

const Game = sequelize.define('Game',
    {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true
        },
        logo_url: {
            type: DataTypes.STRING(255)
        },
        status: {
            type: DataTypes.ENUM('active', 'hidden'),
            defaultValue: 'active'
        }
    },
    {
        tableName: 'games',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: false

    }

);

module.exports = Game;