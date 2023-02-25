const express = require("express");
const app = express();
const {serviceRoutes} = require("./routes/serviceRoutes");

PORT = 8080;

app.use("/api", serviceRoutes);

app.listen(PORT, () => {
  console.log(`Api-gateway listening on ${PORT}`);
});
