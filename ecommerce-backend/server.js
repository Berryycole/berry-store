const express = require("express");
const cors = require("cors");
const products = require("./data/products");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/categories", (req, res) => {
  const categories = [...new Set(products.map(product => product.category))];
  res.json(categories);
});

app.get("/", (req, res) => {
  res.send("E-commerce Product API is running....");
});

app.listen(5000, () => {
  console.log("Backend server running at http://localhost:5000");
});