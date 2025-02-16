import { Routes, Route } from "react-router-dom";
import RefundOrders from "./pages/RefundOrders";
import OrderDetails from "./pages/OrderDetails";
import Sidebar from "./components/sideBar";
import { Box } from "@mui/material";
import { ThemeProviderWrapper } from "./theme/ThemeContext";

const App = () => {
  return (
    <ThemeProviderWrapper>
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Routes>
            <Route path="/" element={<RefundOrders />} />
            <Route path="/orders/:id" element={<OrderDetails />} />
          </Routes>
        </Box>
      </Box>
    </ThemeProviderWrapper>
  );
};

export default App;
