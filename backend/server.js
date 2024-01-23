import express from "express";
import dotenv from 'dotenv'
dotenv.config();
import products from "./data/products.js" //extension needed in backend for own modules
const port = process.env.PORT || 5000; //different port for backend

const app = express();

app.get('/', (req, res) => {
    res.send("API is running...")
 });

app.get('/api/products', (req, res) => {
    res.json(products)
});

app.get('/api/products/:id', (req, res) => {
    const product = products.find((p) => p._id === req.params.id);
    res.send(product)
});

 app.listen(port, () => console.log(`Server running on port ${port}`))