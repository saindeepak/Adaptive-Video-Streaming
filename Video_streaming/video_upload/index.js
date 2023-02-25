const express = require("express");
const app = express();
const videoUpload = require("./routes/videoUpload");

PORT = 8082;

app.set("view engine", "ejs");
app.use("/video", videoUpload);

app.listen(PORT, () => {
  console.log(`uUload service running on ${PORT}`);
});
