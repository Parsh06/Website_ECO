const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

const products = require('./item.json');

app.use(cors());

app.get('/api/products', (req, res) => {
  res.json(products);
});

  
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
