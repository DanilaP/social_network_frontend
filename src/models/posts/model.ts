import $api from "@/configs/axios";

export interface IPost {
    _id: string,
    user_id: string,
    date: string,
    text: string,
    files: IFile[],
    likes: ILike[],
    comments: IComment[],
    isPostLikedByUser: boolean
}

export interface IFile {
    url: string,
    name: string,
    size: number,
    fileType: string
}

export interface IComment {
    _id: string,
    user_id: string,
    avatar: string,
    name: string,
    text: string,
    files: IFile[],
    likes: ILike[] | string[]
}

export interface ILike {
    _id: string,
    avatar: string,
    name: string,
}

export const getUserPosts = async (userId: string) => {
    const response = await $api.get(`/post?id=${ userId }`);
    return response;
}

export const deletePostById = async (postId: string) => {
    const response = await $api.delete(`/post?id=${ postId }`);
    return response;
}

export const createPost = async (postInfo: FormData) => {
    const response = await $api.post("/post", postInfo);
    return response;
}

export const likePost = async (postId: string) => {
    const response = await $api.post("/post/like", { id: postId });
    return response;
}

export const getPostById = async (postId: string) => {
    const response = await $api.get(`/post/get-post-by-id?id=${ postId }`);
    return response;
}

export const createCommentForPost = async (postId: string, text: string) => {
    const response = await $api.post("/post/comment", {
        postId, text
    });
    return response;
}

export const likeComment = async (commentId: string, postId: string) => {
    const response = await $api.post("/post/comment/like", { comment_id: commentId, id: postId });
    return response;
}