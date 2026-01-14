"use client";
import { IFriendRequest } from '@/models/friends/model';
import { useState } from 'react';
import styles from './styles.module.scss';
import FriendRequestsListSettings from '../friend-requests-list-settings/friend-requests-list-settings';
import FriendRequestCard from '../friend-request-card/friend-request-card';

interface IFriendRequestsListProps {
    friendRequests: IFriendRequest[]
}

const FriendRequestsList = ({ friendRequests }: IFriendRequestsListProps) => {

    const [filteredFriendRequests, setFilteredRequests] = useState<IFriendRequest[]>(friendRequests);

    const handleFilterFriendRequests = (userName: string) => {
        setFilteredRequests(prev => prev.filter(userInfo => userInfo.name === userName));
    }

    return (
        <div className={ styles.friendRequestsList }>
            <FriendRequestsListSettings handleFilterFriendRequests = { handleFilterFriendRequests } />
            {
                filteredFriendRequests.map(friendRequest => {
                    return <FriendRequestCard key={ friendRequest._id } friendRequest={ friendRequest } />
                })
            }
        </div>
    );
};

export default FriendRequestsList;