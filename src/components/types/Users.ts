// Type definitions for the Users component

export interface User {
    name: string;
    id: string;
    email: string;
    role: 'Admin' | 'User' | 'Guest';
    isActive: 'active' | 'inactive';
  }
  
  export interface UsersState {
    users: User[];
    selectedUser: User | null;
    loading: boolean;
    error: string | null;
    emptyMessage: string;
  }
  

export type ToggleUserStatusPayload = {
  id: string;
  name: string;
  email: string;
  isActive: 'Active' | 'Inactive';
  role: 'Admin' | 'User' | 'Guest';
};
