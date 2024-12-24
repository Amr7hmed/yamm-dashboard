import { useEffect, useState } from 'react';
import Table from '../components/table/Table';
import { clearSelectedOrder, fetchOrders, selectOrder, updateOrderStatus } from '../redux/slices/orderSlice';
import { deleteOrder } from '../redux/slices/orderSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import Action from '../components/actions/order-action';

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
      dispatch(updateOrderStatus({
        id: selectedOrder.id,
        name: selectedOrder.name,
        date: selectedOrder.date,
        status: newStatus,
        total: selectedOrder.total.toString()
      }))
        .then(() => {
          dispatch(selectOrder(selectedOrder.id));
          handleCloseDetails(); // Close the modal after updating
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


  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container-fluid">
      <h2>Orders Overview</h2>
      {orders.length > 0 ? (
        <Table columns={columns} data={orders} Actions={(props) => <Action {...props} handleViewDetails={handleViewDetails} handleDelete={handleDelete} />} />
      ) : (
        <p>{emptyMessage}</p>
      )}

      {/* Custom Modal */}
      {selectedOrder && (
        <div className="custom-modal" style={{ display: selectedOrder ? 'block' : 'none' }}>
          <div className="modal-content">
            <span className="close-btn" onClick={handleCloseDetails}>&times;</span>
            <h3>Order Details</h3>
            <p><strong>Customer Name:</strong> {selectedOrder.name}</p>
            <p><strong>Order Date:</strong> {selectedOrder.date}</p>
            <p><strong>Current Status:</strong> {selectedOrder.status}</p>
            <label>
              <strong>Update Status:</strong>
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
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={handleCloseDetails}>Close</button>
              <button className="btn btn-primary" onClick={handleUpdateStatus}>Update Status</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default OrdersOverview;
