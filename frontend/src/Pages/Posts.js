import { useEffect, useState } from 'react'

import PostInPosts from '../Components/Post/PostInPosts';
import { fetchData, selectPosts } from '../features/postSlice';
import { useSelector,useDispatch } from 'react-redux';
const Posts = () => { 
  const dispatch = useDispatch();
  const posts = useSelector(selectPosts);
  useEffect(() => {
    dispatch(fetchData());
  }, []);
  return (
    <div className={`bg-[#f6f0ea]  p-0 m-0 h-[100%] flex flex-col ${posts.length<2? 'h-screen' : ''} `}>
      {
        posts?.map((post, i) => {
          return <div className = '' key={i}>
            {
              <PostInPosts postId = {post._id} postImage={post.postImage} content={post.content} likes={post.likes} dislikes={post.dislikes} user = {post.user} index = {i}/>
            }
              </div>
        })
      }
      {
        posts.length<0?
          <div>
            <p className='text-center'>No Posts.</p>
            </div>:null
      }
    </div>
  )
}

export default Posts