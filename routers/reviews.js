const express = require("express");
const router = express.Router();
const advanceResults = require("../middleware/advanceResults");
const Review = require("../models/Review");
const { protect, authorize } = require("../middleware/auth");
const {
  getReviews,
  getReview,
  addReview,
  updateReview,
  deleteReview,
} = require("../controllers/reviews");

router
  .route("/")
  .get(
    advanceResults(Review, { path: "bootcamp", select: "name description" }),
    getReviews
  )
  .post(protect, authorize("user", "admin"), addReview);

router
  .route("/:id")
  .get(getReview)
  .put(protect, authorize("admin", "user"), updateReview)
  .delete(protect, authorize("admin", "user"), deleteReview);

module.exports = router;
