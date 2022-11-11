import { useState,memo } from 'react'
import { selectUserLoginState } from '../features/authSlice';
import { useSelector } from 'react-redux';
import Button from '../Components/Button';
import axios from 'axios';
import { useNavigate } from 'react-router';
const CreatePost = () => {
    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState();
    const [content,setContent] = useState('');
    // This function will be triggered when the file field change
    var { user } = useSelector(selectUserLoginState);
    const imageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedImage(e.target.files[0]);
        }
    };
    
    const handleSubmit = async (user) => {
        let imagefile = document.getElementById('create_post');
        let formData = new FormData();
        if(imagefile)
            formData.append("create_post", imagefile.files[0]);
        formData.append("content",content);
        const response = await axios.post('http://localhost:4000/createPost', formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${user.token}`
                }
            });
            console.log(response.data.message)
            if(response.data.message ==   'success'){
                navigate('/profile')
            }
    }

    return (
        <div className='flex'>
            <div className='absolute bottom-0 right-0 left-0 top-[4rem]  bg-[#F6E7D8]'>
                <p className='text-2xl mt-10 text-center'>Create Post</p>
                <div className='text-center mt-4 ml-20'>
                    <input
                        className=''
                        id='create_post'
                        name='create_post'
                        type='file'
                        accept='image/*'
                        onChange={(e) => imageChange(e)}
                    />
                </div>
                {
                    selectedImage ?
                        <div className='flex justify-center m-4 object-'>
                            <img className='h-[15rem]' src={URL.createObjectURL(selectedImage)} alt='preview' />
                        </div> : null
                }
                <div className='flex justify-center m-2'>
                    <textarea
                        name='content'
                        className='h-[6rem] w-[30rem] p-4 resize-none focus:outline-none focus:border-2 focus:border-[#DA4453] rounded-md'
                        onChange={(e)=>setContent(e.target.value)}
                        value = {content}
                    />
                </div>

                <p className='text-center'>
                    <Button buttonText={'Post'} handleClick={() => handleSubmit(user)} />
                </p>

            </div>
        </div>
    )
}

export default CreatePost