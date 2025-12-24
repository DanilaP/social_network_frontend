"use client";
import { IUser } from '@/models/user/model';
import { Modal } from 'antd';
import { useSelector } from 'react-redux';
import { UserStore } from '@/stores/user-store';
import { getUserPosts, IPost } from '@/models/posts/model';
import React, { useEffect, useState } from 'react';
import styles from "./styles.module.scss";
import StatusEditor from '../status-editor/status-editor';
import PostsCreator from '../posts-creator/posts-creator';
import AvatarChanger from '../avatar-changer/avatar-changer';
import ProfileHeader from '../profile-header/profile-header';

const ProfileWrapper = (props: { 
    user: IUser 
}) => {

    const [posts, setPosts] = useState<IPost[]>();
    const [statusEditorOpen, setStatusEditorOpen] = useState<boolean>(false);
    const [postsCreatorOpen, setPostsCreatorOpen] = useState<boolean>(false);
    const [avatarChangerOpen, setAvatarChangerOpen] = useState<boolean>(false);
    const [status, setStatus] = useState<string>(props.user.status);
    const authorizedUserInfo = useSelector((store: UserStore) => store.user);
    
    useEffect(() => {
        getUserPosts(props.user._id)
        .then((res) => {
            setPosts(res.data.posts);
        })
        .catch((error) => {
            console.error(error);
        })
    }, [props.user]);

    return (
        <div className={ styles.profileWrapper }>
            {
                props.user && posts && authorizedUserInfo &&
                    <ProfileHeader 
                        setAvatarChangerOpen = { setAvatarChangerOpen }
                        setStatusEditorOpen = { setStatusEditorOpen }
                        setPostsCreatorOpen = { setPostsCreatorOpen }
                        setPosts = { setPosts }
                        posts = { posts } 
                        user = { props.user } 
                        authorizedUserInfo = { authorizedUserInfo }
                        status = { status }
                    />  
            }
            {
                <Modal
                    centered
                    title="Редактирование статуса"
                    closable={{ 'aria-label': 'Custom Close Button' }}
                    open={ statusEditorOpen }
                    onCancel={ () => setStatusEditorOpen(false) }
                    footer={() => (<></>)}
                    destroyOnHidden
                >
                    { authorizedUserInfo && 
                        <StatusEditor 
                            status={ authorizedUserInfo.status } 
                            close={ setStatusEditorOpen } 
                            setStatus = { setStatus }
                        /> 
                    }
                </Modal>
            }
            {
                <Modal
                    centered
                    title="Создание поста"
                    closable={{ 'aria-label': 'Custom Close Button' }}
                    open={ postsCreatorOpen }
                    onCancel={ () => setPostsCreatorOpen(false) }
                    footer={() => (<></>)}
                    destroyOnHidden
                >
                    <PostsCreator setPosts = { setPosts } close={ () => setPostsCreatorOpen(false) } />
                </Modal>
            }
            {
                <Modal
                    centered
                    title="Смена аватара"
                    closable={{ 'aria-label': 'Custom Close Button' }}
                    open={ avatarChangerOpen }
                    onCancel={ () => setAvatarChangerOpen(false) }
                    footer={() => (<></>)}
                    destroyOnHidden
                >
                    <AvatarChanger close={ () => setAvatarChangerOpen(false) } />
                </Modal>
            }
        </div>
    );
};

export default ProfileWrapper;