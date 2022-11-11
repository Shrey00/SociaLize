import React from 'react'
import {useNavigate} from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
const People = ({user}) => {
    const navigate = useNavigate();
    const onShowProfileClick = ()=>{
        navigate(`/people/${user._id}/${user.firstName}+${user.lastName}`);
    }
    return (
        <div className='flex items-center justify-between rounded-lg h-[100%] m-auto lg:w-[48rem] md:w-[40rem] mt-4 mb-4 md:mx-auto mx-[1rem] bg-[#F6E7D8] border-[1px] border-red-300'>
            <div className='m-4 w-[30%] flex justify-left'>
                    <div className='hover:cursor-pointer' onClick={() => navigate('/welcome')}>
                        {
                            user.profileImage?
                            <img className='rounded-[50%] w-[45px] h-[45px] min-h-[45px] min-w-[45px] object-cover ' src={user.profileImage ? `data:${user.profileImage.mimetype};base64,${user.profileImage.img}` : ''} />
                            :
                            <FaUserCircle className='w-[45px] text-red-300 h-[45px] rounded-[50%]'/> 
                        }
                    </div>
                    <div className='mx-4 my-2'>
                        <p>{user.firstName} {user.lastName}</p>
                    </div>
            </div>
            <div>
                <button className='p-2 mx-4 border-[1px] border-red-300 hover:bg-red-300 hover:text-[#F6E7D8] rounded-lg text-xs'
                onClick = {onShowProfileClick}>Show Profile</button>
            </div>
        </div>
    )
}
// bg-red-400 hover:bg-[#89213A]
export default People;