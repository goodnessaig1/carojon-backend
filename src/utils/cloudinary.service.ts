import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  constructor() {
    v2.config({
      cloud_name: 'e-commerce-website',
      api_key: '742572971787234',
      api_secret: '4ytWgJj4DLzBDJNh2_J1kL2mpUU',
    });
  }
  async uploadImage(
    filePath: string,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      v2.uploader.upload(filePath, { folder: 'carojon' }, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
    });
  }
}
