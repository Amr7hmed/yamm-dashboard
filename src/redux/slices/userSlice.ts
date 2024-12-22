import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// تعريف الواجهة
interface User {
  userId: string;
  username: string;
  email: string;
  role: string;
  isActive: boolean;
}

interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

// تعريف Thunk لجلب المستخدمين
export const getUsers = createAsyncThunk('users/getUsers', async () => {
  const response = await fetch('http://localhost:5000/users');
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  return await response.json();
});

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load users';
      });
  },
});

export default userSlice.reducer;
