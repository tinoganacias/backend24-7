const express = require('express');
const router = express.Router();
const userRoutes = require('./userRoutes');
const playerRoutes = require('./playerRoutes');


// router.get('/', (req, res)=>{
//     res.send('Testing Server');
// })

router.use(userRoutes);
router.use(playerRoutes);


module.exports = router;
