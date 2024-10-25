const admin = require('./firebase');

const storage = admin.storage();
const bucket = storage.bucket();

class Storage {
  async upload(file, path) {
    const fileRef = bucket.file(path);

    await fileRef.save(file, {
      metadata: {
        contentType: file.mimetype,
      },
    });
    const url = await getDownloadURL(fileRef);
    return url;
  }
}

module.exports = Storage;
