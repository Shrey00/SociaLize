import { useEffect ,useState } from 'react'
import { selectUserLoginState } from '../features/authSlice'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectUserData, reqUserData } from '../features/userSlice';
import { logout } from '../features/authSlice';
import { FaUserCircle } from 'react-icons/fa';
const Header = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(reqUserData(user))
  }, []);
  const { user } = useSelector(selectUserLoginState);
  const { profileImage } = useSelector(selectUserData);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  return (
    <div className='h-[4rem] bg-gradient-to-r from-[#DA4453] to-[#89213A] flex justify-between'>
      <p className='font-dancing-script text-5xl text-red-200 ml-2'>SociaLize</p>
      <div>
        {
          user ?
            <div className='absolute right-4 w-[22rem]'>
              <button className=' py-[1.2rem] px-[1rem] hover:text-red-500 hover:bg-red-200 text-red-200 '
                onClick={() => navigate('/people')}>Find People</button>

              <button className='py-[1.2rem] px-[1rem] hover:text-red-500 hover:bg-red-200 text-red-200'
                onClick={() => navigate('/signin')}>Posts</button>

              <button className='py-[1.2rem] px-[1rem] hover:text-red-500 hover:bg-red-200 text-red-200'
                onClick={() => navigate('/createPost')}>Create Post</button>

              <div className='hover:cursor-pointer'  onMouseOver={() => setOpen(true)} onMouseLeave = {()=>setOpen(false)}>
                {
                  profileImage?.mimetype ? <img onClick={() => navigate('/profile')} className='absolute top-3 right-0 rounded-[50%] w-[40px] h-[40px] object-cover' src={profileImage ? `data:${profileImage.mimetype};base64,${profileImage.img}` : ''} />
                    :
                    <FaUserCircle onClick={() => navigate('/profile')} className='absolute top-3 right-0 text-red-300 h-[40px] w-[40px] rounded-[50%]' />

                }
                {
                  open ? <div className='py-[1.2rem] px-[1rem] bg-[#89213A] rounded-md hover:text-red-500 hover:bg-red-200 text-red-200 absolute top-[3.3rem] right-0'><button onClick={() => {dispatch(logout());navigate('/signup');}}>Logout</button></div> : null
                }
              </div>
            </div>
            :
            <div className=''>
              {/* <button className=' py-[1.2rem] px-[1rem] hover:text-red-500 hover:bg-red-200 text-red-200'
                onClick={() => navigate('/home')}>Home</button> */}
              <button className=' py-[1.2rem] px-[1rem] hover:text-red-500 hover:bg-red-200 text-red-200'
                onClick={() => navigate('/signup')}>Sign Up</button>
              <button className='py-[1.2rem] px-[1rem] hover:text-red-500 hover:bg-red-200  text-red-200'
                onClick={() => navigate('/signin')}>Sign In</button>
            </div>
        }
      </div>
    </div >

  )
}

export default Header