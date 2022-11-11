import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
// import { selectUserData } from '../features/userSlice';
import Button from '../Components/Button';
import { useNavigate } from 'react-router-dom';
import { selectUserLoginState, signin, wrongPass } from '../features/authSlice';

const Signin = () => {
    const dispatch = useDispatch();
    let { user } = useSelector(selectUserLoginState);
    
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/posts');
        }
    }, [user])


    return (
        <div>
            <div className="absolute bottom-0 right-0 left-0 top-[4rem] align-middle justify-center flex">
                <div className='text-center bg-gradient-to-r from-[#DA4453] via-[#DA4453] to-[#89213A] hidden md:block absolute bottom-0 left-0 top-0 right-[50%]'>
                    <p className='text-[#ffdde1] text-[4rem] font-serif inline-block mt-[20%]'>
                        SignIn
                    </p>
                    <p className='text-[#ee9ca7] text-xl'>
                        Enter your details to sign in to your account
                    </p>
                    <p className='text-[#ffdde1] underline underline-offset-2'>
                        Don't have an account?
                    </p>
                    <p className='text-[#ffdde1] font-bold underline underline-offset-2 hover:cursor-pointer' onClick={() => { navigate('/signup') }}>
                        SignUp
                    </p>

                </div>
                <div className='flex justify-center absolute bottom-0 md:left-[50%] left-0 top-0 right-0 bg-[#F6E7D8]'>

                    <div className='h-[25rem] border-[1px] border-[#DA4453] lg:w-[30rem] w-[20rem] rounded-md absolute top-[7rem]'>
                        <input
                            className="h-8 p-2 lg:w-80 w-64 lg:ml-20 lg:mt-20 mt-20 ml-8 border-[2px] rounded-full focus:outline-none focus:border-
                        "
                            type='email '
                            name='email'
                            placeholder='E-mail'
                            onChange={(e) => handleChange(e)}
                            value={formData.email} />

                        <input
                            className="h-8 p-2 lg:w-80 w-64 lg:ml-20 lg:mt-8 mt-6 ml-8 border-[2px] rounded-full focus:outline-none focus:border-red-500"
                            type='password'
                            name='password'
                            placeholder='Password'
                            onChange={(e) => handleChange(e)}
                            value={formData.password} />

                        <div className='lg:ml-[11.5rem] ml-28 mt-4'>
                            <Button
                                buttonText='Sign In'
                                handleClick={() => {
                                     dispatch(signin(formData));
                                    // dispatch(reset());
                                    if (user) {
                                        navigate('/posts');
                                    }
                                }} />
                        </div>
                        {
                            wrongPass ?
                                <div className='p-2 bg-[#DA4453] text-center text-white'>Invalid Credentials</div>
                                :
                                null
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signin;