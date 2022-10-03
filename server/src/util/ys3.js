const EasyYandexS3 = require("easy-yandex-s3");

const YS3 = (bucketName) => {
  return new EasyYandexS3({
    auth: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
    Bucket: bucketName,
    region: "ru-central1",
  });
};

const upload = async (
  options,
  uploadDir = "/",
  bucketName = process.env.AWS_BUCKET_NAME
) => {
  const s3 = YS3(bucketName);
  const uploadResp = await s3.Upload({ ...options }, uploadDir);
  if (!uploadResp) {
    return false;
  }
  return uploadResp.Key;
};

module.exports = { YS3, upload };
