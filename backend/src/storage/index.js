import firebaseStorage from './providers/firebase.js';
import s3Storage from './providers/s3.js';

const provider = (process.env.STORAGE_PROVIDER || 'firebase').toLowerCase();

let selected;
if (provider === 's3') {
  selected = s3Storage;
} else {
  selected = firebaseStorage;
}

// PUBLIC_INTERFACE
export async function uploadImage(buffer, filename, mimeType) {
  /**
   * Uploads an image buffer and returns a public URL.
   * Implementation is delegated to the selected storage provider.
   */
  return selected.uploadImage(buffer, filename, mimeType);
}
