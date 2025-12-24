import { IFriend } from '@/models/friends/model';
import { LuMessageCircleMore } from "react-icons/lu";
import { useRouter } from 'next/navigation';
import React from 'react';
import styles from './styles.module.scss';

interface IFriendCardProps {
    friend: IFriend
}

const FriendCard = ({ friend } : IFriendCardProps) => {

    const router = useRouter();

    return (
        <div key={ friend._id } className={ styles.friendCard }>
            <div className={ styles.avatar }>
                <img 
                    onClick={ () => router.push(`/main/user/${ friend._id }`) }  
                    className={ styles.avatarImage } 
                    src={ friend.avatar } 
                />
            </div>
            <div className={ styles.settings }>
                <div className={ styles.name }>{ friend.name }</div>
                <div className={ styles.writingMessageButton }>
                    <LuMessageCircleMore fontSize={ 15 } />
                    <div className={ styles.text }>Написать сообщение</div>
                </div>
            </div>
        </div>
    );
};

export default FriendCard;