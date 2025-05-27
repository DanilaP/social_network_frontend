import { fetchWithAuth } from "@/middleware/fetch-api";
import { IUser } from "@/models/user/model";
import { notFound } from "next/navigation";
import ProfileWrapper from "@/components/profile-components/profile-wrapper/profile-wrapper";

async function fetchUserData(id: string) {
    const user: IUser = await fetchWithAuth(
        `${process.env.NEXT_PUBLIC_API}/users`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ _id: id })
        }
    )
        .then(response => response.json())
        .then(data => data?.users[0]);
    return user;
};

export default async function User({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params;
    const user = await fetchUserData(id);

    if (user) {
        return (
            <ProfileWrapper user={ user } />
        )
    } else {
        notFound();
    }
}