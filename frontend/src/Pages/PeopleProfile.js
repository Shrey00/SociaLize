import { selectUserData, reqUserData } from "../features/userSlice";
// import { user } from '../features/authSlice';
import { selectUserLoginState } from '../features/authSlice';
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import PostInProfile from "../Components/Post/PostInProfile";
import axios from "axios";
const PeopleProfile = () => {
    // const dispatch = useDispatch();
    const { user } = useSelector(selectUserLoginState);
    const userData = useSelector(selectUserData);
    const [people, setPeople] = useState('');
    const [following, setFollowing] = useState(false);
    var { _id } = useParams()
    //request user profile data 
    const reqPeople = async (user) => {
        const response = await axios.post('http://localhost:4000/profile', { _id }, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        });
        return response.data;
    }
    async function abc() {
        var response = await reqPeople(user);
        setPeople(response.profile);
    }
    useEffect(() => {
        abc();
    }, []);

    //to Check if user is following this profile or not
    const isFollowing = () => {
        console.log('le following bro' + people.firstName)
        if (people) {
            for (var i = 0; i < people.followers.length; ++i) {
                if (people.followers[i].email !== userData.email) {
                    return false;
                }
                return true;
            }
        }
    }
    useEffect(() => setFollowing(isFollowing), [people])

    const handleFollowButton = () => {
        setPeople((prev) => ({
            ...prev,
            followers: [...prev.followers, { email: userData.email, firstName: userData.firstName, lastName: userData.lastName, profileImage: userData.profileImage }]
        }))
    }
    const handleUnfollowButton = () => {
        let unfollow = people;
        for (var i = 0; i < unfollow.followers.length; ++i) {
            if (unfollow.followers[i].email === userData.email) {
                unfollow.followers.splice(i, 1);
                break;
            }
        }
        setPeople((prev) => ({
            ...prev,
            followers: unfollow.followers
        }))
    }

    const requestFollow = async (followId) => {
        const response = await axios.post('http://localhost:4000/follow', { followId }, {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        });
    }

    const requestUnfollow = async (unfollowId) => {
        const response = await axios.post('http://localhost:4000/unfollow', { unfollowId }, {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        });
    }
    return (
        <div className={`h-screen ${people?.posts?.length < 10 ? 'h-screen' : 'h-[100%]'} bg-[#F6E7D8]`}>
            <div>
                <div className="flex">
                    <img className="flex-shrink-0  lg:m-8  lg:mb-6 lg:h-[14rem] lg:w-[14rem] m-4 sm:h-[10rem] sm:w-[10rem] h-[8rem] w-[8rem] rounded-[50%] sm:border-4 border-2 border-[#DA4453] object-cover " src={people.profileImage ? `data:${people.profileImage.mimetype};base64,${people.profileImage.img}` : ''} />
                    <div className="flex">
                        <div className="flex flex-wrap">
                            <div className="lg:mb-[-4rem] mt-[2rem] sm:mb-[-4rem] mb-[-2.4rem] w-full text-xl font-bold md:text-4xl lg:text-4xl lg:mt-[5rem] ">
                                <p>{people.firstName} {people.lastName}</p>
                            </div>

                            <div className="ml-6 h-8">
                                <p className="font-bold lg:text-xl">Followers </p>
                                <p className="text-center lg:text-xl">{people?.followers?.length}</p>
                            </div>
                            <div className="ml-6">
                                <p className="font-bold lg:text-xl">Following</p>
                                <p className="text-center lg:text-xl">{people?.following?.length}</p>
                            </div>
                            <div className="absolute lg:top-[17rem] lg:left-[23rem] sm:top-[12rem] sm:left-[16rem] top-[12rem] left-[13.6rem]">
                                {
                                    following ?
                                        <button className="p-2 mx-4 border-[1px] border-[#DA4453] hover:bg-[#DA4453] hover:text-[#F6E7D8] rounded-lg text-xs" onClick={() => { handleUnfollowButton(); setFollowing(false); requestUnfollow(people._id); }}>Unfollow</button>
                                        :
                                        <button className="p-2 mx-4 border-[1px] border-[#DA4453]  hover:bg-[#DA4453] hover:text-[#F6E7D8] rounded-lg text-xs" onClick={() => { handleFollowButton(); setFollowing(true); requestFollow(people._id); }}>Follow</button>
                                }
                            </div>
                        </div>

                    </div>
                </div>
                {
                    people.bio ? <div className="lg:ml-12 mb-6 lg:text-xl sm:text-lg sm:ml-8 ml-4 w-[50%]">{people.bio}</div> : null
                }
            </div>
            <div className="h-[2.7rem] bg-[#DA4453]">
                <p className="font-dancing-script text-[1.8rem] ml-4 text-red-200">My Posts</p>
            </div>
            <div className="flex flex-wrap">
                {
                    people?.posts?.map((post, i) => {
                        return <div key={i} className='mb-2 ml-1 mr-1'>
                            <PostInProfile content={post.content} postImage={post.postImage} />
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default PeopleProfile