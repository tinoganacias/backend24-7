const express = require('express');
const router = express.Router();
const {User, Player} = require('../models');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const tokenAuth = require('../middleware/tokenAuth');
// const tokenAuth = require('../middleware/tokenAuth');


router.post("/signup", (req, res)=>{
    User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email
    }).then(newUser=>{
        const token = jwt.sign({
            name: newUser.name,
            email: newUser.email,
            id: newUser.id
        }, 
        process.env.JWT_SECRET,
        {
            expiresIn:"2h"
        })
        res.json({token, user: newUser, message: "Logged In!!"});
    }).catch(err=>{
        console.log(err);
        res.status(500).json({
            message:"Error!",
            error:err
        })
    })
})

router.post("/login", (req, res)=>{
    User.findOne({
        where: {
            email: req.body.email,
        }   
    }).then(user=>{
        if(!user) {
            res.status(403).json({
                message:"Invalid username or password."
            });
        } else if (!bcrypt.compareSync(req.body.password,user.password)) {
                res.status(403).json({
                    message:"Invalid username or password."
                });
        } else {
            const token = jwt.sign({
                name: user.name,
                email: user.email,
                id: user.id
            }, 
            process.env.JWT_SECRET,
            {
                expiresIn:"2h"
            })
            res.json({token, user, message: "Logged In!!"});
            }
    }).catch(err=>{
        console.log(err);
        res.status(500).json({
            message:"Error!",
            error:err
        })
    })
})

router.get('/users', (req, res)=>{
    User.findAll({
        // include: [
        //     {
        //         model:db.Friend,
        //         // include:{}
        //     }
        // ]
    }).then(userData=>{
        res.json(userData);
    }).catch(err=>{
        console.log(err);
        res.status(500).json({
            message:"Error!",
            error:err
        })
    })
    
})

router.get("/secretclub", tokenAuth, (req, res)=>{
    res.json(req.user);
})

// router.get("/secretclub", (req, res)=>{
    // res.json(req.user);
////////  BEFORE MIDDLEWARE AND AUTHTOKEN  WORKING     ///////////////
// router.get("/secretclub", tokenAuth, (req, res)=>{
//     if (req.headers.authorization) {
//         console.log("auth header");
//         console.log(req.headers);
//         const token = req.headers.authorization.split(" ")[1];
//         console.log("token");
//         console.log(token);
//         console.log("jwt secrret");
//         console.log(process.env.JWT_SECRET);
//         jwt.verify(token, process.env.JWT_SECRET,(err, data)=>{
//             if(err) {
//                 console.log(err);
//                 return res.status(403).json({message: "Authourization Failed"});
//             } else {
//                 console.log(data);
//                 return res.send("welcome to the secret club");
//             }
//         })
//     } 
//     else {
//         return res.status(403).json({message: "No Token"});
//     }
// })
    // res.send("welcome to the secret club");
    // if (req.headers.authorization) {
    //     console.log("auth header");
    //     const token = req.headers.authorization.split(" ")[1];  
    //     jwt.verify(token, process.env.JWT_SECRET,(err, data)=>{
    //         if(err) {
    //             console.log(err);
    //             return res.status(403).json({message: "Authourization Failed"});
    //         } else {
    //             console.log(data);
    //             return res.send("welcome to the secret club");
    //         }
    //     })
    // } 
    // else {
    //     return res.status(403).json({
    //      message:"Authorization Failed"
    //     });
    // }


router.get("/profile", tokenAuth, (req, res)=>{
    User.findOne({
        where:{
            id: req.user.id
        },
        // include: [model: Player]
    }).then(userData=>{
        return res.json(userData);
    }).catch(err=>{
        console.log(err);
        return res.status(500).json({
            message: "Error!", 
            error: err
        });
    });
})

module.exports = router;
