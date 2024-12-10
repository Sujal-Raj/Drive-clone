const express = require("express");
const router = express.Router();
const { body, validationResult } = require('express-validator');
const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.use(express.json());
router.use(express.urlencoded({extended:true}));

router.get("/",(req,res)=>{
    res.send("user routes page")
})

router.get("/register",(req,res)=>{
    res.render("register")
})

// router.post("/register",
//     body("email").trim().isEmail().isLength({min:7}),
//     body("password").trim().isLength({min:5}),
//     body("username").trim().isLength({min:3}),
//     async (req,res)=>{

//     const errors = validationResult(req);

//     if(!errors.isEmpty()){
//         return res.status(400).json({
//             errors:errors.array(),
//             message:"Invalid data"
//         })
//     }

//     const {username,password,email} = req.body;

//     const hashPassword = await bcrypt.hash(password,10);

//     const newUser = await userModel.create({
//         email:email,
//         username:username,
//         password:hashPassword,
//     })

//     res.json(newUser);
//     // res.send("user created successfully");
    
// })

router.post("/register",
    body("email").trim().isEmail().isLength({ min: 7 }),
    body("password").trim().isLength({ min: 5 }),
    body("username").trim().isLength({ min: 3 }),
    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Invalid data",
                });
            }

            const { username, password, email } = req.body;

            // Save the plain-text password directly
            const newUser = await userModel.create({
                email,
                username,
                password,
            });

            res.json(newUser);
        } catch (err) {
            console.error("Error during registration:", err);
            res.status(500).json({ message: "Server error" });
        }
    }
);



router.get("/login",(req,res)=>{
    res.render("login");
})

// router.post("/login",
//     body("username").trim().isLength({min:3}),
//     body("password").trim().isLength({min:5}),

//     async(req,res)=>{

//         const errors = validationResult(req);

//         if(!errors.isEmpty()){
//             return res.status(400).json({
//                 errors:errors.array(),
//                 message:"Invalid data"
//             })
//         }
        

//         const {username,password} = req.body;
//         // console.log("Login:", username, password);  //Debugging line
    
//         const user = await userModel.findOne({
//             username:username
//         })
//         // console.log("user found",user); //Debugging line
        
//         if(!user){
//             return res.status(400).json({
//                 message:"Username or password is incorrect"
//             })
//         }

//         // console.log("Plaintext Password:", password); //Debugging line
//         // console.log("Hashed Password in DB:", user.password); //Debugging line

//         const isMatch = await bcrypt.compare(password,user.password);
//         // console.log(typeof password, typeof user.password);
//         console.log("Password Match",isMatch);

//         if(!isMatch){
//             return res.status(400).json({
//                 message:"Username or password is incorrect"
//             })
//         }

//         const token = jwt.sign({
//             userId: user._id,
//             email:user.email,
//             username:user.username,
//         },
//             process.env.JWT_SECRET,
//         )

//         res.json({
//             token
//         })

//     }

// )

router.post("/login",
    body("username").trim().isLength({ min: 3 }),
    body("password").trim().isLength({ min: 5 }),
    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Invalid data",
                });
            }

            const { username, password } = req.body;

            const user = await userModel.findOne({ username });
            if (!user) {
                return res.status(400).json({ message: "Username or password is incorrect" });
            }

            // Compare plain-text passwords
            if (password !== user.password) {
                return res.status(400).json({ message: "Username or password is incorrect" });
            }

            const token = jwt.sign(
                { userId: user._id, email: user.email, username: user.username },
                process.env.JWT_SECRET,
            );

            // res.json({ token });
            res.cookie("token",token);
            res.send("logged in");
        } catch (err) {
            console.error("Error during login:", err);
            res.status(500).json({ message: "Server error" });
        }
    }
);



module.exports = router  