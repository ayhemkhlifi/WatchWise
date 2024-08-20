const Review = require('../Models/reviewModels');

// Create a new review
const createReview = async (req, res, next) => {
  const { movieId, review, user_id } = req.body;
  
  try {
    const newReview = await Review.create({
      movieId,
      user_id: req.user._id,
      
      review,
    });
    res.status(201).json(newReview);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all reviews for a movie
const getReviews = async (req, res) => {
  const { movieId } = req.params;

  try {
    const reviews = await Review.find({ movieId }).sort({ createdAt: -1 });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createReview,
  getReviews,
};
