// const express=require("express");
// const app=express();
// const fs=require("fs");

// const jsonData=JSON.parse(fs.readFileSync("./plant.json","utf-8"));
// console.log(jsonData);

// app.use((req,res,next)=>{
//     const now=new Date();
//       req.requestTimeofHit=now.toLocaleString();
//       next();
// }
// );
// app.use((req,res,next)=>{
//     console.log("Hello");
//     next();
// }
// );

// app.use(express.json());

// //Controllers

// const getAllPlants=(req,res)=>{
//     res.status(200).json({
//         status:"Success",
//         length : jsonData.length,
//         data : {
//             jsonData,
//         }
//     });
// }




// const getPlantById=(req,res)=>{
//     const id=req.params.id*1;
//     const plant=jsonData.find(el=>el.id===id);
//     res.status(200).json({
//         status:"Success",
//         data : {
//             plant,
//         }
//     });
// }





// app.get("/api/v3/sri",getAllPlants);


// app.get("/api/v3/sri/:id",getPlantById);



// app.post("/api/v3/sri", (req, res) => {
//     const id=jsonData.length;
//     const plant=Object.assign(req.body);
//     jsonData.push(plant);
//     fs.writeFileSync("./plant.json",JSON.stringify(jsonData),"utf-8",(err)=>{
//         if(err){

//             res.status(400).json({
//                 status:"Failed to writ"

//             });
//         }
//         res.status(201).json({

//             status:"True",
//             data:{
//                 plant,
//             }
//         });
//     });
//     res.status(201).json({
//         status:"Successful",
//         data:{
//             plant,
//         }
//     });
// });




// app.put("/api/v3/sri/:id", (req, res) => {
//     const resId=req.params.id;
//     const restaurant=jsonData.find((el)=>el.id==resId);
//     if(!plant){
//         res.status(404).json({
//             status:"Fail",
//             message:"Please check your entry id",
//         });
//     }
//                 res.status(204).json({
//                     status:"Successful",
//                     message:"<> Update Successful <>",
//                 });
                
// });


const express = require("express");
const app = express();

const plantRoutes = require("./Router/userRouter");

app.use(express.json());

app.use((req, res, next) => {
    const now = new Date();
    req.requestTimeofHit = now.toLocaleString();
    next();
});

app.use((req, res, next) => {
    console.log("Hello");
    next();
});

app.use("/api/v3/sri", plantRoutes);

const PORT_NO = 9000;
app.listen(PORT_NO, () => {
    console.log("Server started successfully", PORT_NO);
});

