import { Button, Input } from 'antd';
import { useState } from 'react';
import styles from './styles.module.scss';

interface IPostCommentForm {
    
}

const PostCommentForm = () => {

    const [commentText, setCommentText] = useState<string>("");

    const handleCommentTextChange = (text: string) => {
        setCommentText(text);
    }

    const handleAddComment = () => {
        console.log(commentText);
    }

    return (
        <div className={ styles.postCommentForm }>
            <Input onChange={ (e) => handleCommentTextChange(e.target.value) } placeholder='Текст комментария'/>
            <Button onClick={ handleAddComment } type="primary">Написать</Button>
        </div>
    );
};

export default PostCommentForm;