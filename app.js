const express = require('express');
const app  = express();
const userRouter = require("./routes/user.routes");
const dotenv = require("dotenv");
const connectToDB = require("./config/db");
dotenv.config();
connectToDB();

app.set("view engine","ejs")
app.use("/user",userRouter);
// app.use(express.json());
// app.use(express.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.render("index")
})

app.listen(3000,()=>{
    console.log("Server started")
})