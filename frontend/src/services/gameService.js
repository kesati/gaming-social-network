import api from "./api";

export const getAllGames = async () => {
    const response = await api.get("/games");
    return response.data;
};