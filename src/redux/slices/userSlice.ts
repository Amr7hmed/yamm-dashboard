// src/redux/slices/usersSlice.ts

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { User, UsersState, ToggleUserStatusPayload } from '../../components/types/Users'; // Importing types for better type safety

// Initial state for users slice
const initialState: UsersState = {
  users: [],
  selectedUser: null,
  loading: false,
  error: null,
  emptyMessage: 'No users available.',  // Message when no users are present
};

// Fetching the user list from the server
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get<User[]>('http://localhost:5000/users');
  return response.data;
});

// Deleting a user by their ID
export const deleteUser = createAsyncThunk('users/deleteUser', async (userId: string) => {
  await axios.delete(`http://localhost:5000/users/${userId}`);
  return userId;
});

// Updating a user's status and role
export const toggleUserStatus = createAsyncThunk(
  'users/toggleUserStatus',
  async (user: ToggleUserStatusPayload) => {
    const response = await axios.put(`http://localhost:5000/users/${user.id}`, {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
    });
    return response.data;
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // Action to select a specific user by their ID
    selectUser(state, action: PayloadAction<string>) {
      state.selectedUser = state.users.find(user => user.id === action.payload) || null;
    },
    // Action to clear the selected user
    clearSelectedUser(state) {
      state.selectedUser = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.loading = false;
        state.users = action.payload;
        // If there are no users, set an empty message
        if (state.users.length === 0) {
          state.emptyMessage = 'No users available.';
        } else {
          state.emptyMessage = '';
        }
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        // In case of error, update the error message
        state.error = action.error.message || 'Failed to fetch users.';
      })
      .addCase(deleteUser.fulfilled, (state, action: PayloadAction<string>) => {
        // Remove the deleted user from the list
        state.users = state.users.filter(user => user.id !== action.payload);
        // If there are no users left after deletion, set the empty message
        if (state.users.length === 0) {
          state.emptyMessage = 'No users available.';
        }
      })
      .addCase(deleteUser.rejected, (state, action) => {
        // In case of error while deleting, update the error message
        state.error = action.error.message || 'Failed to delete user.';
      })
      .addCase(toggleUserStatus.fulfilled, (state, action: PayloadAction<User>) => {
        // Update the user's status and role in the list
        state.users = state.users.map(user => {
          if (user.id === action.payload.id) {
            return { ...user, isActive: action.payload.isActive, role: action.payload.role };
          }
          return user;
        });
      })
      .addCase(toggleUserStatus.rejected, (state, action) => {
        // In case of error while updating user status, update the error message
        state.error = action.error.message || 'Failed to update user status.';
      });
  },
});

// Exporting actions for use in components
export const { selectUser, clearSelectedUser } = usersSlice.actions;

// Exporting the reducer to be used in the store
export default usersSlice.reducer;
