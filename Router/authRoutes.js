const express=require("express");
const authController=require("../controllers/authController");


const authRoutes=express.Router();

authRoutes.route("/login").post(authController.login);
authRoutes.route("/signup").post(authController.signup);
authRoutes.route("/getAllUsers").get(authController.allUsers);

module.exports=authRoutes;

