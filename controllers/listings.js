const Listing = require('../models/listing');

module.exports.index =  async (req, res) => {
    let allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
  
  };

  module.exports.renderNewform =  (req, res) => {
    res.render("listings/new.ejs");
  };

  module.exports.showListing =  async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id).populate({path: "reviews",populate:{path:"auther",},}).populate("owner");
    if(!listing){
      req.flash("error","listing you requested for does not exist!");
      res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing });
  };

  module.exports.createlisting  = async (req, res, next) => {
    if(!req.body.listing){
      throw new ExpressError(404,"send valid for listing");
    }
    let url = req.file.path;
    let filename = req.file.filename;

    const newlisting = new Listing(req.body.listing);
    newlisting.owner = req.user._id;
    newlisting.image = {url,filename};
    await newlisting.save();
    req.flash("success","New listing Created!");
    res.redirect("/listings");
  
  };


  module.exports.renderEditfrom = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if(!listing){
      req.flash("error","listing you requested for does not exist!");
      res.redirect("/listings");
    }

    let originalImageurl = listing.image.url;
    originalImageurl = originalImageurl.replace("/upload", "/upload/ar_1.0,c_thumb,g_face,w_0.4/r_max/co_skyblue,e_outline/co_lightgray,e_shadow,x_5,y_8");

    res.render("listings/edit.ejs", { listing,originalImageurl });
  };


  module.exports.updateListing =  async (req, res) => {
    if(!req.body.listing){
      throw new ExpressError(404,"send valid for listing");
    }
    let { id } = req.params;
  let listing  =   await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  if(typeof req.file !== "undefined")
  {
   let url = req.file.path;
   let filename = req.file.filename;
  listing.image = { url,filename};
   await listing.save();
  }

    req.flash("success","listing Updated!");
    res.redirect(`/listings/${id}`);
  };

  module.exports.distroyListing = async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    // console.log(deletedListing);
    req.flash("success","listing Deleted!");
    res.redirect("/listings");
  };