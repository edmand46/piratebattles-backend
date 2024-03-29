import { ajvMapErrors } from "./constants";
import bcrypt from 'bcrypt';
import requestRaw from 'request';
import * as path from 'path';
import sharp from 'sharp';
import * as fs from 'fs-extra';
import * as crypto from 'crypto';

export const getSignature = (input: string) => {
  const hmac = crypto.createHmac('sha256', process.env.SECRET_KEY);
  hmac.update(input);
  return hmac.digest('hex');
}

export const checkSignature = (input: string, signature: string) => getSignature(input) === signature;

export const handleError = (error, req, reply) => {
  const { validation } = error;
  if (validation) {
    const errors = validation.map(v => {
      const { params: { missingProperty }, keyword } = v;
      const errorConstant = ajvMapErrors[keyword];
      return [missingProperty, errorConstant];
    });

    return reply.status(400).send({
      errors,
    });
  }
  reply.send(error);
}

export const createErrorObject = (errorCode: string, data?: Object) => ({ errorCode, ...data });

export const generateHash = () => {
  let name = '';
  for (let i = 0; i < 32; i++) {
    name += Math.floor(Math.random() * 16).toString(16);
  }
  return name;
};

export const request = (uri, method = 'GET', headers, params) => new Promise((resolve, reject) => requestRaw({
    uri,
    headers,
    method,
    json: params,
  }, (err, response, body) => {
    const { statusCode } = response;
    console.log(`[Request] -> ${uri} |${statusCode}`);

    if (statusCode !== 200)
      console.log(body);

    if (err)
      reject(err);
    try {
      const json = JSON.parse(body);
      resolve(json);
    } catch (e) {
      resolve(body);
    }
  })
);

export const readFile = (file: string): Promise<string> => new Promise((resolve, reject) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err)
      reject(err);
    resolve(data);
  });
});

export const readJSONFile = async file => {
  const data = await readFile(file);
  return JSON.parse(data);
};

export const deleteFileIfExists = fileUrl => {
  if (fs.existsSync(fileUrl))
    fs.unlinkSync(fileUrl);
};

export const saveData = async (fieldName, stream, filename, encoding, mimetype, body) => {
  const dataFolder = process.env.DATA_FOLDER || 'public/data';
  const ext = path.extname(filename);
  const hash = generateHash();
  const newFileName = `${hash}${ext}`;
  const filePath = path.join(dataFolder, newFileName);

  body[fieldName][0]['filename'] = newFileName;
  body[fieldName][0]['filepath'] = filePath;

  if (!fs.existsSync(dataFolder))
    await fs.ensureDirSync(dataFolder);

  const transformer = sharp().resize({ width: 250, heigth: 250, fit: 'cover' });
  stream.pipe(transformer).pipe(fs.createWriteStream(filePath)).on('error', err => console.error(err));
};

export const saveFile = async (path, data) => new Promise((resolve, reject) => fs.writeFile(path, data, (err => {
  if (err)
    reject(err);

  resolve()
})));

export const encodePassword = pass => new Promise(((resolve, reject) => {
  const salt = parseInt(process.env.SALT);
  bcrypt.hash(pass, salt, (err, hash) => {
    if (err)
      reject(err);

    resolve(hash);
  });
}));

export const comparePassword = (pass, hash) => new Promise(((resolve, reject) => {
  bcrypt.compare(pass, hash, (err, res) => {
    resolve(!!res);
  });
}));

export const getVariableName = objWithVariable => Object.keys(objWithVariable)[0];