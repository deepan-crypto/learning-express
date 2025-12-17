const express=require("express");

const authRoutes=express.Router();
authRoutes.route("/login").post();
authRoutes.route("/signup").post();
authRoutes.route("/getAllUsers").get();

module.exports=authRoutes;

