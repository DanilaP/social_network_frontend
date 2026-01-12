"use client";
import { IUser } from '@/models/user/model';
import { Button } from 'antd';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { UserStore } from '@/stores/user-store';
import styles from './styles.module.scss';

const UserCart = (props: {
    user: Partial<IUser>
}) => {

    const user = useSelector((store: UserStore) => store.user);
    const isUserInFriendsList = props.user._id && user?.friends.includes(props.user._id);
    const router = useRouter();

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
                <Button className={ styles.settingsButton } type = "primary">Написать сообщение</Button>
                {   
                    isUserInFriendsList
                        ?  
                            <Button 
                                className={ styles.settingsButton } 
                                variant='solid'
                                color='danger'
                            >
                                Удалить из друзей
                            </Button>
                        :
                            <Button 
                                className={ styles.settingsButton } 
                                type = { "primary" }
                            >
                                Добавить в друзья
                            </Button>
                }
            </div>
        </div>
    );
};

export default UserCart;