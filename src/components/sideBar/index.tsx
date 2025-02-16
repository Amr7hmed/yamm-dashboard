import React, { useState } from "react";
import { Drawer, AppBar, Toolbar, IconButton, Typography, useMediaQuery, useTheme } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SidebarList from "./SidebarList"; 
const Sidebar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const toggleDrawer = () => setMobileOpen(!mobileOpen);

  return (
    <>
      {isMobile && (
        <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={toggleDrawer} sx={{ marginRight: 2 }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6">Refund Orders</Typography>
          </Toolbar>
        </AppBar>
      )}

      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? mobileOpen : true}
        onClose={toggleDrawer}
        sx={{
          width: "250px",
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: "250px",
            boxSizing: "border-box",
          },
        }}
      >
        <SidebarList onClose={toggleDrawer} />
      </Drawer>
    </>
  );
};

export default Sidebar;
