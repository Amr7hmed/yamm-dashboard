// src/slices/orderSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchOrders } from '../../services/api';

// نوع البيانات الخاصة بالطلب
interface Order {
  orderId: string;
  customerName: string;
  orderDate: string;
  status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
  totalAmount: number;
}

// حالة الـ Redux للطلبات
interface OrderState {
  orders: Order[];
  loading: boolean;
  error: string | null;
}

// إعداد الـ slice
const initialState: OrderState = {
  orders: [],
  loading: false,
  error: null,
};

// إحضار الطلبات باستخدام thunk
export const getOrders = createAsyncThunk('orders/getOrders', async () => {
  const response = await fetchOrders();
  return response;
});

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch orders';
      });
  },
});

export default orderSlice.reducer;
