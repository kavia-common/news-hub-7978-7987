/**
 * Placeholder Firebase Storage adapter.
 * NOTE: This implementation is a stub and should be replaced with actual Firebase Admin SDK logic.
 */
export default {
  async uploadImage(buffer, filename, mimeType) {
    // In a real implementation, use Firebase Admin SDK to upload to a bucket and return public URL.
    // This stub returns a fake URL indicating what would be uploaded.
    const bucket = process.env.FIREBASE_BUCKET_NAME || 'firebase-bucket';
    return `https://storage.googleapis.com/${bucket}/${encodeURIComponent(filename)}`;
  }
};
