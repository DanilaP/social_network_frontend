import { IUser } from '@/models/user/model';
import { fetchWithAuth } from '@/middleware/fetch-api';
import UsersList from '@/partials/users-list/users-list';

async function fetchUsersData() {
    const users: Partial<IUser>[] = await fetchWithAuth(
        `${process.env.NEXT_PUBLIC_API}/users`
    )
        .then(response => response.json())
        .then(data => data.users);
    return users;
};

const Users = async () => {
    
    const users = await fetchUsersData();

    return (
        <UsersList users = { users } />
    );
};

export default Users;