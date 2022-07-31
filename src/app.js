const express =require("express");
const path = require("path");
const hbs = require("hbs");
const register = require("../models/schema");
const bcrypt = require("bcryptjs")
const port = process.env.PORT || 8000;
require("../models/connect");
const app = express();
// let staticpath = path.join("../public");
// app.use(express.static(staticpath));
let partialPath= path.join(__dirname,"../template/partials");
let template_path=path.join(__dirname,"../template/views")
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.set("view engine","hbs");

app.set("views",template_path);

hbs.registerPartials(partialPath);
app.get("/",(req,res)=>{
    res.render("index")
})
app.get("/login",(req,res)=>{
    res.render("login")
})

app.post("/register",async (req,res)=>{
    try{
        const password= req.body.password;
        const cpassword = req.body.confirmpassword;
        if(password === cpassword){
            const newdata = new register({
                firstname : req.body.firstname,
                lastname : req.body.lastname,
                email : req.body.email,
                phone : req.body.phone,
                age : req.body.age,
                password : req.body.password,
                confirmpassword : req.body.confirmpassword

            })
            const registered = await newdata.save();
            console.log(registered);
            res.status(201). render("index");
        }
        else{
            res.send("password not matched");
        }
    }catch(e){
        res.send(e);
    }
})

app.post("/login",async (req,res)=>{
    const email = req.body.email;
    const pass = req.body.password;
    const useremail =await register.findOne({email:email});
    // console.log(useremail)
    const isMatch = bcrypt.compare(pass,useremail.password);
    if(isMatch){
        res.status(201).send("<h2>login succesful</h2>");
    }
    else{
        res.send("invalid details entered");
    }
})


app.listen(port,"127.0.0.1",()=>{
    console.log(`running on ${port}`)
});

