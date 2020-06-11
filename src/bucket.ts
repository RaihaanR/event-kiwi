import AWS from 'aws-sdk'
import crypto from 'crypto'

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

  static async downloadByKey(req, res, table) {
    const key = req.params.key;
    const entry = await Database.getFileName(key, table);

    if (entry) {
      const params = {
        Bucket: bucketName,
        Key: key
      };

      try {
        const data = await s3.getObject(params).promise();

        if (table === "files") {
          await Database.incrementDownload(key);
        }
        if (table === "files") {
          res.contentType("application/octet-stream");
          res.setHeader('content-disposition', 'attachment; filename=' + entry.display_name);
        } else {
          const name: string = entry.display_name;
          let ext = name.substr(name.lastIndexOf('.') + 1);
          if (ext === "svg") {
            ext = "svg+xml";
          }
          res.contentType("image/" + ext);
          res.setHeader('content-disposition', 'inline');
        }
        res.send(data.Body);
      } catch (err) {
        res.send('Unable to access file');
      }
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

  static async uploadResource(name, society, body) {
    const salted = Buffer.concat([body, Buffer.from(name + society.toString(), 'utf8')]);
    const hash = crypto.createHmac('sha256', salted).digest('hex');

    return await this.uploadFile(name, society, body, hash, "files");
  }

  static async uploadImage(name, society, body) {
    let key = '';
    let success = false;
    while (!success) {
      key = crypto.randomBytes(8).toString('hex');
      const row = await Database.getFileName(key, "image_mirrors");

      if (!row) {
        success = true;
      }
    }

    return await this.uploadFile(name, society, body, key, "image_mirrors");
  }

  static async uploadFile(name, society, body, key, table) {
    const params = {
      Bucket: bucketName,
      Key: key,
      Body: body
    };

    const result: any = {};

    try {
      await s3.putObject(params).promise();
      let row = await Database.getFileName(key, table);

      if (row) {
        result.status = 0;
        result.body = 'ERROR: key already exists';
      } else {
        await Database.putFile(name, key, society, table);

        result.status = 1;
        result.body = {
          key: key,
          name: name
        };
      }
    } catch (err) {
      result.status = 0;
      result.body = 'ERROR: ' + err;
    }

    return result;
  }
}

