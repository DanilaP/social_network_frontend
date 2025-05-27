"use client";
import { IUser } from '@/models/user/model';
import { Button } from 'antd';
import { useRouter } from 'next/navigation';
import styles from './styles.module.scss';

const UserCart = (props: {
    user: Partial<IUser>
}) => {

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
                <Button className={ styles.settingsButton } type = "primary">Добавить в друзья</Button>
            </div>
        </div>
    );
};

export default UserCart;