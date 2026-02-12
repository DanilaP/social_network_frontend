import { IComment, likeComment } from '@/models/posts/model';
import { IoIosHeart } from "react-icons/io";
import { useEffect, useState } from 'react';
import { IUser } from '@/models/user/model';
import styles from './styles.module.scss';

interface IPostCommentProps {
    comment: IComment,
    user: IUser,
    postId: string
}

const PostComment = ({ comment, user, postId }: IPostCommentProps) => {
    
    const [isPostLikedByUser, setIsPostLikedByUser] = useState<boolean>(false);

    const handleLikePost = () => {
        setIsPostLikedByUser(!isPostLikedByUser);
        likeComment(comment._id, postId)
        .then(res => {
            console.log(res);
        })
        .catch((error) => {
            console.error(error);
        })
    }

    useEffect(() => {
        setIsPostLikedByUser(comment.likes.filter(like => like.avatar === user.avatar).length > 0);
    }, []);

    return (
        <div className={ styles.postComment }>
            <div className={ styles.avatarWrapper }>
                <img src = { comment.avatar } className={ styles.userAvatar } />
                <div className={ styles.userName }>{ comment.name }</div>
            </div>
            <div className={ styles.contentWrapper }>
                <div className={ styles.text }>{ comment.text }</div>
            </div>
            <div className={ styles.commentFooter }>
                <div onClick={ handleLikePost } className={ styles.likesWrapper }>
                    { isPostLikedByUser ? comment.likes.length + 1 : comment.likes.length }
                    <IoIosHeart 
                        className={ isPostLikedByUser ? styles.likesIconActive : styles.likesIcon } 
                    />
                </div>
            </div>
        </div>
    );
};

export default PostComment;