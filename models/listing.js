const mongoose = require('mongoose');
const Review = require('./review.js');

const Schema = mongoose.Schema;

const ListingSchema = new Schema({
    title:{
         type: String,
         required: true,
         
    },
    discription :{
          type: String,
          
    }, 
      image: {
        url: String,
        filename: String,
      },
    
    price: Number,
    location: String,
    country: String,
    reviews:[
      {
        type:Schema.Types.ObjectId,
        ref:"Review",
      },
    ],
    owner:{
        type: Schema.Types.ObjectId,
        ref : "User",
    },
});

ListingSchema.post("findOneAndDelete",async (Listing)=>{
  if(Listing){
    await Review.deleteMany({_id:{$in:Listing.reviews}});
  }
});

const Listing = mongoose.model("Listing",ListingSchema);
module.exports = Listing;