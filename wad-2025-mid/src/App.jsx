import { useState, useRef } from "react";
import { Container, Grid, Button, TextField, Select, MenuItem, FormControl, InputLabel, Box } from "@mui/material";
import QuotationTable from "./QuotationTable";

const products = [
  { code: "p001", name: "Product A", price: 100 },
  { code: "p002", name: "Product B", price: 200 },
  { code: "p003", name: "Product C", price: 150 },
  { code: "p004", name: "Product D", price: 250 },
];

function App() {
  const itemRef = useRef();
  const ppuRef = useRef();
  const qtyRef = useRef();
  const discountRef = useRef();

  // State management
  const [dataItems, setDataItems] = useState([]);
  const [ppu, setPpu] = useState(products[0].price)
  const [selectedProduct, setSelectedProduct] = useState(products[0].code)
  const [qty, setQty] = useState(1)
  const [discount, setDiscount] = useState(0)

  const addItem = () => {
    let item = products.find((v) => selectedProduct === v.code)

    const newItem = {
      item: item.name,
      ppu: parseFloat(ppu),
      qty: parseInt(qty),
      discount: parseFloat(discount) || 0,
    };

    // Check for redundant items (same name and price)
    const existingItemIndex = dataItems.findIndex(
      (existingItem) => existingItem.item === newItem.item && existingItem.ppu === newItem.ppu
    );

    if (existingItemIndex !== -1) {
      // Merge with existing item
      const updatedItems = [...dataItems];
      updatedItems[existingItemIndex] = {
        ...updatedItems[existingItemIndex],
        qty: updatedItems[existingItemIndex].qty + newItem.qty,
        discount: updatedItems[existingItemIndex].discount + newItem.discount,
      };
      setDataItems(updatedItems);
    } else {
      // Add as new item
      setDataItems([...dataItems, newItem]);
    }

    // Reset form
    setQty(1);
    setDiscount(0);
  };

  const deleteByIndex = (index) => {
    let newDataItems = [...dataItems];
    newDataItems.splice(index, 1);
    setDataItems(newDataItems);
  }

  const clearAll = () => {
    setDataItems([]); //revert to default state(empty)
  }

  const productChange = (event) => {
    const productCode = event.target.value;
    setSelectedProduct(productCode);
    let item = products.find((v) => productCode === v.code)
    setPpu(item.price)
  }

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Box sx={{ backgroundColor: "#e4e4e4", p: 2 }}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Item</InputLabel>
              <Select
                value={selectedProduct}
                label="Item"
                onChange={productChange}
              >
                {products.map((p) => (
                  <MenuItem key={p.code} value={p.code}>
                    {p.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            
            <TextField
              fullWidth
              margin="normal"
              label="Price Per Unit"
              type="number"
              value={ppu}
              onChange={(e) => setPpu(e.target.value)}
            />
            
            <TextField
              fullWidth
              margin="normal"
              label="Quantity"
              type="number"
              value={qty}
              onChange={(e) => setQty(e.target.value)}
            />
            
            <TextField
              fullWidth
              margin="normal"
              label="Discount"
              type="number"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
            />
            
            <Box sx={{ mt: 2 }}>
              <Button 
                variant="contained" 
                color="primary" 
                fullWidth
                onClick={addItem}
              >
                Add
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={8}>
          <QuotationTable
            data={dataItems}
            deleteByIndex={deleteByIndex}
            clearAll={clearAll}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;