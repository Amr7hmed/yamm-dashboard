/* eslint-disable @typescript-eslint/no-explicit-any */
import { OrdersState } from './Orders'; // Import OrdersState from Orders
import { UsersState } from './Users'; // Import UsersState from Users

// Define the RootState to include the orders and users slices
export interface RootState {
  orders: OrdersState;  // Add the orders slice to the root state
  users: UsersState;    // Add the users slice to the root state
}

// Define the AppDispatch type (assuming you are using redux-thunk)
export type AppDispatch = (action: any) => void;
