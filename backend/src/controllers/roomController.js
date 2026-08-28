const sequelize = require("../config/db.js");
const { Game, Room, RoomMember } = require("../models/index.js");

const getRooms = async (req, res) => {
    try {
        const rooms = await Room.findAll({
            where: {
                status: "open"
            },
            include: [
                {
                    model: Game,
                    attributes: ["id", "name"]
                }
            ],
            order: [["created_at", "DESC"]]
        });

        return res.status(200).json({
            rooms
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Lỗi server"
        });
    }
};

const creatRoom = async (req, res) => {
    const t = await sequelize.transaction();

    try {
        const host_id = req.user.id;
        let { game_id, title, server, rank_target, max_members } = req.body || {};


        const game = await Game.findByPk(game_id);

        if (!game || game.status === "hidden") {
            await t.rollback();
            return res.status(400).json({ message: "Game không hợp lệ!" });
        }

        const existingRoom = await Room.findOne({
            where: { host_id, status: "open" }
        });

        if(existingRoom) {
            await t.rollback();
            return res.status(400).json({message: "Bạn chỉ được phép tạo một phòng!"});
        }

        title = title?.trim() || `Phòng của ${req.user.username}`;
        server = server?.trim() || "Any";
        rank_target = rank_target?.trim() || "Any";
        max_members = parseInt(max_members) || 5;

        if (max_members < 2 || max_members > 10) {
            await t.rollback();
            return res.status(400).json({ message: "Số lượng thành viên phải từ 2 đến 10" });
        }

        const newRoom = await Room.create(
            {
                host_id,
                game_id,
                title,
                server,
                rank_target,
                max_members,
            },
            {
                transaction: t
            }
        );

        await RoomMember.create(
            {
                room_id: newRoom.id,
                user_id: host_id,
                status: "accepted",
                responded_at: new Date(),
            },
            {
                transaction: t
            }
        );

        await t.commit();

        return res.status(201).json({
            message: "Tạo phòng thành công",
            room: newRoom,
        });

    } catch (error) {
        await t.rollback();
        console.error(error);

        return res.status(500).json({
            message: "Lỗi server"
        });
    }
}

const updateRoom = async (req, res) => {
    try {
        const userId = req.user.id;
        const { roomId } = req.params;
        const { title, server, rank_target } = req.body || {};

        
        const room = await Room.findByPk(roomId);
        
        if (!room || room.status !== "open") {
            return res.status(403).json({ message: "Room không hợp lệ!" });
        }
        
        if (userId !== room.host_id) {
            return res.status(403).json({ message: "Bạn không có quyền chỉnh sửa!" });
        }

        await room.update({
            title: title === undefined ? room.title : title,
            server: server === undefined ? room.server : server,
            rank_target: rank_target === undefined ? room.rank_target : rank_target,
        });

        return res.status(200).json({
            message: "Cập nhật phòng thành công",
            room,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({message: "Lỗi server"});
    }

}




module.exports = {
    getRooms, creatRoom, updateRoom
}
