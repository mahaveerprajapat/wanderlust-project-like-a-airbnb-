const Listing = require('./models/listing');
const Review = require('./models/review');

module.exports.isLoggedIn = (req,res,next) => {
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error","you must be logged in to create listing!");
       return res.redirect("/login");
      }
      next();
};

module.exports.saveRedirectUrl = (req,res,next) =>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

module.exports.isOnwer = async(req,res,next) =>{

    let { id } = req.params;
    let listing = await  Listing.findById(id);

    if(!listing.owner.equals(res.locals.currUser._id)){
      req.flash("error","you are not owner this listing");
      return res.redirect(`/listings/${id}`);
    }
    next();
};

module.exports.isReviewAuther = async(req,res,next) =>{

    let { id,reviewId } = req.params;
    let review = await  Review.findById(reviewId);

    if(!review.auther.equals(res.locals.currUser._id)){
      req.flash("error","you are not auther this review");
      return res.redirect(`/listings/${id}`);
    }
    next();
}