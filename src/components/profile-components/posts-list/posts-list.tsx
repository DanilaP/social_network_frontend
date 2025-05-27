"use client";
import { BiSolidLike } from "react-icons/bi";
import { FaComment } from "react-icons/fa";
import { BsPostcard } from "react-icons/bs";
import { MdOutlineDeleteSweep } from "react-icons/md";
import { useState } from "react";
import { IPost } from "@/models/posts/model";
import styles from './styles.module.scss';
import $api from "@/configs/axios";
import Carousel from "@/components/carousel/carousel";


const PostsList = (props: { posts: IPost[]  }) => {

    const [updatedPosts, setUpdatedPosts] = useState(props.posts);

    const deletePost = (postId: string) => {
        $api.delete(`/post?id=${ postId }`)
        .then((res) => {
            setUpdatedPosts(updatedPosts.filter(post => post._id !== postId));
            console.log(res);
        })
        .catch((error) => {
            console.error(error);
        })
    }

    if (updatedPosts.length > 0) {
        return (
            <div className={ styles.postsList }>
                {
                    updatedPosts.map((post) => {
                        return (
                            <div key={ post._id } className={ styles.post }>
                                <MdOutlineDeleteSweep 
                                    onClick={ () => deletePost(post._id) }
                                    className={ styles.deletePostIcon } 
                                    fontSize={"30px"} 
                                />
                                <Carousel images={ [...post.files.map(file => file.url)] } />
                                <div className="text">
                                    { post.text }
                                </div>
                                <div className={ styles.footer }>
                                    <div className={ styles.item }>
                                        <BiSolidLike />
                                        { post.likes.length }
                                    </div>
                                    <div className={ styles.item }>
                                        <FaComment />
                                        { post.comments.length }
                                    </div>
                                </div>
                            </div>
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