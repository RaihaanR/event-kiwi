import AWS from 'aws-sdk'

const awsOptions = {
  accessKeyId: process.env.AWS_ACCESS,
  secretAccessKey: process.env.AWS_SECRET
};

const bucketName = process.env.AWS_S3_NAME;

AWS.config.update(awsOptions);

const s3 = new AWS.S3();

export default class Bucket {
  static s3() {
    return s3;
  }
}