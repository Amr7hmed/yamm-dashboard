import React from "react";
import { Drawer, List, ListItemText, ListItemButton } from "@mui/material";

const Sidebar: React.FC = () => {
  return (
    <Drawer variant="permanent" sx={{ width: 240, flexShrink: 0 }}>
      <List>
        <ListItemButton>
          <ListItemText primary="Refund Orders" />
        </ListItemButton>
      </List>
    </Drawer>
  );
};

export default Sidebar;