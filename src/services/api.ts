// src/services/api.ts
export const fetchOrders = async () => {
  const response = await fetch('http://localhost:5000/orders');
  const data = await response.json();
  return data;
};

export const fetchUsers = async () => {
  const response = await fetch('http://localhost:5000/users');
  const data = await response.json();
  return data;
};
