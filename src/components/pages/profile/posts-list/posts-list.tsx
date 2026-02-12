"use client";
import { BsPostcard } from "react-icons/bs";
import { Dispatch, SetStateAction, useState } from "react";
import { IPost } from "@/models/posts/model";
import { Modal } from "antd";
import styles from './styles.module.scss';
import Post from "../post/post";
import PostCommentsList from "../post-comments-list/post-comments-list";

const PostsList = (props: { 
    posts: IPost[],
    setPosts: Dispatch<SetStateAction<IPost[] | undefined>>
}) => {

    const [choosenPost, setChoosenPost] = useState<IPost>();
    const [isCommentsModalOpen, setIsCommentsModalOpen] = useState<boolean>(false);

    const openPostComment = (post: IPost) => {
        setChoosenPost(post);
        setIsCommentsModalOpen(true);
    }

    if (props.posts.length > 0) {
        return (
            <>
                <div className={ styles.postsList }>
                    {
                        props.posts.map((post) => {
                            return (
                                <Post 
                                    handleClick={ openPostComment }
                                    key={ post._id } 
                                    setPosts = { props.setPosts } 
                                    post = { post } 
                                />
                            )
                        })
                    }
                </div>
                {
                    <Modal
                        centered
                        title="Редактирование статуса"
                        closable={{ 'aria-label': 'Custom Close Button' }}
                        open={ isCommentsModalOpen }
                        onCancel={ () => setIsCommentsModalOpen(false) }
                        footer={() => (<></>)}
                        destroyOnHidden
                    >
                        { 
                            choosenPost && 
                                <PostCommentsList
                                    setPosts={ props.setPosts } 
                                    post={ choosenPost } 
                                /> 
                        }
                    </Modal>
                }
            </>
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