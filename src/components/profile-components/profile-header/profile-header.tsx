"use client"
import { IUser } from '@/models/user/model';
import { IPost } from '@/models/posts/model';
import { IoAddOutline } from "react-icons/io5";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { BsPostcard } from "react-icons/bs";
import { FaUserFriends } from "react-icons/fa";
import { BiMessageRounded } from "react-icons/bi";
import { MdEdit } from "react-icons/md";
import { Button, Spin } from 'antd';
import { Dispatch, SetStateAction } from 'react';
import PostsList from '../posts-list/posts-list';
import styles from './styles.module.scss';

interface IProfileHeaderProps {
    user: IUser,
    posts: IPost[],
    setAvatarChangerOpen: (value: boolean) => void,
    setStatusEditorOpen: (value: boolean) => void,
    setPostsCreatorOpen: (value: boolean) => void,
    setPosts: Dispatch<SetStateAction<IPost[] | undefined>>,
    status: string
}
    
const ProfileHeader = ({ 
    user, 
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
                        user._id === user._id &&
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
                        user._id === user._id 
                            && 
                                <MdEdit 
                                    onClick={ () => setStatusEditorOpen(true) } 
                                    className={ styles.editIcon } 
                                /> 
                        }
                    </div>
                    <div className={ styles.status }>{ status }</div>
                    <div className={ styles.settings }>
                        <Button type='primary'>
                            <FaUserFriends className={ styles.icon } />
                            Друзья ({ user.friends.length })
                        </Button>
                        { 
                            user._id === user?._id &&
                                <>
                                    <Button type='primary'>
                                        <BiMessageRounded className={ styles.icon } />
                                        Мои сообщения
                                    </Button>
                                    <Button 
                                        onClick={ () => setPostsCreatorOpen(true) } 
                                        type='primary'
                                        className={ styles.createPostsButton }
                                    >
                                        <BsPostcard className={ styles.icon } />
                                        Написать пост
                                    </Button>
                                    <Button type='primary'>
                                        <LiaUserFriendsSolid className={ styles.icon } />
                                        Заявки в друзья ({ user.friendRequests.length })
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