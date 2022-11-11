import { FaRegThumbsUp, FaRegThumbsDown } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { likePost, reqLikePost,dislikePost,reqDislikePost } from "../../features/postSlice";
import { useState } from 'react';
import { selectUserData } from "../../features/userSlice";
// import {user} from '../../features/authSlice';
import { selectUserLoginState } from "../../features/authSlice";
// import { useDispatch,useSelector } from "react-redux";
const LikeDislikeBar = ({ likes, dislikes, index,postId }) => {
    const dispatch = useDispatch();
    const { user } = useSelector(selectUserLoginState);
    const { _id, firstName, lastName } = useSelector(selectUserData);
    return (
        <>
            <div className='flex justify-around'>
                <div className="border-[1px] border-red-500 rounded-xl">
                    <button className="text-red-300 px-8 py-2 hover:text-red-500" onClick={() => {
                        dispatch(likePost({ _id, firstName, lastName, index }));
                        dispatch(reqLikePost({postId,user}));
                    }}><FaRegThumbsUp /></button>
                </div>
                <div className="border-[1px] border-red-500 rounded-xl ">
                    <button className="text-red-300 px-8 py-2 hover:text-red-500" onClick={() => {
                        dispatch(dislikePost({ _id, firstName, lastName, index }));
                        dispatch(reqDislikePost({postId,user}));
                    }}><FaRegThumbsDown /></button>
                </div>
            </div>
            <div className='flex justify-around'>
                <p className="text-xs m-2">{likes.length > 1 ? likes[likes.length - 1].firstName + ' and others liked this' : likes.length === 1 ? likes[likes.length - 1].firstName + " liked this" : null}</p>
                <p className="text-xs m-2">{dislikes.length > 1 ? dislikes[dislikes.length - 1].firstName + ' and others liked this' : dislikes.length === 1 ? dislikes[dislikes.length - 1].firstName + " disliked this" : null}</p>    
            </div>
        </>

    )
}

export default LikeDislikeBar