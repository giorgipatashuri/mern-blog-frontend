import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchPosts = createAsyncThunk('/posts/fetchPosts', async () => {
  const { data } = await axios.get('/posts');
  return data;
});

export const fetchTags = createAsyncThunk('/posts/fetchTags', async () => {
  const { data } = await axios.get('/tags');
  return data;
});
export const fetchRemovePost = createAsyncThunk('/posts/fetchRemovePost', async (id) => {
  const { data } = await axios.delete(`/posts/${id}`);
  return data;
});

const initialState = {
  posts: {
    items: [],
    status: 'isLoading',
  },
  tags: {
    item: [],
    status: 'isLoading',
  },
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPosts.pending]: (state) => {
      state.posts.items = [];
      state.posts.status = 'isLoading';
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = 'isLoaded';
    },
    [fetchTags.pending]: (state) => {
      state.tags.items = [];
      state.tags.status = 'isLoading';
    },
    [fetchTags.fulfilled]: (state, action) => {
      state.tags.items = action.payload;
      state.tags.status = 'isLoaded';
      console.log(action.payload);
    },
    [fetchRemovePost.pending]: (state, action) => {
      state.posts.items = state.posts.items.filter((obj) => obj._id !== action.meta.arg);
    },
  },
});

export const postsReducer = postsSlice.reducer;
