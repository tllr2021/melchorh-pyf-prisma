const AWS = require("aws-sdk");

AWS.config.update({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: "us-east-2",
});

const s3 = new AWS.S3();
// https://bucket.s3.amazonaws.com/key
const myBucket = "numarketcenter";
const signedUrlExpireSeconds = 60 * 10;

/**
 * 
 * @param Key {string} key proporcionada por S3
 * @param name {string} nombre del archivo
 */
export const getUrl = (Key: string, name: string): string => s3.getSignedUrl("getObject", {
    Bucket: myBucket,
    Key,
    Expires: signedUrlExpireSeconds,
    ResponseContentDisposition: `attachment; filename ="${name}"`
});
