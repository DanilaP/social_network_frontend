"use client";
import { deletePostById, IPost, likePost } from '@/models/posts/model';
import { Dispatch, SetStateAction, useState } from 'react';
import { FaComment } from 'react-icons/fa';
import styles from './styles.module.scss';
import Carousel from '@/components/partials/carousel/carousel';
import FileList from '@/components/partials/file-list/file-list';
import PostSettings from '../post-settings/post-settings';
import PostLikes from '../post-likes/post-likes';

const Post = (props: {
    post: IPost,
    setPosts: Dispatch<SetStateAction<IPost[] | undefined>>
}) => {

    const [currentPostLikesNumber, setCurrentPostLikesNumber] = useState<number>(props.post.likes.length);
    const [isPostLikedByUser, setIsPostLikedByUser] = useState<boolean>(props.post.isPostLikedByUser);

    const handleLikePost = () => {
        likePost(props.post._id)
        .then((res) => {
            setCurrentPostLikesNumber(res.data.likesNumber);
            setIsPostLikedByUser(res.data.isPostLikedByUser);
        })
        .catch((error) => {
            console.error(error);
        })
    }

    const handleDeletePost = (postId: string) => {
        deletePostById(postId)
        .then((res) => {
            props.setPosts((prev: IPost[] | undefined) => 
                prev ? prev.filter(post => post._id !== postId) : [res.data.post]
            );
        })
        .catch((error) => {
            console.error(error);
        })
    }

    return (
        <div key={ props.post._id } className={ styles.post }>
            <PostSettings deletePost = { handleDeletePost } post={ props.post } />
            <Carousel 
                images={ 
                    props.post.files.reduce((prev: string[], next) => {
                        if (next.type.includes("image")) {
                            return [...prev, next.url];
                        }
                        return prev;
                    }, []) 
                } 
            />
            <div className="text">
                { props.post.text }
            </div>
            <div className={ styles.footer }>
                <div className={ styles.item }>
                    <PostLikes 
                        likes={ props.post.likes } 
                        isPostLikedByUser = { isPostLikedByUser } 
                        handleLikePost={ handleLikePost }
                        currentPostLikesNumber= { currentPostLikesNumber }
                    />
                </div>
                <div className={ styles.item }>
                    <FaComment />
                    { props.post.comments.length }
                </div>
            </div>
            <FileList 
                files = { 
                    props.post.files.filter((file) => {
                        if (file.type.includes("application") || file.type.includes("text")) {
                            return true;
                        }
                        return false;
                    })
                } 
            />
            <div className={ styles.date }>
                { props.post.date }
            </div>
        </div>
    );
};

export default Post;