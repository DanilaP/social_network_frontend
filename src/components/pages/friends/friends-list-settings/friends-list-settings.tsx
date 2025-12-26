"use client"
import { Button, Input } from 'antd';
import { useState } from 'react';
import styles from './styles.module.scss';

interface IFriendsListSettingsProps {
    handleFilterFriends: (str: string) => void
}

const FriendsListSettings = ({ handleFilterFriends }: IFriendsListSettingsProps) => {

    const [currentInputStringValue, setCurrentInputStringValue] = useState<string>("");

    const handleFindFriends = () => {
        handleFilterFriends(currentInputStringValue);
    }

    return (
        <div className={ styles.friendsListSettings }>
            <Input
                onChange={ (e) => setCurrentInputStringValue(e.target.value) } 
                placeholder='Поиск' 
            />
            <Button onClick={ handleFindFriends } type='primary'>Найти</Button>
        </div>
    );
};

export default FriendsListSettings;