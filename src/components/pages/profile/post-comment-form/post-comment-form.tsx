import { Button, Input } from 'antd';
import { createCommentForPost, IComment, IPost } from '@/models/posts/model';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { UserStore } from '@/stores/user-store';
import styles from './styles.module.scss';

interface IPostCommentForm {
    handleAddComment: (comment: IComment) => void,
    post: IPost
}

const PostCommentForm = ({ handleAddComment, post } : IPostCommentForm) => {

    const authorizedUserInfo = useSelector((store: UserStore) => store.user);
    const [commentText, setCommentText] = useState<string>("");

    const handleCommentTextChange = (text: string) => {
        setCommentText(text);
    }

    const handleAddCommentButtonClick = () => {
        const comment = {
            _id: Date.now().toString(),
            user_id: authorizedUserInfo?._id || "",
            avatar: authorizedUserInfo?.avatar || "",
            name: authorizedUserInfo?.name || "",
            text: commentText,
            files: [],
            likes: []
        };
        createCommentForPost(post._id, commentText)
        .then((res) => {
            handleAddComment(comment)
            console.log(res);
        })
        .catch((error) => {
            console.error(error);
        });
    }

    return (
        <div className={ styles.postCommentForm }>
            <Input onChange={ (e) => handleCommentTextChange(e.target.value) } placeholder='Текст комментария'/>
            <Button onClick={ handleAddCommentButtonClick } type="primary">Написать</Button>
        </div>
    );
};

export default PostCommentForm;