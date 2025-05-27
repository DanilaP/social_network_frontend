import { IUser } from '@/models/user/model';
import UserCart from '../user-cart/user-cart';
import UsersFilterPanel from '../users-filter-panel/users-filter-panel';
import styles from './styles.module.scss';

const UsersList = (props: { 
    users: Partial<IUser>[]
 }) => {
    return (
        <div className={ styles.usersList }>
            <UsersFilterPanel />
            <div className={ styles.usersList }>
                {
                    props.users.map(user => {
                        return (
                            <UserCart key={ user._id } user={ user } />
                        )
                    })
                }
            </div>
        </div>
    );
};

export default UsersList;