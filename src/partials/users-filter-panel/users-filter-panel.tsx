"use client";
import { Button, Input } from 'antd';
import { FaUserEdit } from "react-icons/fa";
import styles from './styles.module.scss';

const UsersFilterPanel = () => {
    return (
        <div className={ styles.filterPanel }>
            <div className={ styles.filters }>
                <Input className={ styles.filterInput } placeholder="Имя пользователя" prefix={<FaUserEdit />} />
                <Button type='primary'>Найти</Button>
            </div>
        </div>
    );
};

export default UsersFilterPanel;