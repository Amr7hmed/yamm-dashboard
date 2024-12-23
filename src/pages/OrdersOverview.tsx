/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import Table from '../components/table/Table';
import { clearSelectedOrder, fetchOrders, selectOrder, updateOrderStatus } from '../redux/slices/orderSlice';
import { deleteOrder } from '../redux/slices/orderSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { Modal, Button } from 'react-bootstrap';

const OrdersOverview = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { orders, loading, error, emptyMessage, selectedOrder } = useSelector((state: RootState) => state.orders);
  const [newStatus, setNewStatus] = useState<'Pending' | 'Shipped' | 'Delivered' | 'Cancelled'>('Pending');

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const handleDelete = (id: string) => {
    dispatch(deleteOrder(id));
  };

  const handleViewDetails = (id: string) => {
    dispatch(selectOrder(id));
  };

  const handleUpdateStatus = () => {
    if (selectedOrder) {
      dispatch(updateOrderStatus({ id: selectedOrder.id, status: newStatus }))
        .then(() => {
          // بعد التحديث، نعيد جلب الطلب المحدث وتحديث المودال.
          dispatch(selectOrder(selectedOrder.id)); 
          handleCloseDetails(); // إغلاق المودال بعد التحديث
        });
    }
  };
  const handleCloseDetails = () => {
    dispatch(clearSelectedOrder());
  };
  const columns = [
    { title: 'Order ID', key: 'id' },
    { title: 'Customer Name', key: 'name' },
    { title: 'Order Date', key: 'date' },
    { title: 'Status', key: 'status' },
    { title: 'Total Amount', key: 'total' },
  ];

  const Action = (props: any) => {
    const { Item } = props;
    return (
      <div>
        <button className="btn btn-info" onClick={() => handleViewDetails(Item.id)}>View</button>

        <button className="btn btn-danger" onClick={() => {
          handleDelete(Item.id);
        }}>Delete</button>
      </div>
    );
  }

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <div className="container-fluid">
      <h2>Orders Overview</h2>
      {orders.length > 0 ? (
        <Table columns={columns} data={orders} Actions={Action} />
      ) : (
        <p>{emptyMessage}</p>
      )}
      {/* المودال */}
      {selectedOrder && (
        <Modal show={!!selectedOrder} onHide={handleCloseDetails}>
          <Modal.Header closeButton>
            <Modal.Title>تفاصيل الطلب</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p><strong>اسم العميل:</strong> {selectedOrder.customerName}</p>
            <p><strong>تاريخ الطلب:</strong> {selectedOrder.orderDate}</p>
            <p><strong>الحالة الحالية:</strong> {selectedOrder.status}</p>
            <label>
              <strong>تحديث الحالة:</strong>
              <select
                value={newStatus}
                onChange={e => setNewStatus(e.target.value as typeof newStatus)}
                className="form-control mt-2"
              >
                <option value="Pending">Pending</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </label>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseDetails}>
              إغلاق
            </Button>
            <Button variant="primary" onClick={handleUpdateStatus}>
              تحديث الحالة
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default OrdersOverview;