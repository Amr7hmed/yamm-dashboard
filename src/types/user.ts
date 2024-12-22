export interface User {
    userId: string;
    username: string;
    email: string;
    role: 'Admin' | 'User' | 'Guest';
    isActive: boolean;
  }
  