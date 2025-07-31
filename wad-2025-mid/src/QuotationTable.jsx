import { Container, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableFooter, Typography, Box } from "@mui/material";
import { CiShoppingCart } from "react-icons/ci";
import { MdClear } from "react-icons/md";
import { BsFillTrashFill } from "react-icons/bs";

function QuotationTable({ data, deleteByIndex, clearAll }) {

  // Guard condition
  if (!data || data.length === 0) {
    return (
      <Container>
        <Typography variant="h4" component="h1" gutterBottom>
          Quotation
        </Typography>
        <Box display="flex" alignItems="center" gap={1}>
          <CiShoppingCart /> 
          <Typography>No items</Typography>
        </Box>
      </Container>
    );
  }

  const totalAmount = data.reduce((acc, v) => acc + (v.qty * v.ppu - v.discount), 0);
  const totalDiscount = data.reduce((acc, v) => acc + v.discount, 0);

  const handleDelete = (index) => {
    deleteByIndex(index)
  }

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Quotation
      </Typography>
      <Button 
        variant="outlined" 
        color="inherit" 
        startIcon={<MdClear />}
        onClick={clearAll}
        sx={{ mb: 2 }}
      >
        Clear
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">-</TableCell>
              <TableCell align="center">Qty</TableCell>
              <TableCell align="center">Item</TableCell>
              <TableCell align="center">Price/Unit</TableCell>
              <TableCell align="center">Discount</TableCell>
              <TableCell align="center">Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((v, i) => {
              let amount = v.qty * v.ppu - v.discount; //Quantity * Price Per Unit - Discount
              return (
                <TableRow key={i}>
                  <TableCell align="center">
                    <BsFillTrashFill 
                      onClick={() => handleDelete(i)} 
                      style={{ cursor: 'pointer' }}
                    />
                  </TableCell>
                  <TableCell align="center">{v.qty}</TableCell>
                  <TableCell>{v.item}</TableCell>
                  <TableCell align="center">{v.ppu}</TableCell>
                  <TableCell align="center">{v.discount}</TableCell>
                  <TableCell align="right">{amount}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4} align="right">
                <strong>Total Discount</strong>
              </TableCell>
              <TableCell align="center">
                <strong>{totalDiscount}</strong>
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={5} align="right">
                <strong>Total</strong>
              </TableCell>
              <TableCell align="right">
                <strong>{totalAmount}</strong>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default QuotationTable;