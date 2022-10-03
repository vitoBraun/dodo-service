const path = require("path");

function getDatetimeBasedId() {
  return new Date()
    .toISOString()
    .split("T")[1]
    .replace(/-|:|\./g, "");
}

function getUsername(email) {
  const [, username] = /(.+)@/.exec(email);
  return username.replace(/\W/g, "_");
}

function getFullPath(order) {
  const { outpath, filename } = order;
  if (filename && !outpath) {
    return filename;
  } else if (outpath && !filename) {
    return outpath;
  } else {
    return path.join(order.outpath, `${order.filename}.mov`);
  }
}

function makeFileUrl(filename) {
  return path.join(process.env.UPLOAD_DIR, filename);
}

function makeFullUrl(url) {
  return process.env.NODE_ENV === "production"
    ? `${process.env.HOST}/${url}`
    : `http://localhost:${process.env.PORT}/${url}`;
}

function makeFullYS3FileUrl(url) {
  return `https://${process.env.AWS_UPLOADS_BUCKET_NAME}.${process.env.AWS_S3_ENDPOINT}/${url}`;
}

function makeYS3UploadsPath() {
  const host = process.env.HOST.split("https://")[1];
  return `${host}/uploads/`;
}

function makeYS3BackupPath() {
  const host = process.env.HOST.split("https://")[1];
  return `${host}/db-backup/`;
}
module.exports = {
  getDatetimeBasedId,
  getFullPath,
  makeFileUrl,
  makeFullUrl,
  makeYS3UploadsPath,
  makeYS3BackupPath,
  makeFullYS3FileUrl,
};
