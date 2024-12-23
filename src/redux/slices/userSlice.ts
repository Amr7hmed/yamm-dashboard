// src/store/usersSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface User {
  name: string;
  id: string;
  email: string;
  role: 'Admin' | 'User' | 'Guest';
  isActive: 'نشط' | 'غير نشط';
}

interface UsersState {
  users: User[];
  selectedUser: User | null;
  loading: boolean;
  error: string | null;
  emptyMessage: string;
}

const initialState: UsersState = {
  users: [],
  selectedUser: null,
  loading: false,
  error: null,
  emptyMessage: 'لا يوجد أي مستخدمين.',
};

// جلب قائمة المستخدمين
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get<User[]>('http://localhost:5000/users');
  return response.data;
});

// حذف مستخدم
export const deleteUser = createAsyncThunk('users/deleteUser', async (userId: string) => {
  await axios.delete(`http://localhost:5000/users/${userId}`);
  return userId;
});
// تحديث حالة المستخدم وتغيير الدور
export const toggleUserStatus = createAsyncThunk(
  'users/toggleUserStatus',
  async (user: {
    id: string;
    name: string;
    email: string;
    isActive: 'نشط' | 'غير نشط';
    role: 'Admin' | 'User' | 'Guest';
  }) => {
    const response = await axios.put(`http://localhost:5000/users/${user.id}`, {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
    });
    return response.data; // إعادة بيانات المستخدم بعد التحديث
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    selectUser(state, action: PayloadAction<string>) {
      state.selectedUser = state.users.find(user => user.id === action.payload) || null;
    },
    clearSelectedUser(state) {
      state.selectedUser = null;
    },
  },
  extraReducers: builder => {
    builder
      // جلب المستخدمين
      .addCase(fetchUsers.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.loading = false;
        state.users = action.payload;
        // إذا كانت القائمة فارغة، يعرض رسالة
        if (state.users.length === 0) {
          state.emptyMessage = 'لا يوجد أي مستخدمين.';
        } else {
          state.emptyMessage = '';
        }
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'فشل في جلب المستخدمين.';
      })
      // حذف مستخدم
      .addCase(deleteUser.fulfilled, (state, action: PayloadAction<string>) => {
        state.users = state.users.filter(user => user.id !== action.payload);
        // إذا كانت القائمة فارغة بعد الحذف
        if (state.users.length === 0) {
          state.emptyMessage = 'لا يوجد أي مستخدمين.';
        }
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.error = action.error.message || 'فشل في حذف المستخدم.';
      })
      // تحديث حالة المستخدم وتغيير الدور
      .addCase(toggleUserStatus.fulfilled, (state, action: PayloadAction<User>) => {
        state.users = state.users.map(user => {
          if (user.id === action.payload.id) {
            // هنا نقوم بتحديث كل من الـ isActive و role
            return { ...user, isActive: action.payload.isActive, role: action.payload.role };
          }
          return user;  // إذا لم يكن نفس المستخدم، نعيده كما هو
        });
      })
      .addCase(toggleUserStatus.rejected, (state, action) => {
        state.error = action.error.message || 'فشل في تحديث حالة المستخدم.';
      });
  },
});

export const { selectUser, clearSelectedUser } = usersSlice.actions;
export default usersSlice.reducer;
