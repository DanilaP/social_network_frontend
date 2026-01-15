"use client"
import { Tabs, TabsProps } from 'antd';
import { IFriend, IFriendRequest } from '@/models/friends/model';
import { useState } from 'react';
import styles from './styles.module.scss';
import FriendsList from './friends-list/friends-list';
import FriendRequestsList from './friend-requests-list/friend-requests-list';

interface IFriendsProps {
    friends: IFriend[],
    friendRequests: IFriendRequest[]
}

const FriendsPage = ({ friends, friendRequests }: IFriendsProps) => {

    const [updatedFriendsList, setUpdatedFriendsList] = useState(friends);
    const [updatedFriendRequestList, setUpdatedFriendRequestList] = useState(friendRequests);

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: `Друзья (${ updatedFriendsList.length })`,
            children: 
                <FriendsList 
                    updatedFriendsList = { setUpdatedFriendsList } 
                    friends = { updatedFriendsList } 
                /> ,
        },
        {
            key: '2',
            label: `Заявки в друзья (${ updatedFriendRequestList.length })`,
            children: 
                <FriendRequestsList 
                    updateFriendRequestsList = { setUpdatedFriendRequestList } 
                    friendRequests = { updatedFriendRequestList } 
                /> ,
        },
    ];

    return (
        <div className={ styles.friendsWrapper }>
            <Tabs defaultActiveKey="1" items={ items } />
        </div>
    );
};

export default FriendsPage;