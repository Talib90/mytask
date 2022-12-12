const express = require("express");
const cors = require("cors");


const app = express();
const pool = require("./server/config/dbconfig");

const authRoute = require("./server/routes/Auth");
const userRoute = require("./server/routes/User");
const staffRoute = require("./server/routes/Staff");
const paymentRoute = require("./server/routes/Payment");

//app.use(cors(corsOptions));
app.use(cors());

app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/staff", staffRoute);
app.use("/payment", paymentRoute);

app.listen(4000, () => {
  console.log("Server running on port 4000");
});
