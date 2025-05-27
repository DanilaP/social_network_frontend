"use client";
import { Button } from 'antd';
import { useState } from 'react';
import { changeUserInfo } from '@/models/user/model';
import styles from './styles.module.scss';
import TextArea from 'antd/es/input/TextArea';

const StatusEditor = (props: {
    status: string,
    close: (value: boolean) => void,
    setStatus: (value: string) => void
}) => {

    const [editedStatus, setEditedStatus] = useState(props.status);

    const changeStatus = () => {
        changeUserInfo({ status: editedStatus })
        .then(() => {
            props.setStatus(editedStatus);
            props.close(false);
        })
        .catch((error) => {
            console.error(error);
        })
    }

    return (
        <div className={ styles.statusEditor }>
            <TextArea 
                className={ styles.textArea }
                showCount
                maxLength={ 250 }
                onChange={ (e) => setEditedStatus(e.target.value) }
                defaultValue={ props.status } 
                placeholder='Статус' 
                style={{ resize: "none" }}
            />
            <div className={ styles.settings }>
                <Button type='primary' onClick={ changeStatus }>Изменить</Button>
                <Button type='primary' danger onClick={ () => props.close(false) }>Отменить</Button>
            </div>
        </div>
    );
};

export default StatusEditor;