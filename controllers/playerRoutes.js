const express = require('express');
const router = express.Router();
const {Player} = require('../models');

router.get('/players', (req, res)=>{
    Player.findAll({
        // include: [
        //     {
        //         model:db.Player,
        //         include:{}
        //     }
        // ]
    }).then(playerData=>{
        res.json(playerData);
    }).catch(err=>{
        console.log(err);
        res.status(500).json({
            message:"Error!",
            error:err
        })
    })
    
})

router.get("/players/team/:team", (req, res)=>{
    Player.findAll({
        where:{
            team: req.params.team
        }
    }).then(playerData=>{
        return res.json(playerData);
    }).catch(err=>{
        console.log(err);
        return res.status(500).json({
            message: "Error!", 
            error: err
        });
    });
})

router.get("/players/position/:position", (req, res)=>{
    Player.findAll({
        where:{
            position: req.params.position
        }
    }).then(playerData=>{
        return res.json(playerData);
    }).catch(err=>{
        console.log(err);
        return res.status(500).json({
            message: "Error!", 
            error: err
        });
    });
})

router.get("/players/name/:playerName", (req, res)=>{
    Player.findAll({
        where:{
            playerName: req.params.playerName
        }
    }).then(playerData=>{
        res.json(playerData);
    }).catch(err=>{
        console.log(err);
        res.status(500).json({
            message: "Error!", 
            error: err
        });
    });
})

router.get("/players/number/:number", (req, res)=>{
    Player.findAll({
        where:{
            number: req.params.number
        }
    }).then(playerData=>{
        res.json(playerData);
    }).catch(err=>{
        console.log(err);
        res.status(500).json({
            message: "Error!", 
            error: err
        });
    });
})

module.exports = router;