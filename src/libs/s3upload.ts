import aws from 'aws-sdk';
import fs from 'fs';
import moment from 'moment';

export interface FileType {
  fileName: string;
  filePath: string;
  fileType: string;
}

export interface UploadResponse {
  key: string;
  url: string;
}

const s3upload = async ({
  fileName,
  filePath,
  fileType,
}: FileType): Promise<UploadResponse> => {
  return new Promise((resolve, reject) => {
    const s3 = new aws.S3({
      apiVersion: '2006-03-01',
    });

    aws.config.update({
      region: 'ap-northeast-2',
      accessKeyId: process.env.ACCESS_KEY_ID,
      secretAccessKey: process.env.SECRET_ACCESS_KEY,
    });

    const stream = fs.createReadStream(filePath);
    const saveTime = `${moment().format('YYMMDD_HHmmdd')}`;
    const newFilename = `${saveTime}_${fileName.replace(/(\s*)/g, '')}`;

    stream.on('error', function (err) {
      reject(err);
    });

    s3.upload(
      {
        Bucket: 'image.thewhy.kr',
        Body: stream,
        Key: newFilename,
        ContentType: fileType,
      },
      function (err, data) {
        if (err) {
          reject(err);
        } else if (data) {
          resolve({
            key: data.Key,
            url: data.Location,
          });
        }
      }
    );
  });
};

export default s3upload;
