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
    user_id: string,
    avatar: string,
    name: string,
    text: string,
    files: IFile[],
    likes: ILike[]
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