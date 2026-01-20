"use client"
import { IFriend } from '@/models/friends/model';
import { Dispatch, SetStateAction, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './styles.module.scss';
import FriendCard from '../friend-card/friend-card';
import FriendsListSettings from '../friends-list-settings/friends-list-settings';

interface IFriendsListProps {
    friends: IFriend[],
    updatedFriendsList: Dispatch<SetStateAction<IFriend[]>>
}

const FriendsList = ({ friends, updatedFriendsList }: IFriendsListProps) => {

    const [filteredFriends, setFilteredFriends] = useState(friends);
    const router = useRouter();
    
    const handleFilterFriends = (str: string) => {
        if (str) {
            setFilteredFriends(prev => prev.filter(friend => friend.name.toLowerCase().includes(str.toLowerCase())));
        }
        else {
            setFilteredFriends(friends);
        }
    }

    if (friends.length === 0) {
        return (
            <div className={ styles.emptyList }>
                <div className={ styles.title }>
                    Список ваших друзей пуст.
                </div>
                <div onClick={ () => router.push(`/main/users`) } className={ styles.content }>
                    Найти друзей
                </div>
            </div>
        )
    }
    else return (
        <div className={ styles.friendsList }>
            <FriendsListSettings handleFilterFriends = { handleFilterFriends } />
            {
                filteredFriends.map(friend => {
                    return (
                        <FriendCard 
                            updatedFriendsList = { updatedFriendsList }
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