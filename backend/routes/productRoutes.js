import express from "express";
const router = express.Router();
import {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    createProductReview,
    getTopProducts,
} from "../controllers/productController.js";
import { protect, admin } from '../middleware/authMiddleware.js';
import checkObjectId from "../middleware/checkObjectId.js";

// Route for getting all products or adding a new product
router.route('/').get(getProducts).post(protect, admin, createProduct);

// Route for getting top rated products
router.get('/top', getTopProducts);

// Route for getting a product by ID, updating, or deleting it
router
    .route('/:id')
    .get(checkObjectId, getProductById)
    .put(protect, admin, checkObjectId, updateProduct)
    .delete(protect, admin, checkObjectId, deleteProduct);

// Route for creating a review for a product
router.route('/:id/reviews').post(protect, checkObjectId, createProductReview);

export default router;
