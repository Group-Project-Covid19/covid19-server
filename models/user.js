'use strict';
const {encryptPassword} = require("../helpers/bcrypt")
module.exports = (sequelize, DataTypes) => {  

  class User extends sequelize.Sequelize.Model{}

  User.init({
    email: {
     type: DataTypes.STRING,
     allowNull:false,
      validate:{
        notNull:{
          args:true,
          msg:"Email is required null"
        },
        notEmpty:{
          args:true,
          msg:"Email is required empty"
        }
      }
    },
    password: DataTypes.STRING
  },{
    sequelize,
    modelName:'User',
    hooks:{
      beforeCreate(user,option){
        user.password = encryptPassword(user.password)
      }
    }
  })

  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};