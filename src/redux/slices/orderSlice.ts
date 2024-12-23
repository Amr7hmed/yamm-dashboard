// src/store/ordersSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Order {
  id: string;
  customerName: string;
  orderDate: string;
  status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
  totalAmount: number;
}

interface OrdersState {
  orders: Order[];
  selectedOrder: Order | null; // عنصر واحد لعرض التفاصيل
  loading: boolean;
  error: string | null;
  emptyMessage: string;
}

const initialState: OrdersState = {
  orders: [],
  selectedOrder: null,
  loading: false,
  error: null,
  emptyMessage: "لا توجد طلبات متاحة.",
};

// Async thunk لجلب الطلبات
export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
  const response = await axios.get<Order[]>('http://localhost:5000/orders');
  return response.data;
});

// Async thunk لحذف طلب
export const deleteOrder = createAsyncThunk('orders/deleteOrder', async (orderId: string) => {
  await axios.delete(`http://localhost:5000/orders/${orderId}`);
  return orderId;
});

// Async thunk لتحديث الحالة
export const updateOrderStatus = createAsyncThunk(
  'orders/updateOrderStatus',
  async ({ id, status }: { id: string; status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled' }) => {
    await axios.put(`http://localhost:5000/orders/${id}`, { status });
    return { id, status };
  }
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    selectOrder: (state, action: PayloadAction<string>) => {
      state.selectedOrder = state.orders.find(order => order.id === action.payload) || null;
    },
    clearSelectedOrder: state => {
      state.selectedOrder = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchOrders.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action: PayloadAction<Order[]>) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch orders';
      })
      .addCase(deleteOrder.fulfilled, (state, action: PayloadAction<string>) => {
        state.orders = state.orders.filter(order => order.id !== action.payload);
        if (state.orders.length === 0) {
          state.emptyMessage = "لا توجد طلبات متاحة.";
        }
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to delete order';
      })
      .addCase(updateOrderStatus.fulfilled, (state, action: PayloadAction<{ id: string; status: string }>) => {
        const { id, status } = action.payload;
        const order = state.orders.find(order => order.id === id);
        if (order) {
          order.status = status as Order['status'];
        }
        if (state.selectedOrder && state.selectedOrder.id === id) {
          state.selectedOrder.status = status as Order['status'];
        }
      });
  },
});

export const { selectOrder, clearSelectedOrder } = ordersSlice.actions;

export default ordersSlice.reducer;
