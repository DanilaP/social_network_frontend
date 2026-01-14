"use client"
import { IFriendRequest } from '@/models/friends/model';
import { useRouter } from 'next/navigation';
import { LuMessageCircleMore } from 'react-icons/lu';
import styles from './styles.module.scss';

interface IFriendRequestCardProps {
    friendRequest: IFriendRequest
}

const FriendRequestCard = ({ friendRequest }: IFriendRequestCardProps) => {

    const router = useRouter();

    return (
        <div key={ friendRequest._id } className={ styles.friendRequestCard }>
            <div className={ styles.avatar }>
                <img 
                    onClick={ () => router.push(`/main/user/${ friendRequest._id }`) }  
                    className={ styles.avatarImage } 
                    src={ friendRequest.avatar } 
                />
            </div>
            <div className={ styles.settings }>
                <div className={ styles.name }>{ friendRequest.name }</div>
                <div className={ styles.writingMessageButton }>
                    <LuMessageCircleMore fontSize={ 15 } />
                    <div className={ styles.text }>Написать сообщение</div>
                </div>
            </div>
        </div>
    );
};

export default FriendRequestCard;