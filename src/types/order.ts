export interface Order {
    orderId: string;
    customerName: string;
    orderDate: string;
    status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
    totalAmount: number;
  }
  