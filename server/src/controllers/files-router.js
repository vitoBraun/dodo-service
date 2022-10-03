const express = require("express");
const fileRouter = express.Router();
// const { authorize } = require("../util/auth-middleware");
const multer = require("multer");
const upload = multer().any();

const { uploadFileGetUrl } = require("./files-controller");

fileRouter.post(`/api/upload`, upload, uploadFileGetUrl);

module.exports = fileRouter;
