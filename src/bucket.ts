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
    const key = req.params['key'];
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
          res.setHeader('content-disposition', 'attachment; filename=' + entry['display_name']);
          res.send(data.Body);
        }
      });
    } else {
      res.send('Unable to access file');
    }
  }

  static async listBySociety(req, res) {
    const society = +req.params['society'];

    res.send(await Database.getFilesBySociety(society));
  }

  static async uploadFile(name, society, body, res) {
    const salted = Buffer.concat([body, Buffer.from(name + society.toString(), 'utf8')]);

    const hash = Crypto.createHmac('sha256', salted).digest('hex');

    const params = {
      Bucket: bucketName,
      Key: hash,
      Body: body
    };

    s3.putObject(params, async (perr, pres) => {
      const result = {};

      if (perr) {
        result['status'] = 0;
        result['body'] = 'ERROR: ' + perr;
      } else {
        let row = await Database.getFileName(hash);

        if (row) {
          result['status'] = 0;
          result['body'] = 'ERROR: hash already exists';
        } else {
          await Database.putFile(name, hash, society);

          result['status'] = 1;
          result['body'] = hash;
        }
      }
      res.send(result);
    });
  }
}

