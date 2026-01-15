import { deleteFriend, IFriend } from '@/models/friends/model';
import { LuMessageCircleMore } from "react-icons/lu";
import { useRouter } from 'next/navigation';
import { Button, message } from 'antd';
import React, { Dispatch, SetStateAction } from 'react';
import styles from './styles.module.scss';

interface IFriendCardProps {
    friend: IFriend, 
    updatedFriendsList: Dispatch<SetStateAction<IFriend[]>>
}

const FriendCard = ({ friend, updatedFriendsList } : IFriendCardProps) => {

    const [messageApi, contextHolder] = message.useMessage();
    const router = useRouter();

    const handleDeleteFriend = async () => {
        deleteFriend(friend._id)
        .then((res) => {
            updatedFriendsList(prev => prev.filter((el) => el._id !== friend._id));
            messageApi.open({
                type: 'success',
                content: `${ friend.name } успешно удален из списка ваших друзей`,
            });
            console.log(res);
        })
        .catch((error) => {
            messageApi.open({
                type: 'error',
                content: `Ошибка при удалении друга`,
            });
            console.error(error);
        })
    }

    return (
        <div key={ friend._id } className={ styles.friendCard }>
            { contextHolder }
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
            <div className={ styles.editingButtons }>
                <Button 
                    onClick={ handleDeleteFriend }
                    className={ styles.editingButton } 
                    variant='solid' 
                    color='danger'
                >
                    Удалить
                </Button>
            </div>
        </div>
    );
};

export default FriendCard;