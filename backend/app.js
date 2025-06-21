const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const path = require("path");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectToDb = require("./database/db");
const userRoutes = require("./routes/user.routes");
const driverRoutes = require("./routes/driver.routes");
connectToDb();
const mapRoutes = require("./routes/map.routes");
const rideRoutes = require("./routes/ride.routes");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


// ---------DEPLOYMENT (RENDER)--------

app.get("/", (req, res) => {
    res.send({
      activeStatus: true,
      error: false,
    });
  });


// ---------DEPLOYMENT (RENDER)----------

app.use("/users", userRoutes);

app.use("/drivers", driverRoutes);

app.use("/maps", mapRoutes);

app.use("/rides", rideRoutes);


module.exports = app;
