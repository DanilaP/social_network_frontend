"use client"
import { IUser } from '@/models/user/model';
import { IPost } from '@/models/posts/model';
import { IoAddOutline } from "react-icons/io5";
import { BsPostcard } from "react-icons/bs";
import { MdEdit } from "react-icons/md";
import { Button, Spin } from 'antd';
import { Dispatch, SetStateAction } from 'react';
import PostsList from '../posts-list/posts-list';
import styles from './styles.module.scss';

interface IProfileHeaderProps {
    user: IUser,
    authorizedUserInfo: IUser,
    posts: IPost[],
    setAvatarChangerOpen: (value: boolean) => void,
    setStatusEditorOpen: (value: boolean) => void,
    setPostsCreatorOpen: (value: boolean) => void,
    setPosts: Dispatch<SetStateAction<IPost[] | undefined>>,
    status: string
}
    
const ProfileHeader = ({ 
    user, 
    authorizedUserInfo,
    posts, 
    setAvatarChangerOpen,
    setStatusEditorOpen,
    setPostsCreatorOpen,
    setPosts,
    status
} : IProfileHeaderProps) => {

    return (
        <div className={ styles.profileContent }>
            <div className={ styles.header }>
                <div className={ styles.avatar }>
                    {
                        user._id === authorizedUserInfo._id &&
                            <IoAddOutline 
                                onClick={ () => setAvatarChangerOpen(true) } 
                                className={ styles.changeAvatarIcon } 
                            />
                    }
                    <img className={ styles.avatarImage } src = {  user.avatar } />
                </div>
                <div className={ styles.info }>
                    <div className={ styles.name }>
                        { user.name }
                        { 
                        user._id === authorizedUserInfo._id 
                            && 
                                <MdEdit 
                                    onClick={ () => setStatusEditorOpen(true) } 
                                    className={ styles.editIcon } 
                                /> 
                        }
                    </div>
                    <div className={ styles.status }>{ status }</div>
                    <div className={ styles.settings }>
                        { 
                            user._id === authorizedUserInfo._id &&
                                <>
                                    <Button 
                                        onClick={ () => setPostsCreatorOpen(true) } 
                                        type='primary'
                                        className={ styles.createPostsButton }
                                    >
                                        <BsPostcard className={ styles.icon } />
                                        Написать пост
                                    </Button>
                                </>
                        }
                    </div>
                </div>
            </div>
            { 
                posts 
                    ? <PostsList setPosts={ setPosts } posts={ posts } /> 
                    : <Spin className={ styles.loader } size = "large" /> 
            }
        </div>
    );
};

export default ProfileHeader;