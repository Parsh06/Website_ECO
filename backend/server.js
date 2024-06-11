const express = require('express');
const cors = require('cors');
const multer = require('multer');
const app = express();
const port = 3001;

let products = require('./item.json');

app.use(cors());
app.use(express.json());

// Set up multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

app.use('/uploads', express.static('uploads'));

// Get all products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// Get featured items
app.get('/api/products/featured', (req, res) => {
  const featuredItems = products.filter(item => item.feature);
  res.json(featuredItems);
});

// Get stocked items
app.get('/api/products/stocked', (req, res) => {
  const stockedItems = products.filter(item => item.stocked);
  res.json(stockedItems);
});

// Get item by ID
app.get('/api/products/:id', (req, res) => {
  const itemId = parseInt(req.params.id, 10);
  const item = products.find(i => i.id === itemId);
  if (item) {
    res.json(item);
  } else {
    res.status(404).send('Item not found');
  }
});

// Create a new item
app.post('/api/products', upload.single('image'), (req, res) => {
  const newItem = req.body;
  newItem.id = products.length ? products[products.length - 1].id + 1 : 1;
  newItem.image = req.file ? `/uploads/${req.file.filename}` : '';
  products.push(newItem);
  res.status(201).json(newItem);
});

// Update an item by ID
app.put('/api/products/:id', (req, res) => {
  const itemId = parseInt(req.params.id, 10);
  const itemIndex = products.findIndex(i => i.id === itemId);
  if (itemIndex > -1) {
    products[itemIndex] = { ...products[itemIndex], ...req.body };
    res.json(products[itemIndex]);
  } else {
    res.status(404).send('Item not found');
  }
});

// Delete an item by ID
app.delete('/api/products/:id', (req, res) => {
  const itemId = parseInt(req.params.id, 10);
  const itemIndex = products.findIndex(i => i.id === itemId);
  if (itemIndex > -1) {
    products.splice(itemIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).send('Item not found');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
