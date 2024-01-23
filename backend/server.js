import express from "express";
import dotenv from 'dotenv'
dotenv.config();
import ConnectDB from "./config/db.js"
import products from "./data/products.js" //extension needed in backend for own modules
import connectDB from "./config/db.js";
const port = process.env.PORT || 5000; //different port for backend

connectDB(); //connect to MongoDB
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