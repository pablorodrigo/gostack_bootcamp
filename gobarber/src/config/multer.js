// all config releated to file upload

import multer from 'multer';
import crypto from 'crypto';
import { extname, resolve } from 'path';

export default {
  // how multer will storage the file
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'temp', 'uploads'),
    // file -> file information
    filename: (request, file, callback) => {
      crypto.randomBytes(16, (error, response) => {
        if (error) return callback(error);

        return callback(
          null,
          response.toString('hex') + extname(file.originalname)
        );
      });
    },
  }),
};
