"use client";
import { IUser } from '@/models/user/model';
import { Button } from 'antd';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { deleteFriend, deleteFriendRequest, sendFriendRequest } from '@/models/friends/model';
import { UserStore } from '@/stores/user-store';
import { useEffect, useState } from 'react';
import styles from './styles.module.scss';

const UserCart = (props: {
    user: Partial<IUser>
}) => {

    const user = useSelector((store: UserStore) => store.user);
    const modifiedUser = user;
    const [isUserInFriendsList, setIsUserInFriendsList] = useState<boolean>(false);
    const [isUserInFriendRequestsList, setIsUserInFriendRequestsList] = useState<boolean>(false);
    const router = useRouter();

    const handleSendFriendRequest = () => {
        if (props.user._id) {
            sendFriendRequest(props.user._id)
            .then((res) => {
                setIsUserInFriendRequestsList(true);
                console.log(res);
            })
            .catch((error) => {
                console.error(error);
            })
        }
    }

    const handleDeleteFriendRequest = () => {
        if (props.user._id) {
            deleteFriendRequest(props.user._id)
            .then((res) => {
                setIsUserInFriendRequestsList(false);
                console.log(res);
            })
            .catch((error) => {
                console.error(error);
            })
        }
    }

    const handleDeleteFriend = () => {
        if (props.user._id) {
            deleteFriend(props.user._id)
            .then((res) => {
                setIsUserInFriendsList(false);
                console.log(res);
            })
            .catch((error) => {
                console.error(error);
            })
        }
    }

    useEffect(() => {
        if (props.user._id && modifiedUser) {
            setIsUserInFriendsList(modifiedUser.friends.includes(props.user._id));
            setIsUserInFriendRequestsList(modifiedUser.sendedFriendRequests.includes(props.user._id))
        }
    }, []);

    return (
        <div className={ styles.userCart }>
            <img 
                onClick={ () => router.push(`/main/user/${ props.user._id }`) } 
                className={ styles.avatar } 
                src={ props.user.avatar } 
            />
            <div className={ styles.info }>
                <div className={ styles.name }>{ props.user.name }</div>
                <div className={ styles.status }>{ props.user.status }</div>
            </div>
            <div className={ styles.settings }>
                {
                    props.user._id !== user?._id && 
                    <Button className={ styles.settingsButton } type = "primary">
                        Написать сообщение
                    </Button>
                }
                {  
                    props.user._id !== user?._id 
                    ? 
                        isUserInFriendsList
                            ?  
                                <Button 
                                    onClick={ handleDeleteFriend }
                                    className={ styles.settingsButton } 
                                    variant='solid'
                                    color='danger'
                                >
                                    Удалить из друзей
                                </Button>
                            :
                                !isUserInFriendRequestsList 
                                    ?
                                        <Button 
                                            onClick={ handleSendFriendRequest }
                                            className={ styles.settingsButton } 
                                            type = { "primary" }
                                        >
                                            Добавить в друзья
                                        </Button>
                                    : 
                                        <Button 
                                            onClick={ handleDeleteFriendRequest }
                                            className={ styles.settingsButton } 
                                            type = { "primary" }
                                        >
                                            Отменить заявку
                                        </Button>
                    : null
                }
            </div>
        </div>
    );
};

export default UserCart;