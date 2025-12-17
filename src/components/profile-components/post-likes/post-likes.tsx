'use client'
import { ILike } from '@/models/posts/model';
import { BiSolidLike } from 'react-icons/bi';
import { Tooltip } from 'antd';
import styles from './styles.module.scss';

interface IPostLikesProps {
    likes: ILike[],
    handleLikePost: () => void,
    isPostLikedByUser: boolean,
    currentPostLikesNumber: number
}

const PostLikes = ({ 
    likes, 
    handleLikePost, 
    isPostLikedByUser, 
    currentPostLikesNumber 
} : IPostLikesProps) => {

    return (
        <Tooltip 
            placement="top" 
            title={ 
                <div className={ styles.likesList }>
                    {
                        likes.slice(-5).map(like => {
                            return (
                                <div key={ like._id } className={ styles.like }>
                                    <div className={ styles.userAvatarWrapper }>
                                        <img className={ styles.userAvatarImage } src = { like.avatar } />
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            } 
            arrow={ true }
        >
            <div onClick={ handleLikePost } className={ styles.postLikes }>
                <BiSolidLike className={ isPostLikedByUser ? styles.activeLike : styles.inActiveLike } />
                { currentPostLikesNumber }
            </div>
        </Tooltip>
    );
};

export default PostLikes;