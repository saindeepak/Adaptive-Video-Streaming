const express = require("express");
const app = express();
const ffmpeg = require("fluent-ffmpeg");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();
PORT = 8082;

app.set("view engine", "ejs");
app.use(express.static("output"));

const inputVideoFileName = "Aerial_Sunset.mp4";
const inputVideopath = `${__dirname}/${process.env.INPUTVIDEOFOLDER}${inputVideoFileName}`;
const mpdFileName = "out.mpd";
const mpdPath = `${__dirname}/${process.env.OUTPUTVIDEOFOLDER}${mpdFileName}`;

app.get("/stream", (req, res) => {
  console.log(mpdPath);
  res.render("videoStream");
});

app.listen(PORT, () => {
  console.log(`Streaming service running on ${PORT}`);
});

ffmpeg(inputVideopath)
  .map("0")
  .map("0")
  .addOption("-use_timeline", "1")
  .addOption("-use_template", "1")
  .addOption("-window_size", "5")
  .addOption("-adaptation_sets", "id=0,streams=v id=1,streams=a")
  .format("dash")
  // .addOption("-var_stream_map", "v:0,a:0 v:1,a:1 v:2,a:2 v:3,a:3 v:4,a:4")
  // .addOption("-var_stream_map", "a:0 a:1 a:2 a:3 a:4")
  // .addOption("-var_stream_map", "v:0 v:1 v:2 v:3 v:4")
  .addOption("-var_stream_map", "v:0,a:0 v:1,a:1")
  .addOption("-var_stream_map", "a:0 a:1")
  .addOption("-var_stream_map", "v:0 v:1")
  .addOption("-b:v:0", "400k")
  .addOption("-s:v:0", "320x170")
  .addOption("-b:v:1", "400k")
  .addOption("-profile:v:0", "main")
  .addOption("-profile:v:1", "baseline")
  .addOption("-bf", "1")
  .addOption("-keyint_min", "120")
  .addOption("-g", "120")
  .addOption("-sc_threshold", "0")
  .addOption("-b_strategy", "0")
  // .addOption("-b:v:2", "800k")
  // .addOption("-s:v:2", "640x340")
  // .addOption("-b:v:3", "800k")
  // .addOption("-profile:v:2", "main")
  // .addOption("-profile:v:3", "baseline")
  // .addOption("-bf", "1")
  // .addOption("-keyint_min", "120")
  // .addOption("-g", "120")
  // .addOption("-sc_threshold", "0")
  // .addOption("-b_strategy", "0")
  // .addOption("-b:v:4", "1200k")
  // .addOption("-s:v:4", "854x480")
  // .addOption("-b:v:5", "1200k")
  // .addOption("-profile:v:4", "main")
  // .addOption("-profile:v:5", "baseline")
  // .addOption("-bf", "1")
  // .addOption("-keyint_min", "120")
  // .addOption("-g", "120")
  // .addOption("-sc_threshold", "0")
  // .addOption("-b_strategy", "0")
  // .addOption("-b:v:6", "2500k")
  // .addOption("-s:v:6", "1280x720")
  // .addOption("-b:v:7", "2500k")
  // .addOption("-profile:v:6", "main")
  // .addOption("-profile:v:7", "baseline")
  // .addOption("-bf", "1")
  // .addOption("-keyint_min", "120")
  // .addOption("-g", "120")
  // .addOption("-sc_threshold", "0")
  // .addOption("-b_strategy", "0")
  // .addOption("-b:v:8", "5000k")
  // .addOption("-s:v:8", "1920x1080")
  // .addOption("-b:v:9", "5000k")
  // .addOption("-profile:v:8", "main")
  // .addOption("-profile:v:9", "baseline")
  // .addOption("-bf", "1")
  // .addOption("-keyint_min", "120")
  // .addOption("-g", "120")
  // .addOption("-sc_threshold", "0")
  // .addOption("-b_strategy", "0")
  .addOption("-c:a", "aac")
  .addOption("-ar", "22050")
  .output(mpdPath)
  .on("error", (err) => {
    console.log(`Got error -----------------`);
    console.log(err);
  })
  .on("end", () => console.log("Done"))
  .run();

// const inputVideoFileName = "testVideo.mp4";
// const inputVideopath = `${__dirname}/${process.env.INPUTVIDEOFOLDER}${inputVideoFileName}`;
// const baseFileName = path.basename(
//   inputVideopath,
//   path.extname(inputVideopath)
// );

// // Define the video qualities and their respective bitrates
// const videoQualities = [
//   { name: "240p", width: 426, bitrate: "400k", aspectRatio: "426:240" },
//   { name: "360p", width: 640, bitrate: "800k", aspectRatio: "640:360" },
//   { name: "480p", width: 854, bitrate: "1200k", aspectRatio: "854:480" },
//   { name: "720p", width: 1280, bitrate: "2500k", aspectRatio: "1280:720" },
//   { name: "1080p", width: 1920, bitrate: "5000k", aspectRatio: "1920:1080" },
// ];

// videoQualities.forEach((quality) => {
//   const outputFileName = `${__dirname}/${process.env.OUTPUTVIDEOFOLDER}${baseFileName}_${quality.name}.mp4`;

//   ffmpeg(inputVideopath)
//     .output(outputFileName)
//     .videoCodec("libx264")
//     .audioCodec("aac")
//     .audioChannels(2)
//     .audioBitrate("128k")
//     .outputOptions("-preset", "slow")
//     .outputOptions("-crf", "22")
//     .outputOptions("-c:a", "copy")
//     .outputOptions("-b:v", quality.bitrate)
//     .outputOptions(
//       "-vf",
//     //   `scale=${quality.width}:-2,setsar=${quality.aspectRatio}`
//         `scale=${quality.width}:-2`
//     )
//     .on("error", (err) => {
//       console.log(`Error occured while processing video: ${quality.name}`);
//       console.error(err);
//     })
//     .on("end", () => {
//       console.log(`${quality.name} video has been created succesfully`);
//     })
//     .run();
// });
