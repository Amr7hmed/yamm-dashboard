import React from "react";
import { Box, CssBaseline } from "@mui/material";
import Sidebar from "./components/Sidebar";
import RefundOrders from "./pages/RefundOrders";

const App: React.FC = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, overflowX: "auto" }}>
        <RefundOrders />
      </Box>
    </Box>
  );
};

export default App;