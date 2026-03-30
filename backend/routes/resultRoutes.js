import express from 'express';
const router = express.Router();
import resultController from '../controllers/resultController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { adminOnly } from '../middlewares/roleMiddleware.js';

// Route to create a new result (POST /api/results) - Admin only
router.post('/', protect, adminOnly, resultController.createResult);

// Route to get all results - Admin only
router.get('/', protect, adminOnly, resultController.getAllResults);

// Route to get a specific result by ID - Protected
router.get('/:id', protect, resultController.getResultById);

// Route to update a result by ID - Admin only
router.put('/:id', protect, adminOnly, resultController.updateResult);

// Route to delete a result by ID - Admin only
router.delete('/:id', protect, adminOnly, resultController.deleteResult);

export default router;