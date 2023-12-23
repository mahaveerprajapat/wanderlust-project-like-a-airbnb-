const mongoose = require('mongoose');
const initData = require('./data.js');

const Listing = require("./models/Listing.js");

main()
.then((res)=>{
    console.log("connection successfully");
})
.catch((err) => {
    console.log(err)
});

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

const initDB = async()=>{
   await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({ ...obj,owner: "658180d44d78f4867a7fdfa8"}));
   await Listing.insertMany(initData.data);
    console.log("data was initialized");
    

};

initDB();