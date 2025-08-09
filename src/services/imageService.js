/**
 * Image service for handling URLs from MinIO/S3
 */

// Configuration for different environments
const IMAGE_CONFIG = {
  development: {
    baseUrl: process.env.REACT_APP_MINIO_URL || 'http://localhost:9000',
    bucketName: process.env.REACT_APP_MINIO_BUCKET || 'movies'
  },
  production: {
    // TODO - change to production URL
    baseUrl: process.env.REACT_APP_S3_URL || 'https://your-bucket.s3.amazonaws.com',
    bucketName: process.env.REACT_APP_S3_BUCKET || 'movies'
  }
};

/**
 * Get the full image URL based on environment
 * @param {string} imagePath - The image path/key (e.g., 'movies/poster123.jpg')
 * @returns {string} Full image URL
 */
export const getImageUrl = (imagePath) => {
  if (!imagePath) return '';
  
  // If imagePath is already a full URL, return as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  const environment = process.env.NODE_ENV || 'development';
  const config = IMAGE_CONFIG[environment];
  
  // Remove leading slash if present
  const cleanPath = imagePath.startsWith('/') ? imagePath.substring(1) : imagePath;
  
  return `${config.baseUrl}/${config.bucketName}/${cleanPath}`;
};

/**
 * Fallback approach: If your backend provides image URLs directly
 * @param {string} imageUrl - URL from your API
 * @returns {string} Full image URL
 */
export const getImageUrlFromApi = (imageUrl) => {
  if (!imageUrl) return '';
  
  // If it's already a full URL, return as is
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }
  
  // Legacy fallback to API server
  return `${process.env.REACT_APP_API_URL}${imageUrl}`;
};

export default {
  getImageUrl,
  getImageUrlFromApi
};