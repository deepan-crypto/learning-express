const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const app = require("./index.js");

const PORT = process.env.PORT_NO || 3000;

app.listen(PORT, () => {
    console.log(`Server started successfully on port ${PORT}`);
});
