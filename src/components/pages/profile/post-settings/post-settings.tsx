'use client'
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useState } from 'react';
import { MdOutlineDeleteSweep } from 'react-icons/md';
import { IPost } from '@/models/posts/model';
import styles from './styles.module.scss';

interface IPostSettingsProps {
    deletePost: (id: string) => void,
    post: IPost
}

const PostSettings = ({ deletePost, post } : IPostSettingsProps) => {

    const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

    const handleSwitchSettings = () => {
        setIsSettingsOpen(!isSettingsOpen);
    }

    return (
        <div className={ styles.postSettings }>
            <BsThreeDotsVertical onClick={ handleSwitchSettings } className={ styles.settingsIcon } />
            { isSettingsOpen &&
                <div className={ styles.settingsList }>
                    <div onClick={ () => deletePost(post._id) } className={ styles.settingRow }>
                        <div className={ styles.settingRowName }>Удалить</div>
                        <div className={ styles.settingRowIcon }>
                            <MdOutlineDeleteSweep />
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default PostSettings;