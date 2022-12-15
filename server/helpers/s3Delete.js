require("dotenv").config;
const AWS = require("aws-sdk");

const s3 = new AWS.S3({
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
});

function s3Delete(delUrl) {

  let params = {
    bucket: process.env.BUCKET_NAME,
  };
  let deleteParams = "";
  if (Array.isArray(delUrl)) {
    deleteParams = deleteUrls(delUrl);
  } else {
    deleteParams = deleteUrls([delUrl]);
  }
  params.Delete = {
    Objects: deleteParams,
  };
  s3.deleteObjects(params, (err, data) => {
    if (err) {
      console.log(err, err.stack);
      throw new Error(err);
    }
  });
}

function deleteUrls(arrUrls) {
  const deleteParams = [];
  arrUrls.forEach((url) => {
    url = url.split(
      "https://hotelbooking-profile-picture-upload.s3.amazonaws.com/"
    );
    deleteParams.push({ Key: url[1] });
  });
  return deleteParams;
}

module.exports = {
  s3Delete
}