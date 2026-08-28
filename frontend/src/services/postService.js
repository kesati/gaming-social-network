import api from "./api"


export const getAllPosts = async () => {
    const response = await api.get("/posts");
    return response.data;
}

export const createPost = async (postData) => {
    const response = await api.post("/posts", postData);
    return response.data;
}

export const toggleReaction = async (postId) => {
    const response = await api.post(`/posts/${postId}/reactions`);
    return response.data;
}

export const getReactionsByPost = async (postId) => {
    const response = await api.get(`/posts/${postId}/reactions`);
    return response.data;
}
