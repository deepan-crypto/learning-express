const express=require("express");
const app=express();
const fs=require("fs");

const jsonData=JSON.parse(fs.readFileSync("./plant.json","utf-8"));
console.log(jsonData);

app.get("/api/v3/sri",(req, res)=>{
    res.status(200).json({
        status:"Success",
        length : jsonData.length,
        data : {
            jsonData,
        }
    });
});
app.get("/api/v3/sri/:id",(req,res)=>{
    const id=req.params.id*1;
    const plant=jsonData.find(el=>el.id===id);
    res.status(200).json({
        status:"Success",
        data : {
            plant,
        }
    });
});

const port=3000;
app.listen(port,()=>{
    console.log(`App running on port ${port}...`);
}); 
