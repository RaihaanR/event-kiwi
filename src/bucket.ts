import AWS from 'aws-sdk'
import Crypto from 'crypto'

import Database from './database';
import { errors } from 'pg-promise';

const awsOptions = {
  accessKeyId: process.env.AWS_ACCESS,
  secretAccessKey: process.env.AWS_SECRET
};

AWS.config.update(awsOptions);

const s3 = new AWS.S3();

export default class Bucket {
  static s3() {
    return s3;
  }
  static bucketName() {
    return process.env.AWS_S3_NAME;
  }

  static async downloadByKey(req, res) {
    let key = req.params.key;
    let entry = await Database.getFileName(key);
    if (entry) {
      let params = {
        Bucket: Bucket.bucketName(),
        Key: key
      };
      Bucket.s3().getObject(params, (err, data) => {
        if (err) {
          res.send("unable to access file");
        } else {
          res.setHeader("content-disposition", "attachment; filename=" + entry.display_name);
          res.send(data.Body);
        }
      });
    } else {
      res.send("unable to access file");
    }
  }

  static async listBySociety(req, res) {
    let society = +req.params.society;
    res.send(await Database.getFilesBySocietyId(society));
  }

  static async uploadFile(name, society, body, res) {
    let hash = Crypto.createHmac('sha256', body).digest('hex');

    const params = {
      Bucket: Bucket.bucketName(),
      Key: hash,
      Body: body
    };

    Bucket.s3().putObject(params, async (perr, pres) => {
      let result = {};
      if (perr) {
        result['status'] = 0;
        result['body'] = "error: " + perr;
      } else {
        await Database.putFile(name, hash, society);
        result['status'] = 1;
        result['body'] = hash;
      }
      res.send(result);
    });
  }
}
