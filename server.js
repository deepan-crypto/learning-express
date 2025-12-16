const app=require("./index");

const dotenv=require("dotenv");
dotenv.config({path:"./config.env"});


console.log(process.env);

const PORT_NO = 9000;
app.listen(PORT_NO, () => {
    console.log("Server started successfully", PORT_NO);
});
