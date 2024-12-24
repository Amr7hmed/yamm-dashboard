export interface Order {
    date: string;
    name: string;
    id: string;
    status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
    total: number;
  }
  
  export interface OrdersState {
    orders: Order[];
    selectedOrder: Order | null;
    loading: boolean;
    error: string | null;
    emptyMessage: string;
  }
  
  export interface UpdateOrderStatusPayload {
    id: string;
    name: string;
    date: string;
    status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
    total: string;
  }
  