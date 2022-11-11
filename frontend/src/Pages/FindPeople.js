import { useState, useEffect } from 'react';
import { selectUserLoginState } from '../features/authSlice';
import { useSelector } from 'react-redux'
import axios from 'axios';
import People from '../Components/People';
const FindPeople = () => {
    const { user } = useSelector(selectUserLoginState);
    const [people, setPeople] = useState([]);
    const reqPeople = async (user) => {
        const response = await axios.get('http://localhost:4000/people', { headers: { Authorization: `Bearer ${user.token}` } });
        return response.data;
    }
    useEffect(() => {
        async function abc() {
            const response = await reqPeople(user);
            setPeople(response);
        }
        abc();
    }, []);
    return (
        <div className={`bg-[#f6f0ea] p-0 m-0 h-[100%] flex flex-col`}>
            <div>
                {
                    people.length ? people.map((user, i) => {
                        return <div key={i}> <People user = {user}/></div>
                    }) : null
                }
            </div>
        </div>
    )
}
export default FindPeople;