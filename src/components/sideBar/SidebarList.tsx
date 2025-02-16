import React from "react";
import { List, Divider, Box, Typography } from "@mui/material";
import SidebarItem from "./SidebarItem";
import ThemeToggle from "./ThemeToggle";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import { useThemeContext } from "../../theme/ThemeContext"; 
interface Props {
  onClose: () => void;
}

const SidebarList: React.FC<Props> = ({ onClose }) => {
  const { darkMode } = useThemeContext();

  return (
    <>
      <Box sx={{ textAlign: "center", p: 2 }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            color: darkMode ? "#90caf9" : "#1976d2",
          }}
        >
          Refund Orders
        </Typography>
      </Box>
      <Divider />
      <List>
        <SidebarItem to="/" text="Refund Orders" icon={<ReceiptLongIcon />} onClick={onClose} />
        <ThemeToggle />
      </List>
    </>
  );
};

export default SidebarList;
