import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import dotenv from 'dotenv';
import passport from 'passport';
import './config/passportConfig.js';
const port = process.env.PORT || 5000; //different port for backend

dotenv.config();

connectDB(); //connect to MongoDB
const app = express();

//Body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Cookie parser middleware
app.use(cookieParser());

app.use(passport.initialize());

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/api/config/paypal', (req, res) => 
    res.send({clientId: process.env.PAYPAL_CLIENT_ID})
);

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

if(process.env.NODE_ENV === 'production') {
    //Set static folder
    app.use(express.static(path.join(__dirname, 'frontend/build')));

    //any route that is not the api will load the index.html
    app.get('*', (req, res) => 
        res.sendFile (path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    );
} else {
    app.get('/', (req, res) => {
        res.send("API is running...")
    });
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`))