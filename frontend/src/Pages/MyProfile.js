import { selectUserData, reqUserData } from "../features/userSlice";
// import { user } from '../features/authSlice';
import { selectUserLoginState } from '../features/authSlice';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostInProfile from "../Components/Post/PostInProfile";   
const MyProfile = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(selectUserLoginState);
    useEffect(() => {
        dispatch(reqUserData(user))
    }, []);
    const { firstName, lastName, profileImage, bio, followers, posts } = useSelector(selectUserData);
    console.log(posts)
    return (
        <div className="h-screen bg-[#F6E7D8]">
            <div>
                <div className="flex">
                    <img className="flex-shrink-0  lg:m-8  lg:mb-6 lg:h-[14rem] lg:w-[14rem] m-4 sm:h-[10rem] sm:w-[10rem] h-[8rem] w-[8rem] rounded-[50%] sm:border-4 border-2 border-[#DA4453] object-cover " src={profileImage ? `data:${profileImage.mimetype};base64,${profileImage.img}` : ''} />
                    <div className="flex flex-wrap">
                        <div className="lg:mb-[-4rem] mt-[2rem] sm:mb-[-4rem] mb-[-2.4rem] w-full text-xl flex font-bold md:text-4xl lg:text-4xl lg:mt-[5rem] ">
                            <p>{firstName} {lastName}</p>
                        </div>
                        <div>
                            <p className="font-bold lg:text-xl">Followers </p>
                            <p className="text-center lg:text-xl">{followers.length}</p>
                        </div>
                        <div className="ml-6">
                            <p className="font-bold lg:text-xl">Following</p>
                            <p className="text-center lg:text-xl">{followers.length}</p>
                        </div>
                    </div>

                </div>
                {
                    bio ? <div className="lg:ml-12 mb-6 lg:text-xl sm:text-lg sm:ml-8 ml-4 w-[50%]">{bio}</div> : null
                }
            </div>
            <div className="h-[2.7rem] bg-[#DA4453]">
                <p className="font-dancing-script text-[1.8rem] ml-4 text-red-200">My Posts</p>
            </div>
            <div className="flex flex-wrap">
                {
                    posts.map((post, i) => {
                        return <div key={i} className='mb-2 ml-1 mr-1'>
                            <PostInProfile content={post.content} postImage={post.postImage} />
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default MyProfile