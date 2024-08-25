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

/// Fetch reviews with username
const getReviewsForMovie = async (req, res) => {
  try {
    const reviews = await Review.find({ movieId: req.params.movieId })
      .populate('user_id', 'username') // Populate the username from the User model
      .exec();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createReview,
  getReviewsForMovie,
};
