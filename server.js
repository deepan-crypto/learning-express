const app=require("./index");

const dotenv=require("dotenv");
dotenv.config({path:"./config.env"});


console.log(process.env.PORT_NO);

app.listen(process.env.PORT_NO, () => {
    console.log("Server started successfully", PORT_NO);
});



