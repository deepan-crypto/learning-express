const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const app = require("./index");

console.log(process.env.PORT_NO);

app.listen(process.env.PORT_NO, () => {
    console.log("Server started successfully on port", process.env.PORT_NO);
});
