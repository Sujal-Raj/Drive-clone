const express = require("express");
const router = express.Router();
const { body, validationResult } = require('express-validator');

router.use(express.json());
router.use(express.urlencoded({extended:true}));

router.get("/",(req,res)=>{
    res.send("user routes page")
})

router.get("/register",(req,res)=>{
    res.render("register")
})

router.post("/register",
    body("email").trim().isEmail().isLength({min:7}),
    body("password").trim().isLength({min:5}),
    body("username").trim().isLength({min:3}),
    (req,res)=>{
    console.log(req.body);
    res.send("submitted");
})

module.exports = router