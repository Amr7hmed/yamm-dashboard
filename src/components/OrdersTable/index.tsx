import React, { useState } from "react";
import { Table, TableBody, TableContainer, Paper, TablePagination } from "@mui/material";
import OrderRow from "./OrderRow";
import { OrderTableProps } from "../types";
import Tablehead from "./TableHead";


const OrdersTable: React.FC<OrderTableProps> = ({ data, onToggleStatus, onChangeDecision }) => {
  const [page, setPage] = useState(0);
  const rowsPerPage = 3;

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const paginatedData = data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const HeadTableArray = ["ID", "Store", "Amount", "Items", "Active", "Decision"];

  return (
    <TableContainer component={Paper}>
      <Table>
        <Tablehead HeadTableArray={HeadTableArray} />
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
