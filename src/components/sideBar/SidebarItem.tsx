import React from "react";
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import {  useNavigate } from "react-router-dom";

interface Props {
  to: string;
  text: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

const SidebarItem: React.FC<Props> = ({ to, text, icon, onClick }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(to);
    if (onClick) onClick();
  };

  return (
    <ListItem disablePadding>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={text} />
      </ListItemButton>
    </ListItem>
  );
};

export default SidebarItem;
