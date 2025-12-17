const express=require("express");

const users=[{
    id:1,
    name:"John Doe",
    email:"hello@world",
    password:"123",
    confirmPassword:"123",
    role:"user",
},
{
    id:2,
    name:"deepan",
    email:"deepan@world",
    password:"123",
    confirmPassword:"123",
    role:"user",
},
];

const signToken =(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:parseInt(process.env.JWT_EXPIRES),
    });
};

exports.allUsers=(req,res)=>{
    res.status(200).json({
        data:{
            users,
        },
    });
};

exports.login=(req,res)=>{
    const {email,password}=req.body;
    const user=users.find(user=>user.email===email && user.password===password);
    
    if(!user){
        return res.status(401).json({
            status:"Fail",
            message:"Invalid email or password",
        });
    }
    
    res.status(200).json({
        status:"Success",
        data:{
            user,
        },
    });
};


exports.signup=(req,res)=>{
    const {name,email,password,confirmPassword,role}=req.body;
    
    if(password !== confirmPassword){
        return res.status(400).json({
            status:"Fail",
            message:"Passwords do not match",
        });
    }
    
    const newUser={
        id:users.length + 1,
        name,
        email,
        password,       
        confirmPassword,
        role,
    };
    
    users.push(newUser);
    
    res.status(201).json({
        status:"Success",
        data:{      

            user:newUser,
        },
    });
};

module.exports = {
    allUsers,
    login,
    signup,
};

