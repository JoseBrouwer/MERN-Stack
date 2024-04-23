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
    getFilteredProducts, // Import the function for filtered products
} from "../controllers/productController.js";
import { protect, admin } from '../middleware/authMiddleware.js';
import checkObjectId from "../middleware/checkObjectId.js";

// Added route for getting products with filters
router.route('/').get(getProducts).post(protect, admin, createProduct);

// Added route for filtering products by price and category
router.route('/filter').get(getFilteredProducts);

router.route('/:id/reviews').post(protect, checkObjectId, createProductReview);
router.get('/top', getTopProducts);
router.route('/search').get(getProducts);
router
    .route('/:id')
    .get(checkObjectId, getProductById)
    .put(protect, admin, checkObjectId, updateProduct)
    .delete(protect, admin, checkObjectId, deleteProduct);

export default router;
