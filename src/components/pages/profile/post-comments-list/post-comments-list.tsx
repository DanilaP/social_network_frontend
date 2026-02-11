"use client"
import { getPostById, IPost } from '@/models/posts/model';
import { BsPostcard } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import PostComment from '../post-comment/post-comment';
import PostCommentForm from '../post-comment-form/post-comment-form';

interface IPostCommentsProps {
    post: IPost
}

const PostCommentsList = ({ post } : IPostCommentsProps) => {

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

    useEffect(() => {
        handleFetchPostInfo();
    }, []);

    return (
        <div className={ styles.postCommentsListWrapper }>
            <PostCommentForm />
            {
                (fetchedPost!.comments.length === 0) 
                    ?
                        <div className={ styles.postCommentsEmptyList }>
                            <h2>Список комментариев пуст</h2>
                            <BsPostcard className={ styles.icon } />
                        </div>
                    :
                        fetchedPost!.comments.map(comment => {
                            return <PostComment key={ comment._id } comment={ comment } />
                        })
            }
        </div>
    );
};

export default PostCommentsList;