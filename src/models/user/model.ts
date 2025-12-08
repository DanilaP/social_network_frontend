import { IPost } from "../posts/model";
import $api from "@/configs/axios"

export interface IUser {
    _id: string,
    name: string,
    email: string,
    avatar: string,
    status: string,
    role: string,
    friends: string[],
    posts: IPost[],
    friendRequests: [],
    dialogs: string[]
}

export const getUserData = async () => {
    const response = await $api.get("/user");
    return response;
}

export const signIn = async (email: string, password: string) => {
    const response = await $api.post("/auth/login", { email, password });
    return response;
}

export const signUp = async (name: string, email: string, password: string) => {
    const response = await $api.post("/auth/registration", { name, email, password });
    return response;
}

export const logout = async () => {
    const response = await $api.post("/auth/logout");
    return response;
}

export const changeUserInfo = async (userInfo: Partial<IUser>) => {
    const formData = new FormData();
    formData.append('user', JSON.stringify(userInfo));
    const response = await $api.post("/user/edit", formData);
    return response;
}