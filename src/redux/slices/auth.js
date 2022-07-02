import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchAuth = createAsyncThunk('fetchAuth', async (params) => {
  const { data } = await axios.post('/auth/login', params);
  return data;
});
export const fetchAuthMe = createAsyncThunk('fetchAuthMe', async () => {
  const { data } = await axios.get('/auth/me');
  return data;
});
export const fetchReg = createAsyncThunk('fetchReg', async (params) => {
  const { data } = await axios.post('/auth/register', params);
  return data;
});

const initialState = {
  data: null,
  status: 'isLoading',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    },
  },
  extraReducers: {
    [fetchAuth.pending]: (state) => {
      state.data = null;
      state.status = 'isLoading';
    },
    [fetchAuth.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = 'isLoaded';
    },
    [fetchAuth.rejected]: (state, action) => {
      state.date = null;
      state.status = 'error';
    },
    [fetchAuthMe.pending]: (state) => {
      state.data = null;
      state.status = 'isLoading';
    },
    [fetchAuthMe.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = 'isLoaded';
    },
    [fetchAuthMe.rejected]: (state, action) => {
      state.date = null;
      state.status = 'error';
    },
    [fetchReg.pending]: (state) => {
      state.data = null;
      state.status = 'isLoading';
    },
    [fetchReg.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = 'isLoaded';
    },
    [fetchReg.rejected]: (state, action) => {
      state.date = null;
      state.status = 'error';
    },
  },
});
export const SelectIsAuth = (state) => Boolean(state.auth.data);
export const { logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
