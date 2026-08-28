import api from "./api"


export const getComment = async (postId) => {
    const response = await api.get(`/post/${postId}/comments`);
    return response.data;
}

export const creatComment = async (postId, content) => {
    const response = await api.post(`/post/${postId}/comments`, {content});
    return response.data;
}

export const deleteComment = async (postId, commentId) => {
    const response = await api.delete(`/post/${postId}/comments/${commentId}`);
    return response.data;
}