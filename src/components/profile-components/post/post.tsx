"use client";
import { IPost } from '@/models/posts/model';
import { Dispatch, SetStateAction } from 'react';
import { FaComment } from 'react-icons/fa';
import { BiSolidLike } from 'react-icons/bi';
import $api from '@/configs/axios';
import styles from './styles.module.scss';
import Carousel from '@/components/carousel/carousel';
import FileList from '@/components/file-list/file-list';
import PostSettings from '../post-settings/post-settings';

const Post = (props: {
    post: IPost,
    setPosts: Dispatch<SetStateAction<IPost[] | undefined>>
}) => {

    const deletePost = (postId: string) => {
        $api.delete(`/post?id=${ postId }`)
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
            <PostSettings deletePost = { deletePost } post={ props.post } />
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
                    <BiSolidLike />
                    { props.post.likes.length }
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