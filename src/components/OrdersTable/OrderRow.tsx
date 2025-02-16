import React from "react";
import { TableRow, TableCell, Avatar, Switch, Select, MenuItem } from "@mui/material";
import { Order } from "../types"; // تأكد من وجود ملف `types.ts` يحتوي على تعريف `Order`
import { useNavigate } from "react-router-dom";

interface Props {
  order: Order;
  onToggleStatus: (id: string) => void;
  onChangeDecision: (id: string, decision: string) => void;
}

const OrderRow: React.FC<Props> = ({ order, onToggleStatus, onChangeDecision }) => {
  const navigate = useNavigate();

  return (
    <TableRow>
      <TableCell 
        onClick={() => navigate(`/orders/${order.id}`)} 
        style={{ cursor: "pointer", textDecoration: "underline", color: "blue" }}
      >
        {order.id}
      </TableCell>
      <TableCell style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <Avatar src={order.store_logo} alt="Store Logo" />
        <span 
          onClick={() => window.open(order.store_url, "_blank")} 
          style={{ cursor: "pointer", textDecoration: "underline", color: "blue" }}
        >
          {order.store_name}
        </span>
      </TableCell>
      <TableCell>${order.amount}</TableCell>
      <TableCell>{order.items.length}</TableCell>
      <TableCell>
        <Switch checked={order.active} onChange={() => onToggleStatus(order.id)} />
      </TableCell>
      <TableCell>
        <Select value={order.decision || "not-yet"} onChange={(e) => onChangeDecision(order.id, e.target.value)}>
          <MenuItem value="not-yet">Not Yet</MenuItem>
          <MenuItem value="accept">Accept</MenuItem>
          <MenuItem value="reject">Reject</MenuItem>
          <MenuItem value="escalate">Escalate</MenuItem>
        </Select>
      </TableCell>
    </TableRow>
  );
};

export default OrderRow;
