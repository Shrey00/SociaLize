import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const initialState = {
    _id:'',
    firstName: '',
    lastName: '',
    email: '',
    bio: '',
    profileImage:'',
    posts: [],
    followers:[],
}


export const reqUserData = createAsyncThunk('user/getUserData', async (user) => {
    const response = await axios.get('http://localhost:4000/me', { headers: {Authorization: `Bearer ${user.token}`} });
    return response.data;
});

export const reqBio = createAsyncThunk('user/Bio', async (user) => {
    const response = await axios.post('http://localhost:4000/bio', { headers: {Authorization: `Bearer ${user.token}`} });
    return response.data;
});


const userSlice = createSlice({
    name: 'userData',
    initialState,
    reducers: {
        reset: (state) => {
            state._id = '';
            state.firstName = '';
            state.lastName = '';
            state.email = '';
            state.bio = '';
            state.posts = [];
            state.followers = [];
        },
      
    },
    extraReducers(builder) {
        builder
            .addCase(reqUserData.fulfilled, (state, action) => {
                const { firstName, lastName, email, bio, posts, followers, profileImage, _id } = action.payload;
                state._id = _id;
                state.firstName = firstName;
                state.lastName = lastName;
                state.email = email;
                state.bio = bio;
                state.profileImage = profileImage;
                state.posts = posts;
                state.followers = followers;
            })
            // .addCase(reqPeopleProfile.fulfilled, (state, action) => {
            //     const { firstName, lastName, email, bio, posts, followers, profileImage, _id } = action.payload;
            //     state._id = _id;
            //     state.firstName = firstName;
            //     state.lastName = lastName;
            //     state.email = email;
            //     state.bio = bio;
            //     state.profileImage = profileImage;
            //     state.posts = posts;
            //     state.followers = followers;
            // })
    }
})

export const { reset, logout, likePost } = userSlice.actions;
export const selectUserData = (state) => state.userData;
export default userSlice.reducer;
