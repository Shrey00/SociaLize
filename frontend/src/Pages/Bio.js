import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../Components/Button'
import { user } from '../features/authSlice'
const Bio = () => {
  const navigate = useNavigate();
  const [bio, setBio] = useState('')

  return (
    <div className="absolute bottom-0 right-0 left-0 top-[4rem] bg-[#F6E7D8]">
      <p className='text-xl mt-10 text-center'>Tell others about yourself</p>
      <div className='flex justify-center pt-6'>
        <textarea name='bio' onChange={(e) => setBio(e.target.value)} rows="10" cols="70" className='resize-none p-6'></textarea>
      </div>
      <div className='flex justify-center'>
        <Button buttonText={'Next'} handleClick={async () => {
          const response = await axios.post('http://localhost:4000/bio', { bio }, { headers: { Authorization: `Bearer ${user.token}` } })
          if (response.data.message === 'success')
            navigate('/profile');
        }} />
        <Button buttonText={'Skip'} handleClick={async () => {
          const response = await axios.post('http://localhost:4000/bio', { bio }, { headers: { Authorization: `Bearer ${user.token}` } })
          navigate('/profile');
        }} />
      </div>

    </div>
  )
}

export default Bio