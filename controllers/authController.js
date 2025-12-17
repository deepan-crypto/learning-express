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
    // 1 .we need email and password
    const {email,password}=req.body;

    
// 2.check input
    if(!email || !password){
        return res.status(401).json({
            status:"Fail",
            message:"Invalid email or password",
        });
    }
  
    // 2 .check inputs
   const user=users.find(user=>user.email===email && user.password===password);
    if(!user){                 
    res.status(200).json({
        status:"Success",
        data:{
            user,
        },
    });
};
}
const token=signToken(user.id);

res.status(200).json({
    status:"Success",
    token,
    data:{
        email:user.email,
        role:user.role,
        name:user.name,
    },
});


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

