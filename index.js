const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 3001;
const {User} = require("./models");
const {Player} = require("./models");
const allRoutes = require('./controllers');
// const tokenAuth = require('./middleware/tokenAuth');

const sequelize = require("./config/connection");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
// app.use(cors({    origin:["https://rg-247fbk.herokuapp.com"]}));
// app.use(tokenAuth);
// app.use(express.static('public'));

app.use('/', allRoutes);


sequelize.sync({force:false}).then(()=>{
    app.listen(PORT,function(){
        console.log(`App listening on PORT ${PORT}`)
    });
})

