"use client"
import { acceptFriendRequest, deleteFriendRequest, IFriend, IFriendRequest } from '@/models/friends/model';
import { useRouter } from 'next/navigation';
import { LuMessageCircleMore } from 'react-icons/lu';
import { Button, message } from 'antd';
import { Dispatch, SetStateAction } from 'react';
import styles from './styles.module.scss';

interface IFriendRequestCardProps {
    friendRequest: IFriendRequest,
    updateFriendRequestsList: Dispatch<SetStateAction<IFriendRequest[]>>,
    updateFriendsList: Dispatch<SetStateAction<IFriend[]>>
}

const FriendRequestCard = ({ 
    friendRequest, 
    updateFriendRequestsList,
    updateFriendsList 
}: IFriendRequestCardProps) => {

    const [messageApi, contextHolder] = message.useMessage();
    const router = useRouter();

    const handleAcceptFriendRequest = () => {
        acceptFriendRequest(friendRequest._id)
        .then((res) => {
            updateFriendRequestsList(prev => prev.filter(el => el._id !== friendRequest._id));
            updateFriendsList(prev => [...prev, { ...friendRequest, status: "" }]);
            messageApi.open({
                type: 'success',
                content: `${ friendRequest.name } добавлен в список ваших друзей`,
            });
            console.log(res);
        })
        .catch((error) => {
            messageApi.open({
                type: 'error',
                content: `Ошибка при добавлении друга`,
            });
            console.error(error);
        })
    }

    const handleDeleteFriendRequest = () => {
        deleteFriendRequest(friendRequest._id)
        .then((res) => {
            updateFriendRequestsList(prev => prev.filter(el => el._id !== friendRequest._id));
            messageApi.open({
                type: 'success',
                content: `Заявка успешно отклонена`,
            });
            console.log(res);
        })
        .catch((error) => {
            messageApi.open({
                type: 'error',
                content: `Ошибка при отклонении заявки в друзья`,
            });
            console.error(error);
        })
    }

    return (
        <div key={ friendRequest._id } className={ styles.friendRequestCard }>
            { contextHolder }
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
            <div className={ styles.acceptionButtons }>
                <Button 
                    onClick={ handleAcceptFriendRequest }
                    className={ styles.acceptionButton } 
                    type='primary'
                >
                    Добавить в друзья
                </Button>
                <Button 
                    onClick={ handleDeleteFriendRequest }
                    className={ styles.acceptionButton } 
                    variant='solid' 
                    color='danger'
                >
                    Отменить заявку
                </Button>
            </div>
        </div>
    );
};

export default FriendRequestCard;