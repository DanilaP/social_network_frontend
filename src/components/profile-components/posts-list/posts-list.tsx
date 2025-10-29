"use client";
import { BsPostcard } from "react-icons/bs";
import { Dispatch, SetStateAction } from "react";
import { IPost } from "@/models/posts/model";
import styles from './styles.module.scss';
import Post from "../post/post";

const PostsList = (props: { 
    posts: IPost[],
    setPosts: Dispatch<SetStateAction<IPost[] | undefined>>
}) => {

    if (props.posts.length > 0) {
        return (
            <div className={ styles.postsList }>
                {
                    props.posts.map((post) => {
                        return (
                            <Post 
                                key={ post._id } 
                                setPosts = { props.setPosts } 
                                post = { post } 
                            />
                        )
                    })
                }
            </div>
        );
    } 
    else {
        return (
            <div className={ styles.emptyPostsList }>
                <h2>Список постов пуст</h2>
                <BsPostcard className={ styles.icon } />
            </div>
        )
    }
};

export default PostsList;