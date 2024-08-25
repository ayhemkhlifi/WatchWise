const express = require('express');
const requireAuth = require('../middleware/RequireAuth');
const { createReview,getReviewsForMovie } = require('../controllers/reviewController');

const router = express.Router();

// Require authentication for all review routes
router.use(requireAuth);

// Route to create a review
router.post('/', createReview);

// Route to get all reviews for a movie
router.get('/:movieId', getReviewsForMovie);

module.exports = router;
