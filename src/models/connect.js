const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/logindata")
.then(()=>{
 console.log("connected successful")
})
.catch((err)=>{
 console.log(err)
})