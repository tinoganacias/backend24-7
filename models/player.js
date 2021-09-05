const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Player extends Model {}

Player.init(
  {
    playerName: {
      type: DataTypes.STRING,
      allowNull: false,
      
    },
    team: {
      type: DataTypes.STRING,
      allowNull: false,
      
    },
    number: {
      type: DataTypes.STRING,
     
      
    },
    position: {
      type: DataTypes.STRING,
       allowNull: false
    },
    height: {
      type: DataTypes.STRING,
    },
    weight: {
        type: DataTypes.STRING,
      },
    college: {
        type: DataTypes.STRING,

      },
     photo: {
        type: DataTypes.TEXT,
      },
  },
 
    {
    sequelize,
    }
);

module.exports = Player;
