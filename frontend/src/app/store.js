
import { configureStore } from '@reduxjs/toolkit';
import userAuthReducer from '../features/authSlice';
import userDataReducer from '../features/userSlice';
import postDataReducer from '../features/postSlice';
const store = configureStore({
    reducer: {
        userAuth: userAuthReducer,
        userData: userDataReducer,
        postData: postDataReducer
    }
});

export default store;