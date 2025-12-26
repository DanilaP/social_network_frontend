import { Tabs, TabsProps } from 'antd';
import { IFriend } from '@/models/friends/model';
import styles from './styles.module.scss';
import FriendsList from './friends-list/friends-list';

interface IFriendsProps {
    friends: IFriend[]
}

const FriendsPage = ({ friends }: IFriendsProps) => {

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'Друзья',
            children: <FriendsList friends = { friends } /> ,
        },
        {
            key: '2',
            label: 'Заявки в друзья',
            children: 'Content of Tab Pane 1',
        },
    ];

    return (
        <div className={ styles.friendsWrapper }>
            <Tabs defaultActiveKey="1" items={ items } />
        </div>
    );
};

export default FriendsPage;