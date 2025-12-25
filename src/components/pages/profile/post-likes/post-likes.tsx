'use client'
import { ILike } from '@/models/posts/model';
import { BiSolidLike } from 'react-icons/bi';
import { Tooltip } from 'antd';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { UserStore } from '@/stores/user-store';
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

    const user = useSelector((store: UserStore) => store.user);
    const [updatedPostLikes, setUpdatedPostLikes] = useState<ILike[]>(likes);

    const handleLikePostWithFilter = () => {
        if (isPostLikedByUser) {
            setUpdatedPostLikes(prev => prev.filter(like => like._id !== user?._id));
        }
        else {
            if (user) {
                setUpdatedPostLikes([...updatedPostLikes, { _id: user._id, name: user.name, avatar: user.avatar }]);
            }
        }
        handleLikePost();
    }

    return (
        <Tooltip 
            placement="top" 
            title={ 
                <div className={ styles.likesList }>
                    {
                        updatedPostLikes.slice(-5).map(like => {
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
            <div onClick={ handleLikePostWithFilter } className={ styles.postLikes }>
                <BiSolidLike className={ isPostLikedByUser ? styles.activeLike : styles.inActiveLike } />
                { currentPostLikesNumber }
            </div>
        </Tooltip>
    );
};

export default PostLikes;