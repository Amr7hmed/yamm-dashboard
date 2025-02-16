import axios from "axios";

const API_URL = "http://localhost:5000/refundOrders";

export const fetchOrders = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const updateOrderStatus = async (id: string, active: boolean) => {
  await axios.patch(`${API_URL}/${id}`, { active });
};

export const updateOrderDecision = async (id: string, decision: string) => {
  await axios.patch(`${API_URL}/${id}`, { decision });
};

export const fetchOrderDetails = async (id: string) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};
