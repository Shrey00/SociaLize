import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import axios from 'axios';
const initialState = {
    isLoading: false,
    posts: [],
}
export const fetchData = createAsyncThunk('posts/data', async () => {
    const response = await axios.get('http://localhost:4000/posts');
    console.log(response.data);
    return response.data;
})

export const reqLikePost = createAsyncThunk('user/likePost', async ({postId,user}) => {
    const response = await axios.post('http://localhost:4000/likePost',{postId}, { headers: {Authorization: `Bearer ${user.token}`} });
    return response.data;
});
export const reqDislikePost = createAsyncThunk('user/dislikePost', async ({postId,user}) => {
    const response = await axios.post('http://localhost:4000/dislikePost',{postId}, { headers: {Authorization: `Bearer ${user.token}`} });
    return response.data;
});

const postSlice = createSlice({
    name: 'postsData',
    initialState,
    reducers: {
        likePost: (state, action) => {
            const { _id, firstName, lastName, index } = action.payload;
            const obj = { _id, firstName, lastName }
            if (!(state.posts[index].likes.filter(value => value._id === obj._id).length > 0))
                state.posts[index].likes.push(obj);
        },
        dislikePost: (state, action) => {
            const { _id, firstName, lastName, index } = action.payload;
            const obj = { _id, firstName, lastName }
            if (!(state.posts[index].dislikes.filter(value => value._id === obj._id).length > 0))
                state.posts[index].dislikes.push(obj);
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchData.fulfilled, (state, action) => {
                state.posts = action.payload;
                state.isLoading = false;
            })
            .addCase(fetchData.pending, (state) => {
                state.isLoading = true;
            })
            // .addCase(reqLikePost.fulfilled, (state, action) => {
            //     state.posts = action.payload;
            //     state.isLoading = false;
            // })
    }
})

export const { likePost,dislikePost } = postSlice.actions;
export const selectPosts = (state) => state.postData.posts;
export default postSlice.reducer;