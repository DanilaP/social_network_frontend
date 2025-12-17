import { ILike } from '@/models/posts/model';
import { BiSolidLike } from 'react-icons/bi';
import styles from './styles.module.scss';

interface IPostLikesProps {
    likes: ILike[],
    handleLikePost: () => void,
    isPostLikedByUser: boolean,
    currentPostLikesNumber: number
}

const PostLikes = ({ likes, handleLikePost, isPostLikedByUser, currentPostLikesNumber } : IPostLikesProps) => {
    return (
        <div onClick={ handleLikePost } className={ styles.postLikes }>
            <BiSolidLike className={ isPostLikedByUser ? styles.activeLike : styles.inActiveLike } />
            { currentPostLikesNumber }
        </div> 
    );
};

export default PostLikes;