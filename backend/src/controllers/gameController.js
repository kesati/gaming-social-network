const { Game } = require("../models/index.js");


const getAllGame = async (req, res) => {
    try {
        const games = await Game.findAll({
            where: { status: "active"},
            order: [['name', 'ASC']]
        });

        return res.status(200).json({
            total: games.length,
            games
        });

    } catch (error) {
        
        console.error(error);

        return res.status(500).json({
            message: "Lỗi server"
        });
    }
}

const createGame = async (req, res) => {
    // viết sau khi có admin
}

module.exports = {
    getAllGame, createGame
}