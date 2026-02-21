"use client"
import { getPostById, IComment, IPost } from '@/models/posts/model';
import { BsPostcard } from 'react-icons/bs';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { UserStore } from '@/stores/user-store';
import styles from './styles.module.scss';
import PostComment from '../post-comment/post-comment';
import PostCommentForm from '../post-comment-form/post-comment-form';

interface IPostCommentsProps {
    post: IPost,
    setPosts: Dispatch<SetStateAction<IPost[] | undefined>>
}

const PostCommentsList = ({ post, setPosts } : IPostCommentsProps) => {

    const authorizedUserInfo = useSelector((store: UserStore) => store.user);
    const [fetchedPost, setFetchedPost] = useState<IPost>(post);

    const handleFetchPostInfo = async () => {
        await getPostById(post._id)
        .then((res) => {
            setFetchedPost(res.data.post);
            console.log(res);
        })
        .catch((error) => {
            console.error(error);
        })
    }

    const handleAddComment = (comment: IComment) => {
        setFetchedPost((prev) => {
            return {
                ...prev,
                comments: [comment, ...prev.comments]
            }
        });
        setPosts((prev) => {
            return prev?.map((post) => {
                if (post._id === fetchedPost._id) {
                    return {
                        ...post,
                        comments: [comment, ...post.comments]
                    }
                }
                return post;
            })
        });
    }

    useEffect(() => {
        handleFetchPostInfo();
    }, []);

    return (
        <div className={ styles.postCommentsListWrapper }>
            <PostCommentForm post = { post } handleAddComment = { handleAddComment } />
            {
                (fetchedPost!.comments.length === 0) 
                    ?
                        <div className={ styles.postCommentsEmptyList }>
                            <h2>Список комментариев пуст</h2>
                            <BsPostcard className={ styles.icon } />
                        </div>
                    :
                        fetchedPost!.comments.map(comment => {
                            return (
                                authorizedUserInfo &&
                                    <PostComment 
                                        postId={ post._id }
                                        user={ authorizedUserInfo }
                                        key={ comment._id } 
                                        comment={ comment } 
                                    />
                            )
                        })
            }
        </div>
    );
};

export default PostCommentsList;