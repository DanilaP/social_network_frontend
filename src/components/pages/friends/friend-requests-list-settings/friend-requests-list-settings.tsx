"use client";
import { Button, Input } from 'antd';
import { useState } from 'react';
import styles from './styles.module.scss';

interface IFriendRequestsListSettings {
    handleFilterFriendRequests: (str: string) => void,
}

const FriendRequestsListSettings = ({ handleFilterFriendRequests }: IFriendRequestsListSettings) => {

    const [currentInputStringValue, setCurrentInputStringValue] = useState<string>("");

    const handleFindFriendRequests = () => {
        handleFilterFriendRequests(currentInputStringValue);
    }

    return (
        <div className={ styles.friendRequestsListSettings }>
            <Input
                onChange={ (e) => setCurrentInputStringValue(e.target.value) } 
                placeholder='Поиск' 
            />
            <Button onClick={ handleFindFriendRequests } type='primary'>Найти</Button>
        </div>
    );
};

export default FriendRequestsListSettings;