import { Button, Input } from 'antd';
import styles from './styles.module.scss';

const FriendsListSettings = () => {
    return (
        <div className={ styles.friendsListSettings }>
            <Input placeholder='Поиск' />
            <Button>Найти</Button>
        </div>
    );
};

export default FriendsListSettings;