const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs")
const data =mongoose.Schema({
    firstname : {
        type : String,
        required: true,
        
    },
    lastname : String,
    email    : {
        type : String,
        
        required : true,
        unique : true,
        
        validate(value){
            if(!validator.isEmail(value)){
                res.send("invalid mail");            }
        }
    },
    phone : {
        type : Number,
        required : true,
        unique : true
    },
    age : {
        type : Number,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    confirmpassword : {
        type : String,
        required : true
    }

})
data.pre("save",async function(next){
    // const passwordhash = await bcrypt.hash(password,10);
    console.log(`the current password is ${this.password}`)
    this.password = await bcrypt.hash(this.password,10);
    // console.log(`${this.password}`)
     next();
     this.confirmpassword = undefined;
 })
const Register = new mongoose.model("alldata",data);
module.exports = Register;

