import { fetchWithAuth } from "@/middleware/fetch-api";
import { notFound } from "next/navigation";
import { IFriend } from "@/models/friends/model";
import FriendsPage from "@/components/pages/friends/friends";

async function fetchFriendsData() {
    const friends: IFriend[] = await fetchWithAuth(
        `${process.env.NEXT_PUBLIC_API}/friends`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        }
    )
        .then(response => response.json())
        .then(data => data?.friends);
    return friends;
};

export default async function Friends() {
    const friends = await fetchFriendsData();

    if (friends) {
        return (
            <FriendsPage friends={ friends } />
        )
    } else {
        notFound();
    }
}