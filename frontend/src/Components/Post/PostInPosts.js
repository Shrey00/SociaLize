import React from 'react'
import { useNavigate } from 'react-router'
import LikeDislikeBar from './LikeDislikeBar'
import { FaRegThumbsUp,FaRegThumbsDown } from "react-icons/fa";
const PostInPosts = ({ postId,user, content, postImage, likes, dislikes, comments, date, index }) => {
    const navigate = useNavigate();
    return (
        <div className='flex justify-center rounded-lg h-[100$%] m-auto w-[48rem] mt-4 bg-[#F6E7D8] border-[1px] border-red-300'>
            <div className=''>
                <div className='mt-4 mb-4 flex '>
                    <div className='hover:cursor-pointer' onClick={() => navigate('/welcome')}>
                        <img className='rounded-[50%] w-[40px] h-[40px] object-cover' src={user.profileImage ? `data:${user.profileImage.mimetype};base64,${user.profileImage.img}` : ''} />
                    </div>
                    <div className='m-2'>
                        <p>{user.firstName} {user.lastName}</p>
                    </div>
                </div>
                <div className='flex justify-center'>
                    {
                        postImage.mimetype ?
                            <img className='max-h-[30rem] max-w-[42rem] rounded-lg  object-fill' src={postImage ? `data:${postImage.mimetype};base64,${postImage.img}` : ''} />
                            : null
                    }
                </div>
                <div className='p-4'>
                    <p>{content}</p>
                </div>
                <div className='w-auto m-4'>
                    <LikeDislikeBar likes={likes} dislikes={dislikes} index = {index} postId = {postId} />
                </div>
            </div>
        </div>
    )
}

export default PostInPosts;