const express = require("express");
const app = express();

//to take request body from frontend
app.use(express.json());

require("dotenv").config();
const dbConfig = require("./config/dbConfig");
const port = process.env.PORT || 6000;

const usersRoute = require("./routes/usersRoute");
const productsRoute = require("./routes/productsRoute");
const bidsRoute = require("./routes/requestsRoute");
const notificationsRoute = require("./routes/notificationnsRoute");

app.use("/api/users", usersRoute);
app.use("/api/products", productsRoute);
app.use("/api/requests", bidsRoute);
app.use("/api/notifications", notificationsRoute);



app.listen(port, () =>
  console.log(`Node/Express Server is Listing to port ${port}`)
);
