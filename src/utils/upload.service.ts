import { Injectable } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';

@Injectable()
export class UploadService {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  async uploadFile(file: Express.Multer.File): Promise<string> {
    try {
      const result = await this.cloudinaryService.uploadImage(file.path);
      return result.secure_url; // Assuming `secure_url` is the image URL
    } catch (error) {
      console.error('Error uploading image:', error);
      throw new Error('Failed to upload image');
    }
  }
}
