/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import Table from '../components/table/Table';
import { fetchOrders } from '../services/api';
import { Order } from '../types/order';

const OrdersOverview = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchOrders()
      .then((data: React.SetStateAction<Order[]>) => {
        setOrders(data);
        setLoading(false);
      })
      .catch((error: any) => {
        console.error('Error fetching orders:', error);
        setLoading(false);
      });
  }, []);

  const columns = [
    { title: 'Order ID', key: 'orderId' },
    { title: 'Customer Name', key: 'customerName' },
    { title: 'Order Date', key: 'orderDate' },
    { title: 'Status', key: 'status' },
    { title: 'Total Amount', key: 'totalAmount' },
  ];

  const actions = (
    <>
      <button className="btn btn-info">View</button>
      <button className="btn btn-warning">Update Status</button>
      <button className="btn btn-danger">Delete</button>
    </>
  );

  return (
    <div className="container-fluid">
      <h2>Orders Overview</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Table columns={columns} data={orders} actions={actions} />
      )}
    </div>
  );
};

export default OrdersOverview;
