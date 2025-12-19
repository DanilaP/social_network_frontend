import $api from "@/configs/axios"

export interface IFriend extends IFriendRequest {
    status: string
}

export interface IFriendRequest {
    _id: string,
    name: string,
    avatar: string
}

export const getFriendRequests = async () => {
    const response = await $api.get("/friends/get-friend-requests");
    return response;
}

export const getFriendsList = async () => {
    const response = await $api.get("/friends");
    return response;
}

export const sendFriendRequest = async (id: string) => {
    const response = await $api.post("/friends/send-friend-request", { id });
    return response;
}

export const acceptFriendRequest = async (id: string) => {
    const response = await $api.post("/friends/accept-friend-request", { id });
    return response;
}

export const deleteFriendRequest = async (id: string) => {
    const response = await $api.post("/friends/delete-friend-request", { id });
    return response;
}

export const deleteFriend = async (id: string) => {
    const response = await $api.delete(`/friends?id=${ id }`);
    return response;
}