import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
export let user = JSON.parse(localStorage.getItem('user'));
export let wrongPass = 0;
const initialState = {
    isFullfilled: false,
    isPending: false,
    isRejected: false,
    user: user ? user : null,
}

export const signin = createAsyncThunk('user/signin', async (userData, thunkAPI) => {
    try {
        const response = await axios.post('http://localhost:4000/signin', userData);
        localStorage.setItem('user', JSON.stringify(response.data));
        wrongPass = 0;  //to keep it 0 after multiple attempts
    } catch (e) {
        thunkAPI.rejectWithValue(e.toString());
        ++wrongPass;
    }
});

export const signup = createAsyncThunk('user/signup', async (userData, thunkAPI) => {
    try {
        const response = await axios.post('http://localhost:4000/signup', userData);
        localStorage.setItem('user', JSON.stringify(response.data));
    }catch(e){
        thunkAPI.rejectWithValue(e.toString());
    }

})

const authSlice = createSlice({
    name: 'userData',
    initialState,
    reducers: {
        reset: (state) => {
            state.isRejected = false;
            state.isFullfilled = false;
            state.isPending = false;
        },
        logout: (state) => {
            localStorage.removeItem('user');
            state.user = null;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(signup.fulfilled, (state, action) => {
                state.isFullfilled = true;
                state.user = JSON.parse(localStorage.getItem('user'));
                state.isPending = false;
                state.isRejected = false;
            })
            .addCase(signup.rejected, (state) => {
                state.isFullfilled = false;
                state.isPending = false;
                state.isRejected = true;
                         //navigate to a error page,OR just show an error component in the that page itself
            })
            .addCase(signup.pending, (state) => {
                state.isFullfilled = false;
                state.isPending = true;
                state.isRejected = false;
            })
            .addCase(signin.fulfilled, (state, action) => {
                state.isFullfilled = true
                state.isPending = false;
                state.isRejected = false;
                state.user  = JSON.parse(localStorage.getItem('user'));
            })
            .addCase(signin.rejected, (state) => {
                state.isFullfilled = false;
                state.isPending = false;
                state.isRejected = true;
                         //navigate to a error page,OR just show an error component in the that page itself
            })
            .addCase(signin.pending, (state) => {
                state.isFullfilled = false;
                state.isPending = true;
                state.isRejected = false;
            })  
    }
})

export const { reset, logout } = authSlice.actions;
export const selectUserLoginState = (state) => state.userAuth;
export default authSlice.reducer;
