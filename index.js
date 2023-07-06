import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from "./mongoDB/connect.js";


//import api routes-----------------------------------------------------------------------
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import wishlistRoutes from './routes/wishlistRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import shippingRoutes from './routes/shippingRoutes.js';
import searchRoutes from './routes/searchRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';



dotenv.config();

// Create an instance of Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());


//api routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/shipping', shippingRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/analytics', analyticsRoutes);





// Define your routes
app.get('/', (req, res) => {
    res.send('Welcome to e-Commerce store backend!');
});

// Start the server

const startServer = async () => {
    try {
        connectDB(process.env.MONGODB_URL);
        const port = process.env.PORT || 3000;
        app.listen(port, () => {
            console.log(`Server has started on port http://localhost:${port}`);
        })
    } catch (error) {
        console.log(error);
    }
}

startServer();
