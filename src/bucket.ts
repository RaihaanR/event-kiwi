import AWS from 'aws-sdk'
import Crypto from 'crypto'

import Database from './database';

const awsOptions = {
  accessKeyId: process.env.AWS_ACCESS,
  secretAccessKey: process.env.AWS_SECRET
};

AWS.config.update(awsOptions);

const s3 = new AWS.S3();
const bucketName = process.env.AWS_S3_NAME;

export default class Bucket {

  static s3() {
    return s3;
  }

  static bucketName() {
    return bucketName;
  }

  static async downloadByKey(req, res) {
    const key = req.params.key;
    const entry = await Database.getFileName(key);

    if (entry) {
      const params = {
        Bucket: bucketName,
        Key: key
      };

      s3.getObject(params, (err, data) => {
        if (err) {
          res.send('Unable to access file');
        } else {
          res.setHeader('content-disposition', 'attachment; filename=' + entry.display_name);
          res.send(data.Body);
        }
      });
    } else {
      res.send('Unable to access file');
    }
  }

  static async listBySociety(req, res) {
    const society = +req.params.society;

    res.send(await Database.getFilesBySociety(society));
  }

  static async deleteFile(key, user) {
    const params = {
      Bucket: bucketName,
      Key: key
    };

    const result: any = {};

    try {
      const row = await Database.checkIfUserCanDelete(key, user);

      if (row) {
        await s3.deleteObject(params).promise();
        const id = row.file_id;

        await Database.deleteFileEntry(id);
        result.status = 1;
        result.body = 'File \'' + row.display_name + '\' (' + key + ') deleted';
      } else {
        result.status = 0;
        result.body = 'ERROR: not permitted to delete file';
      }
    } catch (err) {
      result.status = 0;
      result.body = 'ERROR: ' + err;
    }

    return result;
  }

  static async uploadFile(name, society, body) {
    const salted = Buffer.concat([body, Buffer.from(name + society.toString(), 'utf8')]);
    const hash = Crypto.createHmac('sha256', salted).digest('hex');

    const params = {
      Bucket: bucketName,
      Key: hash,
      Body: body
    };

    const result: any = {};

    try {
      await s3.putObject(params).promise();
      let row = await Database.getFileName(hash);

      if (row) {
        result.status = 0;
        result.body = 'ERROR: hash already exists';
      } else {
        await Database.putFile(name, hash, society);

        result.status = 1;
        result.body = hash;
      }
    } catch (err) {
      result.status = 0;
      result.body = 'ERROR: ' + err;
    }

    return result;
  }
}

