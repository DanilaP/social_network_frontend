"use client"
import { IFriend } from '@/models/friends/model';
import { useState } from 'react';
import styles from './styles.module.scss';
import FriendCard from '../friend-card/friend-card';
import FriendsListSettings from '../friends-list-settings/friends-list-settings';

interface IFriendsListProps {
    friends: IFriend[]
}

const FriendsList = ({ friends }: IFriendsListProps) => {

    const [filteredFriends, setFilteredFriends] = useState(friends);

    const handleFilterFriends = (str: string) => {
        if (str) {
            setFilteredFriends(prev => prev.filter(friend => friend.name.toLowerCase().includes(str.toLowerCase())));
        }
        else {
            setFilteredFriends(friends);
        }
    }

    return (
        <div className={ styles.friendsList }>
            <FriendsListSettings handleFilterFriends = { handleFilterFriends } />
            {
                filteredFriends.map(friend => {
                    return (
                        <FriendCard 
                            key={ friend._id } 
                            friend={ friend } 
                        />
                    )
                })
            }
        </div>
    );
};

export default FriendsList;