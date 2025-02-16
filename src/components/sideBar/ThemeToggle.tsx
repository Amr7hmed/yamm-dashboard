import React from "react";
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { useThemeContext } from "../../theme/ThemeContext"; 

const ThemeToggle: React.FC = () => {
  const { toggleTheme, darkMode } = useThemeContext();

  return (
    <ListItem>
      <ListItemButton onClick={toggleTheme}>
        <ListItemIcon>{darkMode ? <Brightness7 /> : <Brightness4 />}</ListItemIcon>
        <ListItemText primary={darkMode ? "Light Mode" : "Dark Mode"} />
      </ListItemButton>
    </ListItem>
  );
};

export default ThemeToggle;
