import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
// import { selectUserData } from '../features/userSlice';
import Button from '../Components/Button';
import { useNavigate } from 'react-router-dom';
import { selectUserLoginState, signup, reset, logout } from '../features/authSlice';

const Signup = () => {
    const dispatch = useDispatch();
    let { user } = useSelector(selectUserLoginState);
    const navigate = useNavigate();
    useEffect(() => {
        console.log(user+ "useEffect ka maal")
        if (user) {
            navigate('/uploadProfilePic');
        }
    }, [user])

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }


    return (
        <div>
            <div className="absolute bottom-0 right-0 left-0 top-[4rem] align-middle justify-center flex">
                <div className='text-center bg-gradient-to-r from-[#DA4453] via-[#DA4453] to-[#89213A] hidden md:block absolute bottom-0 left-0 top-0 right-[50%]'>

                    <p className='text-[#ffdde1] text-[4rem] font-serif inline-block mt-[20%]'>
                        SignUp
                    </p>
                    <p className='text-[#ee9ca7] text-xl'>
                        Enter your details to create an account
                    </p>
                    <p className='text-[#ffdde1] underline underline-offset-2'>
                        Already have an account?
                    </p>
                    <p className='text-[#ffdde1] font-bold underline underline-offset-2 hover:cursor-pointer' onClick={() => { navigate('/signin') }}>
                        SignIn
                    </p>

                </div>
                <div className='flex justify-center absolute bottom-0 md:left-[50%] left-0 top-0 right-0 bg-[#F6E7D8] '>
                    <div className='h-[25rem] border-[1px] border-[#DA4453] lg:w-[30rem] w-[20rem] rounded-md absolute top-[7rem]   '>
                        <input
                            className="h-8 p-2 lg:w-80 w-64 lg:ml-20 lg:mt-16 mt-16 ml-8 border-[2px] rounded-full focus:outline-none focus:border-[#DA4453]"
                            type='text'
                            name='firstName'
                            placeholder='First Name'
                            onChange={(e) => handleChange(e)}
                            value={formData.firstName} />

                        <input
                            className="h-8 p-2 lg:w-80 w-64 lg:ml-20 lg:mt-8 mt-6 ml-8 border-[2px] rounded-full focus:outline-none focus:border-[#DA4453]"
                            type='text'
                            name='lastName'
                            placeholder='Last Name'
                            onChange={(e) => handleChange(e)}
                            value={formData.lastName} />
                        <input
                            className="h-8 p-2 lg:w-80 w-64 lg:ml-20 lg:mt-8 mt-6 ml-8 border-[2px] rounded-full focus:outline-none focus:border-[#DA4453]
                        "
                            type='email'
                            name='email'
                            placeholder='E-mail'
                            onChange={(e) => handleChange(e)}
                            value={formData.email} />

                        <input
                            className="h-8 p-2 lg:w-80 w-64 lg:ml-20 lg:mt-8 mt-6 ml-8 border-[2px] rounded-full focus:outline-none focus:border-[#DA4453]"
                            type='password'
                            name='password'
                            placeholder='Password'
                            onChange={(e) => handleChange(e)}
                            value={formData.password} />

                        <div className='block justify-center lg:ml-[10rem] lg:mt-2 ml-20 mt-6'>
                            <Button
                                buttonText='Create Account'
                                handleClick={() => {
                                    dispatch(signup(formData));
                                    // dispatch(reset());
                                    if (user) {
                                        navigate('/uploadProfilePic')
                                    }
                                }} />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup;