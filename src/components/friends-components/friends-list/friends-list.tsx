"use client"
import { IFriend } from '@/models/friends/model';
import styles from './styles.module.scss';
import FriendCard from '../friend-card/friend-card';

interface IFriendsListProps {
    friends: IFriend[]
}

const FriendsList = ({ friends }: IFriendsListProps) => {

    return (
        <div className={ styles.friendsList }>
            {
                friends.map(friend => {
                    return (
                        <FriendCard key={ friend._id } friend={ friend } />
                    )
                })
            }
        </div>
    );
};

export default FriendsList;