import React from "react";
import { useParams } from "react-router-dom";
import { Typography, Paper, List, ListItem, ListItemText, Divider, CircularProgress, Box } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { fetchOrderDetails } from "../api/server";

const OrderDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { data: order, isLoading, error } = useQuery({
    queryKey: ["orderDetails", id],
    queryFn: () => fetchOrderDetails(id!),
    enabled: !!id, // لا تبدأ الفetch إلا إذا كان هناك ID
  });

  if (isLoading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </Box>
    );

  if (error) return <Typography variant="h5" color="error">Failed to load order details</Typography>;
  if (!order) return <Typography variant="h5" color="textSecondary">Order not found</Typography>;

  return (
    <Paper
      sx={{
        p: 4,
        maxWidth: 600,
        mx: "auto",
        my: 4,
        borderRadius: 3,
        boxShadow: 3,
        backgroundColor: "background.paper",
      }}
    >
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Order #{order.id}
      </Typography>
      <Typography variant="h6" color="primary">Store: {order.store_name}</Typography>
      <Typography variant="h6" color="secondary">Amount: ${order.amount}</Typography>
      <Typography variant="h6" sx={{ mt: 2 }}>Items:</Typography>
      <List>
        {order.items.map((item: { id: string; name: string; price: number; quantity: number }, index: number) => (
          <React.Fragment key={item.id}>
            <ListItem>
              <ListItemText
                primary={item.name}
                secondary={`Price: $${item.price} - Quantity: ${item.quantity}`}
              />
            </ListItem>
            {index !== order.items.length - 1 && <Divider />} {/* إضافة فاصل بين العناصر */}
          </React.Fragment>
        ))}
      </List>
    </Paper>
  );
};

export default OrderDetails;
