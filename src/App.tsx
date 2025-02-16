import React from "react";
import { Routes, Route } from "react-router-dom";
import { Box, CssBaseline } from "@mui/material";
import Sidebar from "./components/Sidebar";
import RefundOrders from "./pages/RefundOrders";
import OrderDetails from "./pages/OrderDetails";

const App: React.FC = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, overflowX: "auto" }}>
        <Routes>
          <Route path="/" element={<RefundOrders />} />
          <Route path="/orders/:id" element={<OrderDetails />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default App;
