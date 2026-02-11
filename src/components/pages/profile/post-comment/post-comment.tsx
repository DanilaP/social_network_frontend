import { IComment } from '@/models/posts/model';
import styles from './styles.module.scss';

interface IPostCommentProps {
    comment: IComment
}

const PostComment = ({ comment }: IPostCommentProps) => {
    
    return (
        <div className={ styles.postComment }>
            { comment.text }
        </div>
    );
};

export default PostComment;