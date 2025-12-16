const app = require("./index");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config({ path: "./config.env" });

console.log(process.env);

console.log(process.env.DB_URL);
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("DB COnnected Successfully");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(process.env.PORT_NO, () => {
  console.log("server started on port", process.env.PORT_NO);
});