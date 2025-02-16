import React, { useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
import Pagination from "@mui/material/Pagination";

interface Order {
  id: string;
  reason: string;
  store_name: string;
  store_logo: string;
  store_url: string;
  amount: number;
  active: boolean;
  decision: string;
}

interface TableProps {
  data: Order[];
  onToggleStatus: (id: string) => void;
  onChangeDecision: (id: string, decision: string) => void;
}

const TableComponent: React.FC<TableProps> = ({ data, onToggleStatus, onChangeDecision }) => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 2; // عدد العناصر لكل صفحة

  const handleChangePage = (_event: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };

  // تقسيم البيانات حسب الصفحة
  const paginatedData = data.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", p: 2 }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Store</TableCell>
              <TableCell>Reason</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Decision</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>
                  <a href={order.store_url} target="_blank" rel="noopener noreferrer">
                    <img src={order.store_logo} alt={order.store_name} width="30" style={{ marginRight: 8 }} />
                    {order.store_name}
                  </a>
                </TableCell>
                <TableCell>{order.reason}</TableCell>
                <TableCell>${order.amount}</TableCell>
                <TableCell>{order.active ? "Active" : "Inactive"}</TableCell>
                <TableCell>{order.decision}</TableCell>
                <TableCell>
                  <Button variant="contained" size="small" onClick={() => onToggleStatus(order.id)}>
                    Toggle Status
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{ ml: 1 }}
                    onClick={() => onChangeDecision(order.id, order.decision === "accept" ? "reject" : "accept")}
                  >
                    Change Decision
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination Controls */}
      <Pagination
        count={Math.ceil(data.length / rowsPerPage)}
        page={page}
        onChange={handleChangePage}
        sx={{ mt: 2, display: "flex", justifyContent: "center" }}
      />
    </Paper>
  );
};

export default TableComponent;
