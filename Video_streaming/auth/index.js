const express = require("express");
const authRoutes = require("./routes/userAuth");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

dotenv.config();

mongoose.set("strictQuery", true);

PORT = 8081;

mongoose
  .connect(process.env.STRING_CONNECTION, { useNewUrlParser: true })
  .then(() => {
    const app = express();
    // app.use(express.static(__dirname + "/public"));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(function(req,res,next){
      res.set('Cache-Control', 'no-store');
      next();
    });
    app.use(cookieParser());
    app.use("/auth",authRoutes);
    app.listen(PORT, () => {
      console.log(`Auth service running on ${PORT}`);
    });
  });