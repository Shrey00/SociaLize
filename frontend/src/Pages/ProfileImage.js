import React from 'react'
import Button from '../Components/Button'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useOutlet } from 'react-router'
import { user } from '../features/authSlice';
const ProfileImage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [uploadMessage, setUploadMessage] = React.useState('');
    const handleUpload = async () => {
        let formData = new FormData();
        let imagefile = document.getElementById('profileImage');
        formData.set("profileImage", imagefile.files[0]);
        const response = await axios.post('http://localhost:4000/profileImage', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${user.token}`
            }
        })
        if(response.data.message == 'success'){
            navigate('/bio')
        }
    }
    return (
        <div className="absolute bottom-0 right-0 left-0 top-[4rem]  bg-[#F6E7D8]">
            <p className='text-5xl mt-10 text-center'>Hello there, welcome to</p>
            <p className='font-dancing-script text-8xl ml-10 text-red-400 text-center'>SociaLize</p>
            <p className='text-2xl mt-10 text-center'>Upload your profile picture</p>
            <div className='text-center mt-8 ml-20'>
                <input
                    className=''
                    id='profileImage'
                    name='profileImage'
                    type='file'
                    accept='image/*'
                />
                {uploadMessage ? <p className='block'>{uploadMessage + ', click next'}</p> : null}
            </div>
            <p className='text-center'>
                <Button buttonText={'Next'} handleClick={handleUpload} />
            </p>
            {
                uploadMessage?null:
                <div>
                    <p className='text-center mt-2'>Skip if you want to upload later</p>
                    <p className='text-center'>
                        <Button buttonText={'Skip'} handleClick={() => { navigate('/bio') }} />
                    </p>
                </div>
            }

        </div>
    )
}

export default ProfileImage