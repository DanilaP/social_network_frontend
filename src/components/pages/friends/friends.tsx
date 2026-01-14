import { Tabs, TabsProps } from 'antd';
import { IFriend, IFriendRequest } from '@/models/friends/model';
import styles from './styles.module.scss';
import FriendsList from './friends-list/friends-list';
import FriendRequestsList from './friend-requests-list/friend-requests-list';

interface IFriendsProps {
    friends: IFriend[],
    friendRequests: IFriendRequest[]
}

const FriendsPage = ({ friends, friendRequests }: IFriendsProps) => {

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'Друзья',
            children: <FriendsList friends = { friends } /> ,
        },
        {
            key: '2',
            label: 'Заявки в друзья',
            children: <FriendRequestsList friendRequests = { friendRequests } /> ,
        },
    ];

    return (
        <div className={ styles.friendsWrapper }>
            <Tabs defaultActiveKey="1" items={ items } />
        </div>
    );
};

export default FriendsPage;