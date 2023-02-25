function upload_get(req, res) {
  res.render("videoUpload");
}

function upload_post(req, res) {
  const video = req.file;
  res.send(`File uploaded successfully.`);
}

module.exports = {
  upload_get,
  upload_post,
};
