const express = require('express');
const router = express.Router({ mergeParams: true });
const wrapAsync = require('../utilis/wrapAsync.js');
const ExpressError = require('../utilis/ExpressError.js');
const review = require('../models/review.js');
const Listing = require("../models/listing.js");
const { isLoggedIn,isReviewAuther } = require('../middleware.js');
const reviewController = require('../controllers/reviews.js');

//post route:-
router.post("/",isLoggedIn,wrapAsync(reviewController.createReview));
  
  // delete review route:-
  router.delete("/:reviewId",isLoggedIn,isReviewAuther,wrapAsync(reviewController.distroyReview));
  

  module.exports = router;