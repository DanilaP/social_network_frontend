"use client";
import { IFriendRequest } from '@/models/friends/model';
import { Dispatch, SetStateAction, useState } from 'react';
import styles from './styles.module.scss';
import FriendRequestsListSettings from '../friend-requests-list-settings/friend-requests-list-settings';
import FriendRequestCard from '../friend-request-card/friend-request-card';

interface IFriendRequestsListProps {
    friendRequests: IFriendRequest[],
    updateFriendRequestsList: Dispatch<SetStateAction<IFriendRequest[]>>
}

const FriendRequestsList = ({ friendRequests, updateFriendRequestsList }: IFriendRequestsListProps) => {

    const [filteredFriendRequests, setFilteredRequests] = useState<IFriendRequest[]>(friendRequests);

    const handleFilterFriendRequests = (userName: string) => {
        setFilteredRequests(prev => prev.filter(userInfo => userInfo.name === userName));
    }

    return (
        <div className={ styles.friendRequestsList }>
            <FriendRequestsListSettings handleFilterFriendRequests = { handleFilterFriendRequests } />
            {
                filteredFriendRequests.map(friendRequest => {
                    return (
                        <FriendRequestCard 
                            updateFriendRequestsList = { updateFriendRequestsList } 
                            key={ friendRequest._id } 
                            friendRequest={ friendRequest } 
                        />
                    )
                })
            }
        </div>
    );
};

export default FriendRequestsList;