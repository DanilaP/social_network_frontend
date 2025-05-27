"use client";
import { IUser } from '@/models/user/model';
import { Button, Modal, Spin } from 'antd';
import { FaUserFriends } from "react-icons/fa";
import { BiMessageRounded } from "react-icons/bi";
import { MdEdit } from "react-icons/md";
import { useSelector } from 'react-redux';
import { UserStore } from '@/stores/user-store';
import { BsPostcard } from "react-icons/bs";
import React, { useEffect, useState } from 'react';
import styles from "./styles.module.scss";
import $api from '@/configs/axios';
import PostsList from '../posts-list/posts-list';
import StatusEditor from '../status-editor/status-editor';
import PostsCreator from '../posts-creator/posts-creator';

const ProfileWrapper = (props: { 
    user: IUser 
}) => {

    const [posts, setPosts] = useState();
    const [statusEditorOpen, setStatusEditorOpen] = useState<boolean>(false);
    const [postsCreatorOpen, setPostsCreatorOpen] = useState<boolean>(false);
    const [status, setStatus] = useState<string>(props.user.status);
    const user = useSelector((store: UserStore) => store.user);
    
    useEffect(() => {
        $api.get(`/post?id=${ props.user._id }`)
        .then((res) => {
            setPosts(res.data.posts);
        })
        .catch((error) => {
            console.error(error);
        })
    }, [user]);

    return (
        <div className={ styles.profileWrapper }>
            {
                user 
                    ?
                        <div className={ styles.profileContent }>
                            <div className={ styles.header }>
                                <div className={ styles.avatar }>
                                    <img className={ styles.avatarImage } src = { props.user.avatar } />
                                </div>
                                <div className={ styles.info }>
                                    <div className={ styles.name }>
                                        { props.user.name }
                                        { 
                                        props.user._id === user._id 
                                            && <MdEdit onClick={ () => setStatusEditorOpen(true) } className={ styles.editIcon } /> 
                                        }
                                    </div>
                                    <div className={ styles.status }>{ status }</div>
                                    <div className={ styles.settings }>
                                        <Button type='primary'>
                                            <FaUserFriends className={ styles.icon } />
                                            Друзья { props.user.friends.length }
                                        </Button>
                                        { 
                                            props.user._id === user?._id &&
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
                                                </>
                                        }
                                    </div>
                                </div>
                            </div>
                            { posts ? <PostsList posts={ posts } /> : <Spin className={ styles.loader } size = "large" /> }
                        </div>
                    : <Spin className={ styles.mainLoader } size = "large" /> 
            }
            {
                <Modal
                    title="Редактирование статуса"
                    closable={{ 'aria-label': 'Custom Close Button' }}
                    open={ statusEditorOpen }
                    onCancel={ () => setStatusEditorOpen(false) }
                    footer={() => (<></>)}
                    destroyOnHidden
                >
                    { user && 
                        <StatusEditor 
                            status={ user.status } 
                            close={ setStatusEditorOpen } 
                            setStatus = { setStatus }
                        /> 
                    }
                </Modal>
            }
            {
                <Modal
                    title="Создание поста"
                    closable={{ 'aria-label': 'Custom Close Button' }}
                    open={ postsCreatorOpen }
                    onCancel={ () => setPostsCreatorOpen(false) }
                    footer={() => (<></>)}
                    destroyOnHidden
                >
                    <PostsCreator close={ () => setPostsCreatorOpen(false) } />
                </Modal>
            }
        </div>
    );
};

export default ProfileWrapper;