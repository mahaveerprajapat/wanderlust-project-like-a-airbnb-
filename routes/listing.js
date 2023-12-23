const express = require('express');
const router = express.Router();
const wrapAsync = require('../utilis/wrapAsync.js');
const ExpressError = require('../utilis/ExpressError.js');

const Listing = require("../models/listing.js");

const {isLoggedIn,isOnwer} = require("../middleware.js");
const ListingController = require("../controllers/listings.js");
const multer  = require('multer');
const {storage} = require('../cloudConfig.js');
const upload = multer({ storage });




router
.route("/")
.get(wrapAsync(ListingController.index))
.post(isLoggedIn,upload.single('listing[image]'), wrapAsync(ListingController.createlisting));


  // new route:-
  router.get("/new",isLoggedIn,ListingController.renderNewform);

router.route("/:id")
.get(wrapAsync(ListingController.showListing))
.put(isLoggedIn,isOnwer,upload.single('listing[image]'),wrapAsync(ListingController.updateListing))  
.delete(isLoggedIn,isOnwer,wrapAsync(ListingController.distroyListing)

);
  
  //edit route:-
  
  router.get("/:id/edit",isLoggedIn,isOnwer,wrapAsync(ListingController.renderEditfrom));
  
 
  
  module.exports = router;