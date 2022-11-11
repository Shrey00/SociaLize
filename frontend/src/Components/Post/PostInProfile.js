import React from 'react'
import LikeDislikeBar from './LikeDislikeBar'

const PostInProfile = ({ user, content, postImage, likes, dislikes, comments, date }) => {
  return (
    <div>
      {
        postImage.mimetype && content ?
          <img className='h-[9rem] w-[9rem] object-cover mt-1' src={postImage ? `data:${postImage.mimetype};base64,${postImage.img}` : ''} /> :
          content ?
            null
            :
            postImage ?
              <img className='h-[9rem] w-[9rem] object-cover mt-1'  src={postImage ? `data:${postImage.mimetype};base64,${postImage.img}` : ''} />
              : null
      }
     {
        postImage.mimetype && content ? null :
          postImage.mimetype ? null :
            content ?
              <div className='flex justify-center align-middle mt-1 text-wrap h-[9rem] w-[9rem] border-2 p-2 overflow-clip border-red-300'>
                <p>{content}</p>
              </div>
              : null
      }
      {/* <LikeDislikeBar likes={likes} dislikes = {dislikes}/> */}
    </div>
  )
}

export default PostInProfile;