const { upload } = require("../util/ys3");

const uploadFileGetUrl = async (req, res) => {
  if (!req.files) {
    return res.status(500).send("No files were added");
  }
  const uploadUrl = await upload({ buffer: req.files[0].buffer }, "/uploads");
  if (uploadUrl) {
    res.json({ url: uploadUrl });
  } else {
    res.status(500).send("Error in uploading file to Storage");
  }
};

module.exports = {
  uploadFileGetUrl,
};
