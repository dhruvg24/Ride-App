const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectToDb = require("./database/db");
const userRoutes = require("./routes/user.routes");
const driverRoutes = require("./routes/driver.routes");
connectToDb();
const mapRoutes = require("./routes/map.routes");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello!");
});
app.use("/users", userRoutes);

app.use("/drivers", driverRoutes);

app.use("/maps", mapRoutes);

module.exports = app;
