/* @flow */

import cloudinary from 'cloudinary';
import fetch from 'node-fetch';

const CloduinaryService = {
  setup: () => {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  },
  uploadImage: async (imagePath: string) => {
    const image = await fetch(imagePath);

    image.body.pipe(cloudinary.uploader.upload_stream());
  },
};

export default CloduinaryService;
