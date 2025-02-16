import React, { useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from "@mui/material";
import OrderRow from "./OrderRow";
import { Order } from "../types";

interface Props {
  data: Order[];
  onToggleStatus: (id: string) => void;
  onChangeDecision: (id: string, decision: string) => void;
}

const OrdersTable: React.FC<Props> = ({ data, onToggleStatus, onChangeDecision }) => {
  const [page, setPage] = useState(0);
  const rowsPerPage = 3;

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const paginatedData = data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Store</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Items</TableCell>
            <TableCell>Active</TableCell>
            <TableCell>Decision</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedData.map((order) => (
            <OrderRow key={order.id} order={order} onToggleStatus={onToggleStatus} onChangeDecision={onChangeDecision} />
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[]} 
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
      />
    </TableContainer>
  );
};

export default OrdersTable;
